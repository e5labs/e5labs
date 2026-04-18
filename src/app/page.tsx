import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code, Cloud, Smartphone, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description:
      "Full-stack web applications built with modern frameworks and best practices.",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description:
      "Native and cross-platform mobile apps that deliver exceptional user experiences.",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Scalable cloud architecture, DevOps automation, and infrastructure management.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative py-24 md:py-32 lg:py-40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Software Development
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Building software that{" "}
              <span className="text-muted-foreground">drives results</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              E5Labs is a software development firm concentrating on software
              development efforts. We turn complex challenges into elegant,
              scalable solutions.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button render={<Link href="/services" />} size="lg">
                Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button render={<Link href="/contact" />} variant="outline" size="lg">
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              What we do
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              We concentrate on delivering high-quality software development
              solutions tailored to your needs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.title}>
                <CardHeader>
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <service.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="mt-4">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button render={<Link href="/services" />} variant="outline">
              View all services <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to build something great?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Let&apos;s discuss your next project and see how E5Labs can help
              bring your vision to life.
            </p>
            <div className="mt-8">
              <Button render={<Link href="/contact" />} size="lg">
                Start a Conversation <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}