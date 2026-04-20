"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";

const projectTypes = [
  { value: "web-application", label: "Web Application" },
  { value: "developer-tool", label: "Developer Tool" },
  { value: "cloud-infrastructure", label: "Cloud Infrastructure" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [projectType, setProjectType] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string || undefined,
      projectType: projectType || undefined,
      message: formData.get("message") as string,
    };

    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="rounded-xl border border-accent-amber/30 bg-accent-amber/5 p-8">
        <h2 className="font-heading text-xl font-semibold text-neutral-50">
          Thank you!
        </h2>
        <p className="mt-2 text-neutral-300">
          We&apos;ve received your message and will get back to you within 24
          hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-400" />
          <div>
            <p className="text-sm text-red-300">{error}</p>
            <button
              type="button"
              onClick={() => setError(null)}
              className="mt-1 text-xs text-red-400 underline hover:text-red-300"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}
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
            disabled={loading}
            className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber disabled:opacity-50"
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
            disabled={loading}
            className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber disabled:opacity-50"
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
          disabled={loading}
          className="h-12 bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber disabled:opacity-50"
        />
      </div>
      <div>
        <label id="project-type-label" className="mb-2 block text-sm font-medium text-neutral-300">
          Project type
        </label>
        <Select value={projectType} onValueChange={(value: string | null) => setProjectType(value ?? "")} disabled={loading}>
          <SelectTrigger aria-labelledby="project-type-label" className="h-12 w-full bg-primary-800 border-primary-700 text-neutral-50 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber [&]:data-placeholder:text-neutral-500 disabled:opacity-50">
            <SelectValue placeholder="Select a type..." />
          </SelectTrigger>
          <SelectContent className="bg-primary-800 border-primary-700 text-neutral-50">
            {projectTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
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
          disabled={loading}
          className="bg-primary-800 border-primary-700 text-neutral-50 placeholder:text-neutral-500 focus-visible:ring-accent-amber/30 focus-visible:border-accent-amber disabled:opacity-50"
        />
      </div>
      <Button
        type="submit"
        disabled={loading}
        className="w-full rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light hover:shadow-glow transition-all duration-200 h-12 sm:w-auto sm:px-8 disabled:opacity-50"
        size="lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>Send Message <ArrowRight className="ml-2 h-4 w-4" /></>
        )}
      </Button>
    </form>
  );
}