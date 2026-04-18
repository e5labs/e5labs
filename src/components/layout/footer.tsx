import Link from "next/link";
import { Mail } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

const serviceLinks = [
  { href: "/services#web-development", label: "Web Applications" },
  { href: "/services#dev-tools", label: "Developer Tools" },
  { href: "/services#cloud-infrastructure", label: "Cloud Infrastructure" },
  { href: "/services#consulting", label: "Technical Consulting" },
];

export function Footer() {
  return (
    <footer className="bg-primary-950 border-t-2 border-accent-amber/20">
      <div className="mx-auto max-w-[1280px] px-4 py-16 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-heading font-bold tracking-tight">
                E<span className="text-accent-amber">5</span>Labs
              </span>
            </Link>
            <div className="mt-2 h-0.5 w-6 bg-accent-amber" />
            <p className="mt-4 text-sm text-neutral-400 max-w-xs">
              Web applications, developer tools, and cloud infrastructure built
              by engineers who own the result. Remote-first, production-obsessed.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-neutral-50">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-accent-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-neutral-50">
              Services
            </h3>
            <ul className="mt-4 space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-400 hover:text-accent-amber transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-heading font-semibold text-neutral-50">
              Contact
            </h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent-amber" />
                <a
                  href="mailto:hello@e5labs.com"
                  className="text-sm text-neutral-400 hover:text-accent-amber transition-colors duration-200"
                >
                  hello@e5labs.com
                </a>
              </li>
              <li className="text-sm text-neutral-400">
                Remote-first — worldwide
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-primary-700/40 pt-8">
          <p className="text-sm text-neutral-400">
            &copy; {new Date().getFullYear()} E5Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}