import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SectionTitle } from "@/components/section-title";
import { HeroPattern } from "@/components/hero-pattern";
import {
  Globe,
  Terminal,
  Cloud,
  Wrench,
  Database,
  Shield,
  ArrowRight,
  Code,
  Cpu,
  GitBranch,
  Box,
  Cable,
  Activity,
  BarChart3,
  Lock,
  FileSearch,
  GitMerge,
  GraduationCap,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services — E5Labs",
  description:
    "Web application development, developer tooling, cloud architecture, and technical consulting. We build the software where engineering quality is the difference between shipping and succeeding.",
  openGraph: {
    title: "Services — E5Labs",
    description:
      "Web application development, developer tooling, cloud architecture, and technical consulting. We build the software where engineering quality is the difference between shipping and succeeding.",
    url: "https://e5labs.com/services",
    siteName: "E5Labs",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Services — E5Labs",
      },
    ],
  },
};

const services = [
  {
    id: "web-development",
    number: "01",
    icon: Globe,
    title: "Web Application Development",
    description:
      "Full-stack web platforms with React, Next.js, and Node — built for real traffic, real users, and real uptime. We design for evolution so you can scale without a rewrite.",
    features: [
      { icon: Code, label: "React & Next.js applications" },
      { icon: Cpu, label: "Full-stack TypeScript development" },
      { icon: GitBranch, label: "Progressive web apps" },
      { icon: Cable, label: "API design & integration" },
      { icon: Shield, label: "Auth & security" },
      { icon: Activity, label: "CI/CD integration" },
    ],
  },
  {
    id: "dev-tools",
    number: "02",
    icon: Terminal,
    title: "Developer Tooling & APIs",
    description:
      "CLIs, SDKs, and internal platforms that make engineering teams measurably faster. We build the tools we'd want to reach for — type-safe, well-documented, and designed around real developer workflows.",
    features: [
      { icon: Code, label: "Type-safe APIs" },
      { icon: FileSearch, label: "Developer documentation" },
      { icon: Terminal, label: "CLI tooling" },
      { icon: Box, label: "Plugin architectures" },
      { icon: GitMerge, label: "Automation pipelines" },
    ],
  },
  {
    id: "cloud-infrastructure",
    number: "03",
    icon: Cloud,
    title: "Cloud Architecture & DevOps",
    description:
      "Infrastructure that deploys cleanly, scales predictably, and doesn't surprise you at 2 AM. We design for operability first — because systems live or die in production, and we build for the life part.",
    features: [
      { icon: Database, label: "IaC (Terraform/Pulumi)" },
      { icon: Box, label: "Container orchestration" },
      { icon: Activity, label: "Observability stacks" },
      { icon: BarChart3, label: "Cost optimization" },
      { icon: Shield, label: "Security hardening" },
    ],
  },
  {
    id: "consulting",
    number: "04",
    icon: Wrench,
    title: "Technical Consulting",
    description:
      "Architecture reviews, technology decisions, and engineering strategy from engineers who've shipped and operated production systems. We help you make the calls you won't regret in six months — or six years.",
    features: [
      { icon: FileSearch, label: "System design reviews" },
      { icon: Globe, label: "Migration planning" },
      { icon: Lock, label: "Security audits" },
      { icon: GraduationCap, label: "Team mentoring" },
    ],
  },
];

const technologies = [
  { label: "TypeScript", category: "Languages" },
  { label: "Python", category: "Languages" },
  { label: "Go", category: "Languages" },
  { label: "React", category: "Frameworks" },
  { label: "Next.js", category: "Frameworks" },
  { label: "Node.js", category: "Frameworks" },
  { label: "PostgreSQL", category: "Data" },
  { label: "Redis", category: "Data" },
  { label: "AWS", category: "Cloud" },
  { label: "GCP", category: "Cloud" },
  { label: "Docker", category: "Tools" },
  { label: "Kubernetes", category: "Tools" },
  { label: "Terraform", category: "Tools" },
  { label: "GitHub Actions", category: "Tools" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <HeroPattern />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-32 text-center md:px-8 lg:px-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-6 bg-accent-amber" />
            <span className="text-xs uppercase tracking-[0.08em] text-accent-amber font-medium">
              Services
            </span>
          </div>
          <h1 className="font-heading text-[2.25rem] font-bold leading-[1.2] tracking-[-0.01em] text-neutral-50 md:text-[3rem]">
            What we build
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-300 leading-relaxed">
            Engineering where quality decides the outcome — for teams
            that need software they can depend on, not just deploy.
          </p>
        </div>
      </section>

      <section className="hero-divider py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <div className="space-y-8">
            {services.map((service) => (
              <div
                key={service.id}
                id={service.id}
                className="scroll-mt-24 rounded-xl border border-primary-700/50 bg-primary-900/30 p-8 transition-all duration-300 hover:border-primary-600/60"
              >
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-8 lg:items-start">
                  <div className="lg:col-span-7">
                    <div className="flex items-start gap-4">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-amber/20 text-accent-amber font-heading font-semibold text-sm ring-1 ring-accent-amber/30">
                        {service.number}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <service.icon className="h-6 w-6 text-accent-amber" />
                          <h2 className="font-heading text-3xl font-semibold text-neutral-50 sm:text-[2.5rem] sm:leading-[1.2]">
                            {service.title}
                          </h2>
                        </div>
                        <p className="max-w-prose text-lg text-neutral-300 leading-relaxed">
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="lg:col-span-5">
                    <div className="rounded-xl border border-primary-600 bg-gradient-to-br from-primary-800 to-primary-900 p-6">
                      <h3 className="font-heading text-sm font-medium uppercase tracking-[0.08em] text-accent-amber mb-4">Capabilities</h3>
                      <ul className="space-y-3">
                        {service.features.map((feature) => (
                          <li
                            key={feature.label}
                            className="flex items-center gap-3"
                          >
                            <feature.icon className="h-4 w-4 text-accent-amber flex-shrink-0" />
                            <span className="text-neutral-300">
                              {feature.label}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-accent py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <h3 className="font-heading text-xl font-semibold text-neutral-50 mb-8">
            Technologies We Use
          </h3>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech) => (
              <span
                key={tech.label}
                className="inline-flex items-center rounded-full border border-primary-600 bg-primary-800 px-4 py-2 text-sm text-neutral-300"
              >
                {tech.label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider py-14 md:py-20">
        <div className="mx-auto max-w-[1280px] px-4 text-center md:px-8 lg:px-10">
          <SectionTitle
            title="Ready to start a project?"
            description="Tell us about what you're building — we'll get back to you within 24 hours with next steps."
            align="center"
          />
          <div className="mt-8">
            <Button
              render={<Link href="/contact" />}
              className="rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light hover:shadow-glow transition-all duration-200 h-11 px-6"
              size="lg"
            >
              Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}