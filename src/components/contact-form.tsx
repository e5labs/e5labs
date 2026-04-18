"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent-emerald/30 bg-accent-emerald/5 p-8">
        <h3 className="font-heading text-xl font-semibold text-neutral-50">
          Thank you!
        </h3>
        <p className="mt-2 text-neutral-400">
          We&apos;ve received your message and will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="name"
            className="mb-2 block text-sm font-medium text-neutral-300"
          >
            Name
          </label>
          <Input
            id="name"
            name="name"
            placeholder="Your name"
            required
            className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber"
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-neutral-300"
          >
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="you@company.com"
            required
            className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber"
          />
        </div>
      </div>
      <div>
        <label
          htmlFor="company"
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Company{" "}
          <span className="text-neutral-500">(optional)</span>
        </label>
        <Input
          id="company"
          name="company"
          placeholder="Your company"
          className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber"
        />
      </div>
      <div>
        <label
          htmlFor="projectType"
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Project type
        </label>
        <select
          id="projectType"
          name="projectType"
          className="h-12 w-full rounded-lg border border-primary-700 bg-primary-800 px-3 text-neutral-50 focus:ring-2 focus:ring-accent-amber/30 focus:border-accent-amber focus:outline-none"
        >
          <option value="">Select a type...</option>
          <option value="web-application">Web Application</option>
          <option value="developer-tool">Developer Tool</option>
          <option value="cloud-infrastructure">
            Cloud Infrastructure
          </option>
          <option value="consulting">Consulting</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label
          htmlFor="message"
          className="mb-2 block text-sm font-medium text-neutral-300"
        >
          Message
        </label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us about your project..."
          rows={6}
          required
          className="bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber"
        />
      </div>
      <Button
        type="submit"
        className="w-full rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light hover:shadow-glow transition-all duration-200 h-12 sm:w-auto sm:px-8"
        size="lg"
      >
        Send Message <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  );
}