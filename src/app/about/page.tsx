import type { Metadata } from "next";
import { SectionTitle } from "@/components/section-title";
import { ValueCard } from "@/components/value-card";
import { TeamCard } from "@/components/team-card";
import { HeroPattern } from "@/components/hero-pattern";
import { Target, Rocket, ShieldCheck, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "About — E5Labs",
  description:
    "E5Labs is an engineering-first software firm. We solve hard problems where performance, reliability, and developer experience are the difference between a product that works and one that wins.",
  openGraph: {
    title: "About — E5Labs",
    description:
      "E5Labs is an engineering-first software firm. We solve hard problems where performance, reliability, and developer experience are the difference between a product that works and one that wins.",
    url: "https://e5labs.com/about",
    siteName: "E5Labs",
    type: "website",
  },
};

const values = [
  {
    icon: Target,
    title: "Precision Over Volume",
    description:
      "One thing built right beats ten things built passably. We take on fewer problems so we can solve them thoroughly — and stand behind every result.",
  },
  {
    icon: Rocket,
    title: "Ship and Iterate",
    description:
      "Working software beats perfect plans. We get something real into users' hands fast, then refine on signal, not assumption.",
  },
  {
    icon: ShieldCheck,
    title: "Own the Outcome",
    description:
      "No hand-offs into the void. We stay past launch day — fixing, tuning, and owning the results alongside you. Your production problems are our production problems.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description:
      "No black boxes, no pleasant surprises turning into problems. We share our thinking, our progress, and our mistakes as they happen — because trust is earned in the open.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative flex min-h-[40vh] items-center justify-center overflow-hidden bg-gradient-to-br from-primary-950 via-primary-900 to-primary-800">
        <HeroPattern />
        <div className="relative z-10 mx-auto max-w-[1280px] px-4 py-24 text-center md:px-8 lg:px-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-0.5 w-6 bg-accent-amber" />
            <span className="text-xs uppercase tracking-[0.08em] text-accent-amber font-medium">
              About E5Labs
            </span>
          </div>
          <h1 className="font-heading text-[2.25rem] font-bold leading-[1.2] tracking-[-0.01em] text-neutral-50 md:text-[3rem]">
            Engineers first.
          </h1>
          <p className="mx-auto mt-6 max-w-[600px] text-lg text-neutral-300 leading-relaxed">
            We&apos;re a team of engineers who believe great software comes from
            deep technical understanding, honest communication, and the
            discipline to ship work that holds up under real conditions.
          </p>
        </div>
      </section>

      <section className="hero-divider py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <SectionTitle
                eyebrow="Our Mission"
                title="Software where quality decides the outcome"
              />
              <div className="mt-6 space-y-4 text-lg text-neutral-300 leading-relaxed">
                <p>
                  E5Labs exists to solve the software problems where engineering
                  quality decides the outcome — where a meaningful improvement in
                  performance, reliability, or developer experience is the
                  difference between a product that works and one that wins.
                </p>
                <p>
                  We partner with teams building infrastructure, platforms, and
                  tools that need to perform at scale and stay running under
                  pressure. No vanity features, no padding the backlog. Just
                  software that earns trust — and keeps it.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center self-center">
              <div className="relative h-[400px] w-full max-w-[480px] rounded-xl bg-primary-800 border border-primary-700 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-4 sm:p-8">
                  <div className="grid grid-cols-3 gap-2 sm:gap-4">
                    {[...Array(9)].map((_, i) => (
                      <div
                        key={i}
                        className="flex h-10 w-10 sm:h-16 sm:w-16 items-center justify-center rounded-lg border border-accent-amber/20 bg-accent-amber/5"
                      >
                        <div
                          className={`h-4 w-4 rounded-full ${
                            i % 3 === 0
                              ? "border-2 border-accent-amber"
                              : i % 3 === 1
                              ? "bg-accent-amber/30"
                              : "border-2 border-accent-slate-blue/40"
                          }`}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-accent py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <SectionTitle
            eyebrow="Our Values"
            title="What guides every decision"
            description="The principles behind every architectural choice, every line of code, every partnership."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2 items-stretch">
            {values.map((value) => (
              <ValueCard key={value.title} {...value} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-divider py-20 md:py-28">
        <div className="mx-auto max-w-[1280px] px-4 md:px-8 lg:px-10">
          <SectionTitle
            eyebrow="Our Team"
            title="Deep expertise across the stack"
            description="Full-stack, backend, and infrastructure engineers with production experience at scale."
            align="center"
          />
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <TeamCard initials="FS" name="Full-Stack Engineering" title="React · Next.js · Node" />
            <TeamCard initials="BE" name="Backend Engineering" title="APIs · Data · Reliability" />
            <TeamCard initials="IN" name="Infrastructure" title="Cloud · DevOps · Scale" />
          </div>
        </div>
      </section>
    </>
  );
}