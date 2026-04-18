import Link from "next/link";
import { Button } from "@/components/ui/button";
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
    <div className="group rounded-xl border border-primary-700 bg-primary-800 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-amber/30 motion-reduce:transition-none">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-amber/10">
        <Icon className="h-8 w-8 text-accent-amber" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-50">
        {title}
      </h3>
      <p className="mt-3 text-neutral-400 leading-relaxed">{description}</p>
      {href && (
        <div className="mt-6">
          <Button
            render={<Link href={href} />}
            variant="ghost"
            className="text-accent-amber hover:text-accent-amber-light p-0 h-auto font-heading font-medium"
          >
            Learn more <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}