import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ServiceCard } from "@/components/service-card";
import { SectionTitle } from "@/components/section-title";
import { HeroPattern } from "@/components/hero-pattern";
import {
  Globe,
  Terminal,
  Cloud,
  ChevronDown,
  Search,
  Hammer,
  HeartHandshake,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Applications",
    description:
      "Full-stack web platforms built for performance and scale. From single-page apps to complex enterprise systems.",
    href: "/services#web-development",
  },
  {
    icon: Terminal,
    title: "Developer Tools",
    description:
      "Internal tools, CLIs, and APIs that accelerate engineering velocity and improve developer experience.",
    href: "/services#dev-tools",
  },
  {
    icon: Cloud,
    title: "Cloud Infrastructure",
    description:
      "Architecture, deployment, and operations for modern cloud-native systems. Reliable at any scale.",
    href: "/services#cloud-infrastructure",
  },
];

const processSteps = [
  {
    icon: Search,
    title: "Discover",
    description:
      "We immerse ourselves in your domain, mapping requirements and constraints before writing a line of code.",
  },
  {
    icon: Hammer,
    title: "Build",
    description:
      "Iterative development with tight feedback loops. Ship early, refine continuously.",
  },
  {
    icon: HeartHandshake,
    title: "Operate",
    description:
      "We don't disappear after launch. Observability, optimization, and ongoing partnership.",
  },
];

function HeroSection() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
      <HeroPattern />
      <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-24 md:px-8 lg:px-10">
        <div className="mx-auto max-w-[800px] text-center">
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up opacity-0 [animation-delay:0ms] motion-reduce:animate-none motion-reduce:opacity-100">
            <div className="h-0.5 w-6 bg-accent-amber" />
            <span className="text-xs uppercase tracking-[0.08em] text-accent-amber font-medium">
              Software Development
            </span>
          </div>
          <h1 className="font-heading text-[3rem] font-bold leading-[1.1] tracking-[-0.02em] text-neutral-50 sm:text-[3.75rem] lg:text-[4.5rem] animate-fade-up opacity-0 [animation-delay:150ms] motion-reduce:animate-none motion-reduce:opacity-100">
            We build software that{" "}
            <span className="bg-gradient-to-r from-accent-amber via-accent-amber-light to-accent-amber bg-clip-text text-transparent">
              matters
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-300 leading-relaxed animate-fade-up opacity-0 [animation-delay:300ms] motion-reduce:animate-none motion-reduce:opacity-100">
            E5Labs is a software development firm crafting high-performance
            applications, platforms, and developer tools.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-fade-up opacity-0 [animation-delay:450ms] motion-reduce:animate-none motion-reduce:opacity-100">
            <Button
              render={<Link href="/services" />}
              className="rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light hover:shadow-glow transition-all duration-200 h-11 px-6"
            >
              Our Work <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              render={<Link href="/contact" />}
              variant="outline"
              className="rounded-full border-neutral-300 text-neutral-300 hover:text-neutral-50 hover:border-neutral-50 font-heading font-medium h-11 px-6"
            >
              Get in Touch
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-neutral-400">
        <ChevronDown className="h-6 w-6" />
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="What We Build"
          title="Development capabilities"
          description="End-to-end engineering for products that demand more than the ordinary."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  return (
    <section className="py-16 md:py-24 bg-primary-900/50">
      <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
        <SectionTitle
          eyebrow="How We Work"
          title="From concept to production"
          description="A proven process that delivers results through deep collaboration and iterative development."
          align="center"
        />
        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {processSteps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col items-center text-center">
              {i < processSteps.length - 1 && (
                <div className="absolute top-8 left-[calc(50%+40px)] hidden h-px w-[calc(100%-80px)] bg-gradient-to-r from-primary-700 to-transparent md:block" />
              )}
              <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-accent-amber/30 bg-primary-800">
                <step.icon className="h-7 w-7 text-accent-amber" />
              </div>
              <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-50">
                {step.title}
              </h3>
              <p className="mt-3 text-neutral-400 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="bg-gradient-to-r from-accent-amber to-accent-amber-dark py-16 md:py-20">
      <div className="mx-auto max-w-[1280px] px-4 text-center md:px-8 lg:px-10">
        <h2 className="font-heading text-2xl font-bold tracking-tight text-primary-950 sm:text-[2.25rem]">
          Have a project in mind?
        </h2>
        <p className="mt-4 text-lg text-primary-900">
          Let&apos;s talk about how E5Labs can help.
        </p>
        <div className="mt-8">
          <Button
            render={<Link href="/contact" />}
            variant="outline"
            className="rounded-full border-primary-950 text-primary-950 hover:bg-primary-950/10 font-heading font-medium h-11 px-6"
          >
            Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <CTABanner />
    </>
  );
}