import { describe, it, expect } from "vitest";
import { readFile } from "fs/promises";
import { join } from "path";

const BUILD_DIR = join(__dirname, "..", "..", ".next", "server", "app");
const PAGES = ["index.html", "about.html", "services.html", "contact.html"];

async function getPageHtml(page: string): Promise<string> {
  return readFile(join(BUILD_DIR, page), "utf-8");
}

describe("Site-wide accessibility audit", () => {
  describe("Landmark and navigation", () => {
    PAGES.forEach((page) => {
      it(`${page}: <nav> has aria-label`, async () => {
        const html = await getPageHtml(page);
        const navElements = html.match(/<nav[^>]*>/g) || [];
        const navsWithoutLabel = navElements.filter(
          (nav) => !nav.includes("aria-label")
        );
        expect(
          navsWithoutLabel,
          `${page}: Found <nav> elements without aria-label: ${navsWithoutLabel.length}`
        ).toHaveLength(0);
      });
    });

    PAGES.forEach((page) => {
      it(`${page}: has skip-to-content link`, async () => {
        const html = await getPageHtml(page);
        const hasSkipLink = html.includes("#main-content");
        expect(hasSkipLink, `${page}: Missing skip-to-content link`).toBe(true);
      });
    });

    PAGES.forEach((page) => {
      it(`${page}: <html> has lang attribute`, async () => {
        const html = await getPageHtml(page);
        const langMatch = html.match(/<html[^>]*lang="([^"]+)"/);
        expect(
          langMatch,
          `${page}: <html> element missing lang attribute`
        ).not.toBeNull();
        expect(langMatch![1]).toBe("en");
      });
    });

    PAGES.forEach((page) => {
      it(`${page}: has viewport meta tag`, async () => {
        const html = await getPageHtml(page);
        expect(
          html.includes("viewport"),
          `${page}: Missing viewport meta tag`
        ).toBe(true);
      });
    });
  });

  describe("Heading hierarchy", () => {
    PAGES.forEach((page) => {
      it(`${page}: has exactly one <h1>`, async () => {
        const html = await getPageHtml(page);
        const h1s = html.match(/<h1[^>]*>/g) || [];
        expect(
          h1s.length,
          `${page}: Expected 1 <h1>, found ${h1s.length}`
        ).toBe(1);
      });
    });
  });

  describe("Link and button patterns", () => {
    PAGES.forEach((page) => {
      it(`${page}: no <a> with role="button" (anti-pattern)`, async () => {
        const html = await getPageHtml(page);
        const invalidAnchors = html.match(/<a[^>]*role="button"[^>]*>/g);
        expect(
          invalidAnchors,
          `${page}: Found <a> with role="button": ${invalidAnchors?.length ?? 0}`
        ).toBeNull();
      });
    });

    PAGES.forEach((page) => {
      it(`${page}: no <a> with type="button" (invalid HTML)`, async () => {
        const html = await getPageHtml(page);
        const invalidAnchors = html.match(/<a[^>]*type="button"[^>]*>/g);
        expect(
          invalidAnchors,
          `${page}: Found <a> with type="button": ${invalidAnchors?.length ?? 0}`
        ).toBeNull();
      });
    });
  });

  describe("Form accessibility (contact page)", () => {
    it("all visible form inputs have associated labels", async () => {
      const html = await getPageHtml("contact.html");
      const inputs = html.match(/<input[^>]*>/g) || [];
      const visibleInputs = inputs.filter(
        (inp) =>
          !inp.includes('type="hidden"') &&
          !inp.includes("clip-path:inset(50%)")
      );
      for (const inp of visibleInputs) {
        const idMatch = inp.match(/id="([^"]+)"/);
        if (idMatch) {
          const id = idMatch[1];
          const hasLabel = html.includes(`for="${id}"`);
          const hasAriaLabel = inp.includes("aria-label");
          expect(
            hasLabel || hasAriaLabel,
            `Input with id="${id}" has no associated <label> or aria-label`
          ).toBe(true);
        }
      }
    });

    it("select/dropdown has accessible name", async () => {
      const html = await getPageHtml("contact.html");
      const comboboxes = html.match(/role="combobox"[^>]*>/g) || [];
      const comboboxesWithoutLabel = comboboxes.filter(
        (cb) => !cb.includes("aria-label") && !cb.includes("aria-labelledby")
      );
      expect(
        comboboxesWithoutLabel,
        `Found combobox without accessible name: ${comboboxesWithoutLabel.length}`
      ).toHaveLength(0);
    });
  });

  describe("Image accessibility", () => {
    PAGES.forEach((page) => {
      it(`${page}: all <img> elements have alt text`, async () => {
        const html = await getPageHtml(page);
        const imgs = html.match(/<img[^>]*>/g) || [];
        const imgsNoAlt = imgs.filter((img) => !img.includes("alt="));
        expect(
          imgsNoAlt,
          `${page}: Found <img> without alt attribute: ${imgsNoAlt.length}`
        ).toHaveLength(0);
      });
    });
  });

  describe("Metadata and SEO", () => {
    PAGES.forEach((page) => {
      it(`${page}: has <title> element`, async () => {
        const html = await getPageHtml(page);
        const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/);
        expect(
          titleMatch,
          `${page}: Missing <title> element`
        ).not.toBeNull();
        expect(titleMatch![1].length).toBeGreaterThan(0);
      });
    });

    PAGES.forEach((page) => {
      it(`${page}: has meta description`, async () => {
        const html = await getPageHtml(page);
        const metaDesc = html.match(
          /<meta[^>]*name="description"[^>]*content="([^"]+)"/
        );
        expect(
          metaDesc,
          `${page}: Missing meta description`
        ).not.toBeNull();
        expect(metaDesc![1].length).toBeGreaterThan(10);
      });
    });
  });
});