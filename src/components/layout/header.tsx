"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";
import { Logo } from "@/components/logo";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

function NavLink({
  href,
  label,
  active,
  onClick,
}: {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`relative text-xs uppercase tracking-[0.08em] font-medium transition-colors after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 after:h-0.5 after:w-0 after:bg-accent-amber after:transition-all after:duration-300 hover:after:w-full ${
        active
          ? "text-neutral-50 after:w-full"
          : "text-neutral-400 hover:text-neutral-50"
      }`}
    >
      {label}
    </Link>
  );
}

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:bg-accent-amber focus:px-4 focus:py-2 focus:text-primary-950 focus:font-medium"
      >
        Skip to content
      </a>
      <header className="fixed top-0 z-50 w-full border-b border-primary-600/60 bg-primary-900/80 backdrop-blur-md">
        <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 md:px-8 lg:px-10">
          <Logo size="md" />

          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                label={link.label}
                active={pathname === link.href}
              />
            ))}
          </nav>

          <div className="hidden md:block">
            <Button
              render={<Link href="/contact" />}
              className="rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light hover:shadow-glow transition-all duration-200"
              size="lg"
            >
              Get in Touch
            </Button>
          </div>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              render={
                <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle menu" />
              }
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[300px] border-l-2 border-l-accent-amber/30 border-primary-700/40 bg-primary-900 sm:w-[350px]"
            >
              <SheetTitle className="sr-only">Navigation menu</SheetTitle>
              <nav aria-label="Mobile navigation" className="flex flex-col gap-6 mt-12">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    href={link.href}
                    label={link.label}
                    active={pathname === link.href}
                    onClick={() => setOpen(false)}
                  />
                ))}
                <Button
                  render={<Link href="/contact" />}
                  className="mt-4 rounded-full bg-accent-amber text-primary-950 font-heading font-medium hover:bg-accent-amber-light"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  Get in Touch
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </header>
      <div className="h-[72px]" />
    </>
  );
}