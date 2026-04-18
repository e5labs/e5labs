import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { HeroPattern } from "@/components/hero-pattern";
import { Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact — E5Labs",
  description:
    "Start a conversation with E5Labs. Tell us about your project and we'll respond within 24 hours with next steps.",
  openGraph: {
    title: "Contact — E5Labs",
    description:
      "Start a conversation with E5Labs. Tell us about your project and we'll respond within 24 hours with next steps.",
    url: "https://e5labs.com/contact",
    siteName: "E5Labs",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <section className="relative flex min-h-[30vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <HeroPattern />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-24 text-center md:px-8 lg:px-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-6 bg-accent-amber" />
            <span className="text-xs uppercase tracking-[0.08em] text-accent-amber font-medium">
              Contact
            </span>
          </div>
          <h1 className="font-heading text-[2.25rem] font-bold leading-[1.2] tracking-[-0.01em] text-neutral-50 md:text-[3rem]">
            Let&apos;s build something.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-300 leading-relaxed">
            Whether you&apos;re early-stage with a concept or scaling an
            existing system, we&apos;d like to hear about what you&apos;re
            building — and where it needs to go next.
          </p>
        </div>
      </section>

      <section className="hero-divider py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <h2 className="sr-only">Send us a message</h2>
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="rounded-xl border border-primary-600 bg-primary-800/50 p-8">
                <ContactForm />
              </div>
            </div>

            <div className="lg:col-span-5">
              <h3 className="font-heading text-xl font-semibold text-neutral-50">
                Get in touch
              </h3>
              <div className="mt-8 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-amber/10 ring-1 ring-accent-amber/20">
                    <Mail className="h-5 w-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-50">Email</p>
                    <a
                      href="mailto:hello@e5labs.com"
                      className="text-accent-amber hover:text-accent-amber-light transition-colors"
                    >
                      hello@e5labs.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-amber/10 ring-1 ring-accent-amber/20">
                    <Clock className="h-5 w-5 text-accent-amber" />
                  </div>
                  <div>
                    <p className="font-medium text-neutral-50">
                      Response time
                    </p>
                    <p className="text-neutral-300">
                      Usually within 24 hours
                    </p>
                  </div>
                </div>
                <div className="mt-8 rounded-xl border border-primary-600 bg-gradient-to-br from-primary-800 to-primary-900 p-6">
                  <p className="text-sm text-neutral-300 leading-relaxed">
                    We work with teams at every stage — validating a concept,
                    scaling an existing product, or re-architecting a system
                    that needs to hold up under pressure. The earlier you bring
                    us in, the more value we can add.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}