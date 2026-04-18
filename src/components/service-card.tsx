import Link from "next/link";
import { ArrowRight, LucideIcon } from "lucide-react";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
}

export function ServiceCard({
  icon: Icon,
  title,
  description,
  href,
}: ServiceCardProps) {
  return (
    <div className="group flex flex-col rounded-xl border border-primary-600 border-l-2 border-l-accent-amber/40 bg-gradient-to-br from-primary-800 to-primary-900 p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent-amber/40 hover:shadow-[0_0_20px_rgba(245,158,11,0.1)] motion-reduce:transition-none">
      <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-accent-amber/10 ring-1 ring-accent-amber/20">
        <Icon className="h-8 w-8 text-accent-amber transition-transform duration-300 group-hover:scale-110" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-50">
        {title}
      </h3>
      <p className="mt-3 max-w-prose text-neutral-400 leading-relaxed">{description}</p>
      {href && (
        <div className="mt-auto pt-6">
          <Link
            href={href}
            className="group/link inline-flex items-center gap-1 text-accent-amber font-heading font-medium transition-colors hover:text-accent-amber-light"
          >
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
          </Link>
        </div>
      )}
    </div>
  );
}