"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail, MapPin, ArrowRight } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6">
              Contact
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Get in touch
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Have a project in mind or want to learn more about how E5Labs can
              help? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-muted/40">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                Let&apos;s start a conversation
              </h2>
              <p className="mt-4 text-muted-foreground">
                Fill out the form and we&apos;ll get back to you as soon as
                possible.
              </p>

              {submitted ? (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle>Thank you!</CardTitle>
                    <CardDescription>
                      We&apos;ve received your message and will get back to you
                      shortly.
                    </CardDescription>
                  </CardHeader>
                </Card>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="text-sm font-medium mb-2 block"
                      >
                        First name
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="text-sm font-medium mb-2 block"
                      >
                        Last name
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-medium mb-2 block"
                    >
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="subject"
                      className="text-sm font-medium mb-2 block"
                    >
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Project inquiry"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="text-sm font-medium mb-2 block"
                    >
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us about your project..."
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              )}
            </div>

            <div className="space-y-8">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Email</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    <a
                      href="mailto:hello@e5labs.com"
                      className="hover:text-foreground transition-colors"
                    >
                      hello@e5labs.com
                    </a>
                  </CardDescription>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg">Location</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Remote-first — we work with clients worldwide.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}