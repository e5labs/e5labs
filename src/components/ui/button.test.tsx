import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/ui/button";

describe("Button", () => {
  it("renders a native <button> by default", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button.tagName).toBe("BUTTON");
  });

  it("sets type='button' on native <button> elements", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("type", "button");
  });

  it("applies variant and size classes", () => {
    render(<Button variant="destructive" size="lg">Delete</Button>);
    const button = screen.getByRole("button");
    expect(button.className).toContain("bg-destructive");
  });

  it("renders as disabled", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });

  describe("render prop (ELA-47)", () => {
    it("passes type='button' to render element, causing invalid HTML on <a>", () => {
      render(
        <Button render={<a href="/test" />}>
          Link Button
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link.tagName).toBe("A");
      expect(link).toHaveAttribute("type", "button");
    });

    it("should NOT have type='button' on an anchor element (accessibility bug)", () => {
      render(
        <Button render={<a href="/test" />}>
          Link Button
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link.tagName).toBe("A");
      expect(link).not.toHaveAttribute("type", "button");
    });

    it("should NOT have role='button' on anchor elements with href", () => {
      render(
        <Button render={<a href="/test" />} nativeButton={false}>
          Link Button
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).toBeInTheDocument();
      expect(link).not.toHaveAttribute("role", "button");
    });

    it("should not leak button-specific attributes to non-button elements", () => {
      render(
        <Button render={<a href="/test" />}>
          Link Button
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      expect(link).not.toHaveAttribute("type");
    });

    it("preserves href on anchor elements when using render prop", () => {
      render(
        <Button render={<a href="/contact" />}>
          Get in Touch
        </Button>
      );
      const link = screen.getByRole("link", { name: /get in touch/i });
      expect(link).toHaveAttribute("href", "/contact");
    });
  });

  describe("keyboard interaction with render prop", () => {
    it("activates link-button on Enter key", async () => {
      const user = userEvent.setup();
      let clicked = false;
      render(
        <Button render={<a href="/test" onClick={() => { clicked = true }} />}>
          Link Button
        </Button>
      );
      const link = screen.getByRole("link", { name: /link button/i });
      link.focus();
      await user.keyboard("{Enter}");
      expect(clicked).toBe(true);
    });
  });
});