import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

const mockSend = vi.fn().mockResolvedValue({ data: { id: "test-id" }, error: null });

vi.mock("resend", () => {
  return {
    Resend: class MockResend {
      constructor(_apiKey: string) {}
      emails = { send: mockSend };
    },
  };
});

const originalEnv = process.env;

beforeEach(async () => {
  process.env = { ...originalEnv, RESEND_API_KEY: "test-key" };
  mockSend.mockReset();
  mockSend.mockResolvedValue({ data: { id: "test-id" }, error: null });

  const { RATE_LIMIT_MAP } = await import("@/app/api/contact/route");
  RATE_LIMIT_MAP.clear();
});

afterEach(() => {
  process.env = originalEnv;
});

function createRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request("http://localhost:3000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-forwarded-for": "127.0.0.1",
      ...headers,
    },
    body: JSON.stringify(body),
  });
}

async function POST(body: unknown, headers: Record<string, string> = {}) {
  const mod = await import("@/app/api/contact/route");
  return mod.POST(createRequest(body, headers));
}

describe("POST /api/contact — Validation", () => {
  it("rejects empty name", async () => {
    const res = await POST({ name: "", email: "test@example.com", message: "Hello" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Name is required");
  });

  it("rejects empty email", async () => {
    const res = await POST({ name: "Test", email: "", message: "Hello" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Email is required");
  });

  it("rejects invalid email format", async () => {
    const res = await POST({ name: "Test", email: "not-an-email", message: "Hello" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Invalid email format");
  });

  it("rejects empty message", async () => {
    const res = await POST({ name: "Test", email: "test@example.com", message: "" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Message is required");
  });

  it("rejects message over 2000 characters", async () => {
    const res = await POST({ name: "Test", email: "test@example.com", message: "x".repeat(2001) }, { "x-forwarded-for": "unique-ip-2001" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("2000 characters");
  });

  it("rejects name over 200 characters", async () => {
    const res = await POST({ name: "x".repeat(201), email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "unique-ip-name-long" });
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("200 characters");
  });

  it("rejects invalid JSON body", async () => {
    const mod = await import("@/app/api/contact/route");
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "unique-ip-json" },
      body: "not json{{{",
    });
    const res = await mod.POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Invalid JSON");
  });

  it("rejects non-object body", async () => {
    const mod = await import("@/app/api/contact/route");
    const req = new Request("http://localhost:3000/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-forwarded-for": "unique-ip-nonobj" },
      body: JSON.stringify("just a string"),
    });
    const res = await mod.POST(req);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.error).toContain("Invalid request body");
  });

  it("accepts valid payload with all fields", async () => {
    const res = await POST({
      name: "John Doe",
      email: "john@example.com",
      company: "Acme Corp",
      projectType: "web-application",
      message: "I need a website",
    }, { "x-forwarded-for": "unique-ip-valid-full" });
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.success).toBe(true);
  });

  it("accepts valid payload with only required fields", async () => {
    const res = await POST({ name: "Jane", email: "jane@example.com", message: "Just reaching out" }, { "x-forwarded-for": "unique-ip-valid-min" });
    expect(res.status).toBe(200);
  });

  it("accepts message exactly at 2000 character limit", async () => {
    const res = await POST({ name: "Test", email: "test@example.com", message: "x".repeat(2000) }, { "x-forwarded-for": "unique-ip-2000lim" });
    expect(res.status).toBe(200);
  });
});

describe("POST /api/contact — Rate limiting", () => {
  it("returns 429 after exceeding rate limit from same IP", async () => {
    const ip = "10.0.0.rate-limit-test";
    const validPayload = { name: "Test", email: "test@example.com", message: "Hello" };

    for (let i = 0; i < 5; i++) {
      const res = await POST(validPayload, { "x-forwarded-for": ip });
      expect(res.status).toBe(200);
    }

    const res = await POST(validPayload, { "x-forwarded-for": ip });
    expect(res.status).toBe(429);
    const data = await res.json();
    expect(data.error).toContain("Too many requests");
  });

  it("allows requests from different IPs independently", async () => {
    const validPayload = { name: "Test", email: "test@example.com", message: "Hello" };

    for (let i = 0; i < 5; i++) {
      const res = await POST(validPayload, { "x-forwarded-for": `ip-diff-${i}` });
      expect(res.status).toBe(200);
    }

    const res = await POST(validPayload, { "x-forwarded-for": "completely-different-ip" });
    expect(res.status).toBe(200);
  });
});

describe("POST /api/contact — Missing API key", () => {
  it("returns 503 when RESEND_API_KEY is not set", async () => {
    delete process.env.RESEND_API_KEY;
    const res = await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "unique-ip-nokey" });
    expect(res.status).toBe(503);
    const data = await res.json();
    expect(data.error).toContain("Service unavailable");
  });
});

describe("POST /api/contact — Error handling", () => {
  it("returns 502 when Resend API returns an error", async () => {
    mockSend.mockResolvedValueOnce({ data: null, error: { message: "API error" } });
    const res = await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "unique-ip-resend-err" });
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toContain("Failed to send email");
  });

  it("returns 502 when Resend throws an exception", async () => {
    mockSend.mockRejectedValueOnce(new Error("Network failure"));
    const res = await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "unique-ip-resend-throw" });
    expect(res.status).toBe(502);
    const data = await res.json();
    expect(data.error).toContain("Failed to send email");
  });
});

describe("POST /api/contact — XSS Prevention", () => {
  it("escapes HTML in name field in email body", async () => {
    await POST({ name: '<script>alert("xss")</script>', email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "xss-name-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.not.stringContaining("<script>"),
      })
    );
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.stringContaining("&lt;script&gt;"),
      })
    );
  });

  it("escapes HTML in message field in email body", async () => {
    await POST({ name: "Test", email: "test@example.com", message: '<img onerror="hack()" src=x>' }, { "x-forwarded-for": "xss-msg-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        html: expect.not.stringContaining("<img onerror"),
      })
    );
  });
});

describe("POST /api/contact — Email content", () => {
  it("sends email to hello@e5labs.com by default", async () => {
    await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "email-default-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        to: "hello@e5labs.com",
      })
    );
  });

  it("sends email with correct subject line", async () => {
    await POST({ name: "Alice Smith", email: "alice@example.com", message: "Hello" }, { "x-forwarded-for": "email-subject-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        subject: "New Contact Form Submission from Alice Smith",
      })
    );
  });

  it("sets replyTo to the submitter email", async () => {
    await POST({ name: "Test", email: "sender@example.com", message: "Hello" }, { "x-forwarded-for": "email-replyto-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        replyTo: "sender@example.com",
      })
    );
  });

  it("includes company in email body when provided", async () => {
    await POST({ name: "Test", email: "test@example.com", company: "Acme", message: "Hello" }, { "x-forwarded-for": "email-company-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Company: Acme"),
      })
    );
  });

  it("shows Not provided when company is omitted", async () => {
    await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "email-nocomp-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Company: Not provided"),
      })
    );
  });

  it("resolves projectType to human-readable label", async () => {
    await POST({ name: "Test", email: "test@example.com", projectType: "web-application", message: "Hello" }, { "x-forwarded-for": "email-pt-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Project Type: Web Application"),
      })
    );
  });

  it("shows Not specified when projectType is omitted", async () => {
    await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "email-nopt-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.stringContaining("Project Type: Not specified"),
      })
    );
  });

  it("includes both text and html email bodies", async () => {
    await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "email-bodies-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        text: expect.any(String),
        html: expect.any(String),
      })
    );
  });

  it("uses Resend dev from address", async () => {
    await POST({ name: "Test", email: "test@example.com", message: "Hello" }, { "x-forwarded-for": "email-from-ip" });
    expect(mockSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: expect.stringContaining("onboarding@resend.dev"),
      })
    );
  });
});