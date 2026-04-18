import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Code,
  Cloud,
  Smartphone,
  Wrench,
  Database,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services — E5Labs",
  description:
    "Explore E5Labs software development services including web development, mobile development, cloud solutions, and more.",
};

const services = [
  {
    id: "web-development",
    icon: Code,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks, responsive design, and performance at the core. From single-page apps to complex enterprise platforms.",
    capabilities: [
      "React & Next.js applications",
      "Full-stack TypeScript development",
      "Progressive web apps",
      "API design & integration",
    ],
  },
  {
    id: "mobile-development",
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile applications that deliver seamless user experiences across iOS and Android.",
    capabilities: [
      "React Native & cross-platform",
      "Native iOS & Android",
      "Mobile UI/UX development",
      "App store deployment",
    ],
  },
  {
    id: "cloud-solutions",
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scable cloud architecture, DevOps automation, and infrastructure management to keep your applications running reliably.",
    capabilities: [
      "Cloud architecture design",
      "CI/CD pipeline setup",
      "Containerization & orchestration",
      "Monitoring & observability",
    ],
  },
  {
    id: "database",
    icon: Database,
    title: "Data Engineering",
    description:
      "Database design, data pipelines, and analytics infrastructure that turn your data into actionable insights.",
    capabilities: [
      "Database architecture & optimization",
      "Data pipeline development",
      "ETL & data integration",
      "Analytics & reporting",
    ],
  },
  {
    id: "consulting",
    icon: Wrench,
    title: "Technical Consulting",
    description:
      "Expert guidance on technology strategy, architecture decisions, and development processes to help you make informed choices.",
    capabilities: [
      "Architecture reviews",
      "Technology stack evaluation",
      "Code audits & optimization",
      "Team process improvement",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Services
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              What we build
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              From concept to deployment, we deliver comprehensive software
              development services tailored to your business needs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="space-y-12">
            {services.map((service) => (
              <Card key={service.id} id={service.id} className="scroll-mt-20">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <service.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-2xl">{service.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base mb-6">
                    {service.description}
                  </CardDescription>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {service.capabilities.map((cap) => (
                      <li
                        key={cap}
                        className="flex items-center gap-2 text-sm text-muted-foreground"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Let&apos;s discuss how we can help bring your software vision to
              life.
            </p>
            <div className="mt-8">
              <Button render={<Link href="/contact" />} size="lg">
                Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}