import { Resend } from "resend";
import { NextResponse } from "next/server";

export const RATE_LIMIT_MAP = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 60_000;

const projectTypes = [
  { value: "web-application", label: "Web Application" },
  { value: "developer-tool", label: "Developer Tool" },
  { value: "cloud-infrastructure", label: "Cloud Infrastructure" },
  { value: "consulting", label: "Consulting" },
  { value: "other", label: "Other" },
];

interface ContactPayload {
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}

function validatePayload(data: unknown): {
  valid: boolean;
  errors: string[];
  payload: ContactPayload | null;
} {
  if (!data || typeof data !== "object") {
    return { valid: false, errors: ["Invalid request body"], payload: null };
  }

  const body = data as Record<string, unknown>;
  const errors: string[] = [];

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const company = typeof body.company === "string" ? body.company.trim() : undefined;
  const projectType = typeof body.projectType === "string" ? body.projectType.trim() : undefined;

  if (!name) {
    errors.push("Name is required");
  } else if (name.length > 200) {
    errors.push("Name must be 200 characters or fewer");
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    errors.push("Email is required");
  } else if (!emailRegex.test(email)) {
    errors.push("Invalid email format");
  }

  if (!message) {
    errors.push("Message is required");
  } else if (message.length > 2000) {
    errors.push("Message must be 2000 characters or fewer");
  }

  if (company && company.length > 200) {
    errors.push("Company must be 200 characters or fewer");
  }

  if (projectType && projectType.length > 100) {
    errors.push("Project type must be 100 characters or fewer");
  }

  if (errors.length > 0) {
    return { valid: false, errors, payload: null };
  }

  return {
    valid: true,
    errors: [],
    payload: { name, email, company, projectType, message },
  };
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();

  const keysToDelete: string[] = [];
  RATE_LIMIT_MAP.forEach((entry, key) => {
    if (now > entry.resetAt) {
      keysToDelete.push(key);
    }
  });
  keysToDelete.forEach((key) => RATE_LIMIT_MAP.delete(key));

  const entry = RATE_LIMIT_MAP.get(ip);

  if (!entry) {
    RATE_LIMIT_MAP.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }

  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }

  entry.count += 1;
  return true;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { error: "Service unavailable. Please try again later." },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const toEmail = process.env.RESEND_TO_EMAIL || "hello@e5labs.com";

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    request.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const { valid, errors, payload } = validatePayload(body);

  if (!valid) {
    return NextResponse.json(
      { error: errors.join(". ") },
      { status: 400 },
    );
  }

  const {
    name,
    email,
    company,
    projectType,
    message,
  } = payload!;

  const projectTypeLabel =
    projectType
      ? projectTypes.find((t) => t.value === projectType)?.label ?? projectType
      : "Not specified";

  const textBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Company: ${company || "Not provided"}`,
    `Project Type: ${projectTypeLabel}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const htmlBody = `
    <h2>New Contact Form Submission</h2>
    <table style="border-collapse: collapse; width: 100%; max-width: 500px;">
      <tr><td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top;">Name:</td><td style="padding: 4px 0;">${escapeHtml(name)}</td></tr>
      <tr><td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top;">Email:</td><td style="padding: 4px 0;">${escapeHtml(email)}</td></tr>
      <tr><td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top;">Company:</td><td style="padding: 4px 0;">${escapeHtml(company || "Not provided")}</td></tr>
      <tr><td style="padding: 4px 12px 4px 0; font-weight: bold; vertical-align: top;">Project Type:</td><td style="padding: 4px 0;">${escapeHtml(projectTypeLabel)}</td></tr>
    </table>
    <h3 style="margin-top: 16px;">Message</h3>
    <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
  `;

  try {
    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "E5Labs Contact <onboarding@resend.dev>",
      to: toEmail,
      subject: `New Contact Form Submission from ${name}`,
      text: textBody,
      html: htmlBody,
      replyTo: email,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again later." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend send failed:", err);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 502 },
    );
  }
}