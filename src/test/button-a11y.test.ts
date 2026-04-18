import { describe, it, expect } from "vitest";
import { readFile } from "fs/promises";
import { join } from "path";

const BUILD_DIR = join(__dirname, "..", "..", ".next", "server", "app");

describe("Button render prop accessibility (ELA-47)", () => {
  it("index page: anchors created by Button+render should not have type='button'", async () => {
    const html = await readFile(join(BUILD_DIR, "index.html"), "utf-8");
    const invalidAnchors = html.match(/<a[^>]*type="button"[^>]*>/g);
    expect(
      invalidAnchors,
      `Found <a> elements with type="button" attribute (invalid HTML): ${invalidAnchors?.length ?? 0} instances`
    ).toBeNull();
  });

  it("services page: anchors created by Button+render should not have type='button'", async () => {
    const html = await readFile(join(BUILD_DIR, "services.html"), "utf-8");
    const invalidAnchors = html.match(/<a[^>]*type="button"[^>]*>/g);
    expect(
      invalidAnchors,
      `Found <a> elements with type="button" attribute (invalid HTML): ${invalidAnchors?.length ?? 0} instances`
    ).toBeNull();
  });

  it("about page: anchors created by Button+render should not have type='button'", async () => {
    const html = await readFile(join(BUILD_DIR, "about.html"), "utf-8");
    const invalidAnchors = html.match(/<a[^>]*type="button"[^>]*>/g);
    expect(
      invalidAnchors,
      `Found <a> elements with type="button" attribute (invalid HTML): ${invalidAnchors?.length ?? 0} instances`
    ).toBeNull();
  });

  it("contact page: anchors created by Button+render should not have type='button'", async () => {
    const html = await readFile(join(BUILD_DIR, "contact.html"), "utf-8");
    const invalidAnchors = html.match(/<a[^>]*type="button"[^>]*>/g);
    expect(
      invalidAnchors,
      `Found <a> elements with type="button" attribute (invalid HTML): ${invalidAnchors?.length ?? 0} instances`
    ).toBeNull();
  });

  it("all pages: buttons should not have type='button' on non-button elements", async () => {
    const pages = ["index.html", "services.html", "about.html", "contact.html"];
    for (const page of pages) {
      const html = await readFile(join(BUILD_DIR, page), "utf-8");
      const invalidElements = html.match(/<(?!button)[a-z]+[^>]*type="button"[^>]*>/g);
      expect(
        invalidElements,
        `${page}: Found non-button elements with type="button" (invalid HTML): ${invalidElements?.length ?? 0} instances`
      ).toBeNull();
    }
  });
});

describe("Button type=submit preserved (ELA-52)", () => {
  it("contact page: submit button has type='submit' not type='button'", async () => {
    const html = await readFile(join(BUILD_DIR, "contact.html"), "utf-8");
    const submitButtons = html.match(/<button[^>]*type="submit"[^>]*>/g);
    expect(
      submitButtons,
      `Expected at least one <button type="submit"> on the contact page`
    ).not.toBeNull();
    expect(submitButtons!.length).toBeGreaterThanOrEqual(1);

    const wrongTypeSubmitButtons = html.match(/<button[^>]*data-slot="button"[^>]*type="button"[^>]*Send Message/);
    expect(
      wrongTypeSubmitButtons,
      `Contact form submit button has type="button" instead of type="submit" — base-ui useButton override not fixed`
    ).toBeNull();
  });
});