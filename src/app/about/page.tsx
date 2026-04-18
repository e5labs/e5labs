import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Target, Users, Lightbulb } from "lucide-react";

export const metadata: Metadata = {
  title: "About — E5Labs",
  description:
    "Learn about E5Labs, a software development firm concentrating on software development efforts.",
};

const values = [
  {
    icon: Target,
    title: "Focus",
    description:
      "We concentrate on software development efforts, delivering precision and quality in every project we undertake.",
  },
  {
    icon: Users,
    title: "Partnership",
    description:
      "We work closely with our clients as true partners, understanding their goals and building solutions that last.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We stay at the forefront of technology, applying modern tools and practices to solve complex problems.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl">
            <Badge variant="secondary" className="mb-6">
              About Us
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Who we are
            </h1>
            <div className="mt-8 space-y-6 text-lg text-muted-foreground">
              <p>
                E5Labs is a software development firm concentrating on software
                development efforts. We specialize in building robust, scalable
                solutions that help businesses grow and thrive in the digital
                age.
              </p>
              <p>
                Our team of experienced engineers brings deep expertise across
                the full spectrum of software development — from frontend and
                backend engineering to cloud infrastructure and DevOps. We don&apos;t
                just write code; we craft solutions that make a real difference.
              </p>
              <p>
                Whether you need a custom web application, a mobile app, or a
                complete cloud migration, E5Labs has the expertise and focus to
                deliver exceptional results.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our values
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              The principles that guide everything we build.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{value.title}</h3>
                <p className="mt-3 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}