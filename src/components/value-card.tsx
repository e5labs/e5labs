import { LucideIcon } from "lucide-react";

interface ValueCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

export function ValueCard({ icon: Icon, title, description }: ValueCardProps) {
  return (
    <div className="flex flex-col rounded-xl border border-primary-700 bg-primary-800 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-accent-amber/30 motion-reduce:transition-none">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent-amber/10">
        <Icon className="h-6 w-6 text-accent-amber" />
      </div>
      <h3 className="mt-6 font-heading text-xl font-semibold text-neutral-50">
        {title}
      </h3>
      <p className="mt-3 text-neutral-400 leading-relaxed">{description}</p>
    </div>
  );
}