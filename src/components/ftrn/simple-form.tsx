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
import { DIVISIONS, FTRN_INFO } from "@/lib/data";
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
import { DocsButton } from "./docs-dialog";
import { Leaf } from "./nature-decor";

export function SimpleForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    reset,
    formState: { errors },
  } = useForm<RegistrationInput>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      faculty: "",
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
      availability: "",
      agree: false as unknown as true,
    },
    mode: "onTouched",
  });

  const onSubmit = async (data: RegistrationInput) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json?.error || "Gagal mengirim formulir");
      setSuccess(true);
      reset();
      toast.success("Pendaftaran terkirim!", {
        description: "Tim FTRN #5 akan menghubungi kamu via WhatsApp.",
      });
    } catch (e) {
      toast.error("Gagal mendaftar", {
        description:
          e instanceof Error ? e.message : "Terjadi kesalahan tak terduga.",
      });
    } finally {
      setSubmitting(false);
    }
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

        <FormField
          label="Fakultas / Jurusan"
          required
          error={errors.faculty?.message}
        >
          <Input
            placeholder="cth. FSR — Jurusan Teater"
            className="h-12 rounded-xl"
            {...register("faculty")}
          />
        </FormField>

        <div className="grid gap-4 sm:grid-cols-2">
          <FormField
            label="Nomor WhatsApp"
            required
            error={errors.phone?.message}
          >
            <Input
              placeholder="cth. 0812 3456 7890"
              inputMode="tel"
              className="h-12 rounded-xl"
              {...register("phone")}
            />
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
          hint={`${watched(watch.bio)}/800`}
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
                    (d) => d.id !== watch.secondChoiceDivision
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
          hint={`${watched(watch.firstChoiceStatement)}/1000`}
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
                    (d) => d.id !== watch.firstChoiceDivision
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
          hint={`${watched(watch.secondChoiceStatement)}/1000`}
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

        <div className="grid gap-4 sm:grid-cols-2">
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
            label="Ketersediaan Waktu"
            hint="opsional"
            error={errors.availability?.message}
          >
            <Input
              placeholder="cth. Full / weekend saja"
              className="h-12 rounded-xl"
              {...register("availability")}
            />
          </FormField>
        </div>

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
