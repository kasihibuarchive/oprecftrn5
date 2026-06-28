import { Navbar } from "@/components/ftrn/navbar";
import { Hero } from "@/components/ftrn/hero";
import { About } from "@/components/ftrn/about";
import { Divisions } from "@/components/ftrn/divisions";
import { RegistrationForm } from "@/components/ftrn/registration-form";
import { Contact } from "@/components/ftrn/contact";
import { Footer } from "@/components/ftrn/footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <About />
        <Divisions />
        <RegistrationForm />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
