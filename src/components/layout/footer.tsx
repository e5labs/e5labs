import Link from "next/link";
import { Separator } from "@/components/ui/separator";

const footerLinks = {
  Company: [
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Contact" },
  ],
  Services: [
    { href: "/services#web-development", label: "Web Development" },
    { href: "/services#mobile-development", label: "Mobile Development" },
    { href: "/services#cloud-solutions", label: "Cloud Solutions" },
    { href: "/services#consulting", label: "Consulting" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight">E5Labs</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              A software development firm concentrating on software development
              efforts. Building robust, scalable solutions for modern businesses.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-sm font-semibold">{title}</h3>
              <ul className="mt-4 space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} E5Labs. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}