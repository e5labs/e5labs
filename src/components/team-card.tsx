import { cn } from "@/lib/utils";

interface TeamCardProps {
  initials: string;
  name: string;
  title: string;
  className?: string;
}

export function TeamCard({ initials, name, title, className }: TeamCardProps) {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <div className="flex h-[120px] w-[120px] items-center justify-center rounded-full bg-primary-800 border-2 border-primary-700">
        <span className="font-heading text-2xl font-semibold text-neutral-400">
          {initials}
        </span>
      </div>
      <h4 className="mt-4 font-heading text-lg font-semibold text-neutral-50">
        {name}
      </h4>
      <p className="mt-1 text-sm text-neutral-400">{title}</p>
    </div>
  );
}