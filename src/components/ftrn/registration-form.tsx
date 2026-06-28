"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  AtSign,
  FileText,
  Target,
  Sparkles,
  Send,
  Loader2,
  CheckCircle2,
  PartyPopper,
  ChevronRight,
  ShieldCheck,
  Link2,
  Briefcase,
  Heart,
  Clock,
} from "lucide-react";
import { toast } from "sonner";
import { registrationSchema, type RegistrationInput } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { DivisionPicker } from "./division-picker";
import { BenefitsButton } from "./benefits-dialog";
import { DocsButton } from "./docs-dialog";
import { NatureDecor } from "./nature-decor";

export function RegistrationForm() {
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
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

  // Progress calculation
  const watched = watch();
  const fields = [
    "fullName",
    "faculty",
    "phone",
    "instagram",
    "bio",
    "firstChoiceDivision",
    "firstChoiceStatement",
    "secondChoiceDivision",
    "secondChoiceStatement",
    "agree",
  ] as const;
  const filled = fields.filter(
    (f) => String(watched[f] ?? "").trim().length > 0
  ).length;
  const progress = Math.round((filled / fields.length) * 100);

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
    <section id="daftar" className="relative overflow-hidden py-20 sm:py-28">
      <NatureDecor variant="section" />
      <div className="relative mx-auto max-w-3xl px-5">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
            <FileText className="h-3.5 w-3.5" />
            Formulir Pendaftaran
          </span>
          <h2 className="mt-5 text-balance text-3xl font-bold leading-tight tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Saatnya{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text font-extrabold text-transparent">
              mendaftar
            </span>
          </h2>
          <p className="mt-4 text-pretty text-base font-light text-muted-foreground sm:text-lg">
            Isi formulir berikut dengan jujur &amp; lengkap. Cek juga benefit &amp;
            dokumentasi FTRN #4 sebelum mendaftar.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <BenefitsButton>
              <Sparkles className="mr-1.5 h-4 w-4" />
              Lihat Benefit
            </BenefitsButton>
            <DocsButton>
              <FileText className="mr-1.5 h-4 w-4" />
              Dokumentasi FTRN #4
            </DocsButton>
          </div>
        </motion.div>

        {/* Progress bar */}
        <div className="sticky top-16 z-30 mt-8 rounded-2xl border border-primary/12 bg-card/85 p-3 backdrop-blur-md">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-muted-foreground">
              Kelengkapan form
            </span>
            <span className="text-xs font-bold text-primary">{progress}%</span>
          </div>
          <Progress
            value={progress}
            className="mt-2 h-1.5 bg-primary/10 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent"
          />
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6"
          noValidate
        >
          {/* ===== Section 1: Data Diri ===== */}
          <FormSection
            index="01"
            title="Data Diri"
            subtitle="Informasi dasar tentang kamu."
            icon={User}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nama Lengkap" required error={errors.fullName?.message}>
                <Input
                  placeholder="cth. Rangga Mahardika"
                  className="h-11 rounded-xl"
                  {...register("fullName")}
                />
              </Field>
              <Field
                label="Fakultas / Jurusan"
                required
                error={errors.faculty?.message}
              >
                <Input
                  placeholder="cth. FSR — Jurusan Teater"
                  className="h-11 rounded-xl"
                  {...register("faculty")}
                />
              </Field>
              <Field
                label="Nomor WhatsApp"
                required
                error={errors.phone?.message}
                icon={Phone}
              >
                <Input
                  placeholder="cth. 0812 3456 7890"
                  inputMode="tel"
                  className="h-11 rounded-xl"
                  {...register("phone")}
                />
              </Field>
              <Field
                label="Username Instagram"
                required
                error={errors.instagram?.message}
                icon={AtSign}
              >
                <Input
                  placeholder="cth. rangga.mh"
                  className="h-11 rounded-xl"
                  {...register("instagram")}
                />
              </Field>
            </div>

            <Field
              label="Biodata Singkat"
              required
              error={errors.bio?.message}
              hint={`${watched.bio?.length ?? 0} / 800 karakter`}
            >
              <Textarea
                placeholder="Ceritakan tentang dirimu — hobi, minat, organisasi, pengalaman relevan, dll."
                rows={4}
                className="rounded-xl resize-none"
                {...register("bio")}
              />
            </Field>
          </FormSection>

          {/* ===== Section 2: Pilihan Divisi ===== */}
          <FormSection
            index="02"
            title="Pilihan Divisi"
            subtitle="Pilih divisi utama (1st choice) & alternatif (2nd choice)."
            icon={Target}
          >
            <div className="space-y-5">
              {/* 1st choice */}
              <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-full bg-primary px-2.5 text-[11px] font-bold uppercase tracking-wider text-primary-foreground">
                    1st Choice
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Divisi Utama
                  </span>
                </div>
                <Controller
                  control={control}
                  name="firstChoiceDivision"
                  render={({ field }) => (
                    <DivisionPicker
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.firstChoiceDivision?.message}
                      label="Pilih divisi utama kamu…"
                      excludeId={watched.secondChoiceDivision}
                    />
                  )}
                />
                <div className="mt-4">
                  <Field
                    label="Statement — Kenapa kamu milih divisi ini?"
                    required
                    error={errors.firstChoiceStatement?.message}
                    hint={`${watched.firstChoiceStatement?.length ?? 0} / 1000`}
                  >
                    <Textarea
                      placeholder="Tuliskan alasan, motivasi, &amp; apa yang bisa kamu kontribusikan untuk divisi ini…"
                      rows={4}
                      className="rounded-xl resize-none"
                      {...register("firstChoiceStatement")}
                    />
                  </Field>
                </div>
              </div>

              {/* 2nd choice */}
              <div className="rounded-2xl border border-accent/20 bg-accent/5 p-4 sm:p-5">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-6 items-center rounded-full bg-accent px-2.5 text-[11px] font-bold uppercase tracking-wider text-accent-foreground">
                    2nd Choice
                  </span>
                  <span className="text-sm font-semibold text-foreground">
                    Divisi Alternatif
                  </span>
                </div>
                <Controller
                  control={control}
                  name="secondChoiceDivision"
                  render={({ field }) => (
                    <DivisionPicker
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.secondChoiceDivision?.message}
                      label="Pilih divisi alternatif kamu…"
                      excludeId={watched.firstChoiceDivision}
                    />
                  )}
                />
                <div className="mt-4">
                  <Field
                    label="Statement — Kenapa divisi ini jadi alternatif?"
                    required
                    error={errors.secondChoiceStatement?.message}
                    hint={`${watched.secondChoiceStatement?.length ?? 0} / 1000`}
                  >
                    <Textarea
                      placeholder="Ceritakan kenapa divisi ini layak jadi pilihan alternatif…"
                      rows={3}
                      className="rounded-xl resize-none"
                      {...register("secondChoiceStatement")}
                    />
                  </Field>
                </div>
              </div>
            </div>
          </FormSection>

          {/* ===== Section 3: Tambahan (opsional) ===== */}
          <FormSection
            index="03"
            title="Tambahan"
            subtitle="Opsional — tapi bikin kamu makin menonjol."
            icon={Sparkles}
            optional
          >
            <div className="grid gap-4">
              <Field
                label="Keahlian / Skill"
                hint="opsional"
                error={errors.skills?.message}
                icon={Briefcase}
              >
                <Textarea
                  placeholder="Desain, editing video, MC, nulis, fotografi, organisasi, dll."
                  rows={2}
                  className="rounded-xl resize-none"
                  {...register("skills")}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  label="Link Portfolio / Drive"
                  hint="opsional"
                  error={errors.portfolioLink?.message}
                  icon={Link2}
                >
                  <Input
                    placeholder="https://…"
                    className="h-11 rounded-xl"
                    {...register("portfolioLink")}
                  />
                </Field>
                <Field
                  label="Ketersediaan Waktu"
                  hint="opsional"
                  error={errors.availability?.message}
                  icon={Clock}
                >
                  <Input
                    placeholder="cth. Full / paruh / weekend saja"
                    className="h-11 rounded-xl"
                    {...register("availability")}
                  />
                </Field>
              </div>

              <Field
                label="Pengalaman Organisasi / Event"
                hint="opsional"
                error={errors.experience?.message}
                icon={ShieldCheck}
              >
                <Textarea
                  placeholder="Pengalaman panitia, organisasi, atau event sebelumnya…"
                  rows={3}
                  className="rounded-xl resize-none"
                  {...register("experience")}
                />
              </Field>

              <Field
                label="Motivasi Ikut FTRN #5"
                hint="opsional"
                error={errors.motivation?.message}
                icon={Heart}
              >
                <Textarea
                  placeholder="Apa yang bikin kamu semangat ikut FTRN #5?"
                  rows={2}
                  className="rounded-xl resize-none"
                  {...register("motivation")}
                />
              </Field>
            </div>
          </FormSection>

          {/* ===== Agreement ===== */}
          <FormSection
            index="04"
            title="Pernyataan"
            subtitle="Setujui sebelum mengirim."
            icon={ShieldCheck}
          >
            <Controller
              control={control}
              name="agree"
              render={({ field }) => (
                <label
                  htmlFor="agree"
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-primary/15 bg-card p-4 transition-colors hover:bg-primary/5"
                >
                  <Checkbox
                    id="agree"
                    checked={!!field.value}
                    onCheckedChange={(c) => field.onChange(c === true)}
                    className="mt-0.5"
                  />
                  <span className="text-sm font-light leading-relaxed text-foreground/90">
                    Saya menyatakan bahwa data yang diisi adalah{" "}
                    <strong className="font-semibold">benar &amp; valid</strong>.
                    Saya bersedia dihubungi panitia FTRN #5 untuk proses
                    seleksi lanjutan, dan menyetujui ketentuan rekrutmen yang
                    berlaku.
                  </span>
                </label>
              )}
            />
            {errors.agree?.message && (
              <p className="mt-2 text-xs font-medium text-destructive">
                {errors.agree.message}
              </p>
            )}
          </FormSection>

          {/* Submit */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <Button
              type="submit"
              disabled={submitting}
              size="lg"
              className="group h-13 w-full rounded-full px-8 py-3.5 text-sm font-bold shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/35 disabled:opacity-70 sm:w-auto"
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
            <p className="text-center text-xs font-light text-muted-foreground">
              Dengan mendaftar, kamu menyetujui kebijakan data FTRN #5.
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

/* ===== Sub components ===== */

function FormSection({
  index,
  title,
  subtitle,
  icon: Icon,
  optional,
  children,
}: {
  index: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5 }}
      className="rounded-3xl border border-primary/12 bg-card/80 p-5 shadow-sm backdrop-blur-sm sm:p-7"
    >
      <div className="mb-5 flex items-start gap-3">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary/60">
              {index}
            </span>
            {optional && (
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                Opsional
              </span>
            )}
          </div>
          <h3 className="text-lg font-bold leading-tight text-foreground sm:text-xl">
            {title}
          </h3>
          <p className="text-sm font-light text-muted-foreground">{subtitle}</p>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </motion.section>
  );
}

function Field({
  label,
  required,
  error,
  hint,
  icon,
  children,
}: {
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between gap-2">
        <Label className="flex items-center gap-1.5 text-sm font-medium text-foreground">
          {icon && <icon className="h-3.5 w-3.5 text-muted-foreground" />}
          {label}
          {required && <span className="text-destructive">*</span>}
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
    <section id="daftar" className="relative overflow-hidden py-20 sm:py-28">
      <NatureDecor variant="section" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative mx-auto max-w-lg px-5 text-center"
      >
        <div className="relative mx-auto mb-6 grid h-24 w-24 place-items-center">
          <span className="absolute inset-0 rounded-full bg-primary/20 animate-pulse-ring" />
          <span className="absolute inset-2 rounded-full bg-primary/15 animate-pulse-ring [animation-delay:0.4s]" />
          <div className="relative grid h-20 w-20 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
            <CheckCircle2 className="h-10 w-10" />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="flex items-center justify-center gap-2 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            <PartyPopper className="h-7 w-7 text-accent" />
            Pendaftaran Terkirim!
          </h2>
          <p className="mt-3 text-pretty text-base font-light leading-relaxed text-muted-foreground">
            Terima kasih sudah mendaftar jadi panitia{" "}
            <strong className="font-semibold text-foreground">FTRN #5</strong>.
            Tim panitia akan menghubungi kamu via WhatsApp untuk proses seleksi
            lanjutan. Sampai jumpa di panggung raya! 🌿
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              onClick={onReset}
              variant="outline"
              className="h-11 rounded-full px-6"
            >
              Daftar Akun Lain
              <ChevronRight className="ml-1.5 h-4 w-4" />
            </Button>
            <Button asChild className="h-11 rounded-full px-6">
              <a href="#hero">Kembali ke Atas</a>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
