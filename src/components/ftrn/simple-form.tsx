"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  Loader2,
  CheckCircle2,
  Send,
  RotateCcw,
  ArrowUp,
} from "lucide-react";
import { toast } from "sonner";
import { registrationSchema, type RegistrationInput } from "@/lib/schema";
import {
  DIVISIONS,
  FTRN_INFO,
  FACULTIES,
  ANGKATAN,
  getProdiList,
} from "@/lib/data";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BenefitsButton } from "./benefits-dialog";

export function SimpleForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      nim: "",
      faculty: "",
      prodi: "",
      angkatan: "",
      phone: "",
      instagram: "",
      bio: "",
      firstChoiceDivision: "",
      firstChoiceStatement: "",
      secondChoiceDivision: "",
      secondChoiceStatement: "",
      skills: "",
      experience: "",
      portfolioLink: "",
      motivation: "",
      agree: false as unknown as true,
    },
    mode: "onTouched",
  });

  const selectedFacultyId = watch("faculty");
  const prodiList = getProdiList(selectedFacultyId);

  const onSubmit = async (data: RegistrationInput) => {
    setSubmitting(true);
    const toastId = toast.loading("Mengirim pendaftaran…");

    // Retry logic: dev server in this sandbox is unstable and crashes
    // mid-request. Retry up to 3 times with backoff before giving up.
    const MAX_ATTEMPTS = 3;
    let lastError = "Terjadi kesalahan tak terduga.";

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        toast.loading(
          attempt === 1
            ? "Mengirim pendaftaran…"
            : `Mengirim ulang (percobaan ${attempt}/${MAX_ATTEMPTS})…`,
          { id: toastId }
        );

        const res = await fetch("/api/registrations", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        // Network error / server down → response is HTML error page
        const text = await res.text();
        let json: { error?: string; issues?: Record<string, string[]> } = {};
        try {
          json = JSON.parse(text);
        } catch {
          // Not JSON — server crashed mid-request. Retry on next attempt.
          if (attempt < MAX_ATTEMPTS) {
            await new Promise((r) => setTimeout(r, 1500 * attempt));
            continue;
          }
          throw new Error(
            "Server sedang tidak stabil. Data kamu sudah disimpan otomatis — coba kirim ulang dalam beberapa detik."
          );
        }

        if (!res.ok) {
          // Validation error — don't retry, show the specific issue
          let msg = json.error || "Gagal mengirim formulir";
          if (json.issues) {
            const firstField = Object.values(json.issues)[0];
            if (Array.isArray(firstField) && firstField[0]) {
              msg = firstField[0];
            }
          }
          toast.dismiss(toastId);
          toast.error("Gagal mendaftar", { description: msg });
          return;
        }

        // Success!
        toast.success("Pendaftaran terkirim!", {
          id: toastId,
          description: "Tim FTRN #5 akan menghubungi kamu via WhatsApp.",
        });
        setSuccess(true);
        reset();
        return;
      } catch (e) {
        lastError = e instanceof Error ? e.message : "Terjadi kesalahan tak terduga.";
        if (attempt < MAX_ATTEMPTS) {
          await new Promise((r) => setTimeout(r, 1500 * attempt));
          continue;
        }
      }
    }

    // All retries failed — save to localStorage as fallback so user
    // doesn't lose their data.
    try {
      const pending = JSON.parse(
        localStorage.getItem("ftrn_pending_registration") || "[]"
      );
      pending.push({ data, savedAt: new Date().toISOString() });
      localStorage.setItem(
        "ftrn_pending_registration",
        JSON.stringify(pending)
      );
    } catch {
      // ignore localStorage errors
    }

    toast.error("Gagal mendaftar", {
      id: toastId,
      description:
        "Server sedang sibuk. Data kamu sudah disimpan otomatis. Silakan refresh halaman (Ctrl+Shift+R) lalu kirim ulang — biasanya langsung berhasil.",
    });
  };

  if (success) {
    return <SuccessState onReset={() => setSuccess(false)} />;
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      {/* ===== Data Diri ===== */}
      <FieldGroup title="Data Diri">
        <FormField
          label="Nama Lengkap"
          required
          error={errors.fullName?.message}
        >
          <Input
            placeholder="Nama lengkap kamu"
            className="h-12 rounded-xl"
            {...register("fullName")}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Nomor Induk Mahasiswa (NIM)"
            required
            error={errors.nim?.message}
          >
            <Input
              placeholder="cth. 2019011001"
              inputMode="numeric"
              className="h-12 rounded-xl"
              {...register("nim")}
            />
          </FormField>
          <FormField
            label="Angkatan"
            required
            error={errors.angkatan?.message}
          >
            <Controller
              control={control}
              name="angkatan"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                >
                  <SelectTrigger className="h-12 rounded-xl">
                    <SelectValue placeholder="Pilih angkatan…" />
                  </SelectTrigger>
                  <SelectContent className="max-h-72 rounded-xl">
                    {ANGKATAN.map((a) => (
                      <SelectItem key={a} value={String(a)} className="rounded-lg">
                        {a}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </FormField>
        </div>

        <FormField
          label="Fakultas"
          required
          error={errors.faculty?.message}
        >
          <Controller
            control={control}
            name="faculty"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={(v) => {
                  field.onChange(v);
                  // reset prodi when faculty changes
                  setValue("prodi", "", { shouldValidate: false });
                }}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Pilih fakultas…" />
                </SelectTrigger>
                <SelectContent className="max-h-72 rounded-xl">
                  {FACULTIES.map((f) => (
                    <SelectItem key={f.id} value={f.id} className="rounded-lg">
                      {f.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Program Studi"
          required
          error={errors.prodi?.message}
          hint={
            selectedFacultyId
              ? `${prodiList.length} prodi tersedia`
              : "Pilih fakultas dulu"
          }
        >
          <Controller
            control={control}
            name="prodi"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                disabled={!selectedFacultyId}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue
                    placeholder={
                      selectedFacultyId
                        ? "Pilih program studi…"
                        : "— pilih fakultas dulu —"
                    }
                  />
                </SelectTrigger>
                <SelectContent className="max-h-72 rounded-xl">
                  {prodiList.map((p) => (
                    <SelectItem key={p} value={p} className="rounded-lg">
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Nomor WhatsApp"
            required
            error={errors.phone?.message}
            hint="tanpa 0 di depan"
          >
            <div className="flex">
              <span className="inline-flex select-none items-center rounded-l-xl border border-r-0 border-primary/20 bg-secondary/60 px-3.5 text-sm font-semibold text-foreground">
                +62
              </span>
              <Input
                placeholder="812 3456 7890"
                inputMode="numeric"
                className="h-12 rounded-l-none rounded-r-xl"
                {...register("phone", {
                  onChange: (e) => {
                    // strip everything except digits, then remove leading 0(s)
                    const cleaned = e.target.value
                      .replace(/[^0-9]/g, "")
                      .replace(/^0+/, "");
                    if (e.target.value !== cleaned) {
                      e.target.value = cleaned;
                    }
                  },
                  setValueAs: (v) =>
                    String(v ?? "")
                      .replace(/[^0-9]/g, "")
                      .replace(/^0+/, ""),
                })}
              />
            </div>
          </FormField>
          <FormField
            label="Username Instagram"
            required
            error={errors.instagram?.message}
          >
            <Input
              placeholder="cth. ftrn.isijogja"
              className="h-12 rounded-xl"
              {...register("instagram")}
            />
          </FormField>
        </div>

        <FormField
          label="Biodata Singkat"
          required
          error={errors.bio?.message}
          hint={`${watched(watch("bio"))}/800`}
        >
          <Textarea
            placeholder="Ceritakan sedikit tentang dirimu — hobi, minat, pengalaman, dll."
            rows={3}
            className="rounded-xl resize-none"
            {...register("bio")}
          />
        </FormField>
      </FieldGroup>

      {/* ===== Pilihan Divisi ===== */}
      <FieldGroup title="Pilihan Divisi">
        <FormField
          label="Divisi Utama (1st Choice)"
          required
          error={errors.firstChoiceDivision?.message}
        >
          <Controller
            control={control}
            name="firstChoiceDivision"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Pilih divisi utama…" />
                </SelectTrigger>
                <SelectContent className="max-h-80 rounded-xl">
                  {DIVISIONS.filter(
                    (d) => d.id !== watch("secondChoiceDivision")
                  ).map((d) => (
                    <SelectItem key={d.id} value={d.id} className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <d.icon className="h-4 w-4 text-primary" />
                        {d.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Statement — Kenapa divisi ini?"
          required
          error={errors.firstChoiceStatement?.message}
          hint={`${watched(watch("firstChoiceStatement"))}/1000`}
        >
          <Textarea
            placeholder="Tuliskan alasan & apa yang bisa kamu kontribusikan…"
            rows={3}
            className="rounded-xl resize-none"
            {...register("firstChoiceStatement")}
          />
        </FormField>

        <FormField
          label="Divisi Alternatif (2nd Choice)"
          required
          error={errors.secondChoiceDivision?.message}
        >
          <Controller
            control={control}
            name="secondChoiceDivision"
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
              >
                <SelectTrigger className="h-12 rounded-xl">
                  <SelectValue placeholder="Pilih divisi alternatif…" />
                </SelectTrigger>
                <SelectContent className="max-h-80 rounded-xl">
                  {DIVISIONS.filter(
                    (d) => d.id !== watch("firstChoiceDivision")
                  ).map((d) => (
                    <SelectItem key={d.id} value={d.id} className="rounded-lg">
                      <span className="flex items-center gap-2">
                        <d.icon className="h-4 w-4 text-primary" />
                        {d.name}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </FormField>

        <FormField
          label="Statement — Kenapa jadi alternatif?"
          required
          error={errors.secondChoiceStatement?.message}
          hint={`${watched(watch("secondChoiceStatement"))}/1000`}
        >
          <Textarea
            placeholder="Ceritakan kenapa divisi ini layak jadi alternatif…"
            rows={3}
            className="rounded-xl resize-none"
            {...register("secondChoiceStatement")}
          />
        </FormField>
      </FieldGroup>

      {/* ===== Tambahan ===== */}
      <FieldGroup title="Tambahan (Opsional)" optional>
        <FormField
          label="Keahlian / Skill"
          hint="opsional"
          error={errors.skills?.message}
        >
          <Textarea
            placeholder="Desain, editing video, MC, fotografi, dll."
            rows={2}
            className="rounded-xl resize-none"
            {...register("skills")}
          />
        </FormField>

        <FormField
          label="Link Portfolio / Drive"
          hint="opsional"
          error={errors.portfolioLink?.message}
        >
          <Input
            placeholder="https://…"
            className="h-12 rounded-xl"
            {...register("portfolioLink")}
          />
        </FormField>

        <FormField
          label="Pengalaman Organisasi / Event"
          hint="opsional"
          error={errors.experience?.message}
        >
          <Textarea
            placeholder="Pengalaman panitia/organisasi sebelumnya…"
            rows={2}
            className="rounded-xl resize-none"
            {...register("experience")}
          />
        </FormField>
      </FieldGroup>

      {/* ===== Persetujuan ===== */}
      <div className="rounded-2xl border border-primary/12 bg-card p-4 sm:p-5">
        <Controller
          control={control}
          name="agree"
          render={({ field }) => (
            <label
              htmlFor="agree"
              className="flex cursor-pointer items-start gap-3"
            >
              <Checkbox
                id="agree"
                checked={!!field.value}
                onCheckedChange={(c) => field.onChange(c === true)}
                className="mt-0.5"
              />
              <span className="text-sm font-light leading-relaxed text-foreground/90">
                Saya menyatakan data yang diisi{" "}
                <strong className="font-semibold">benar &amp; valid</strong>,
                dan bersedia dihubungi panitia FTRN #5 untuk seleksi lanjutan.
              </span>
            </label>
          )}
        />
        {errors.agree?.message && (
          <p className="mt-2 text-xs font-medium text-destructive">
            {errors.agree.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={submitting}
          size="lg"
          className="group h-12 rounded-full px-8 text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 disabled:opacity-70"
        >
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Mengirim…
            </>
          ) : (
            <>
              Kirim Pendaftaran
              <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </>
          )}
        </Button>
      </div>
    </form>
  );
}

/* ===== Sub components ===== */

function watched(v: string | undefined): number {
  return (v ?? "").length;
}

function FieldGroup({
  title,
  optional,
  children,
}: {
  title: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <h2 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
          {title}
        </h2>
        {optional && (
          <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
            Opsional
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function FormField({
  label,
  required,
  error,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="text-sm font-medium text-foreground">
          {label}
          {required && <span className="ml-0.5 text-destructive">*</span>}
        </Label>
        {hint && (
          <span className="text-[10px] font-medium text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
      {error && (
        <p className="text-xs font-medium text-destructive">{error}</p>
      )}
    </div>
  );
}

function SuccessState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="py-10 text-center"
    >
      <div className="relative mx-auto mb-6 grid h-20 w-20 place-items-center">
        <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
        <div className="relative grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
          <CheckCircle2 className="h-8 w-8" />
        </div>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight text-foreground">
        Pendaftaran Terkirim!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-pretty text-sm font-light leading-relaxed text-muted-foreground">
        Terima kasih sudah mendaftar jadi panitia{" "}
        <strong className="font-semibold text-foreground">FTRN #5</strong>. Tim
        panitia akan menghubungi kamu via WhatsApp untuk proses seleksi lanjutan.
      </p>

      <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button onClick={onReset} variant="outline" className="h-11 rounded-full px-6">
          <RotateCcw className="mr-1.5 h-4 w-4" />
          Isi Form Lagi
        </Button>
        <Button asChild className="h-11 rounded-full px-6">
          <a href="#top">
            <ArrowUp className="mr-1.5 h-4 w-4" />
            Kembali ke Atas
          </a>
        </Button>
      </div>
    </motion.div>
  );
}
