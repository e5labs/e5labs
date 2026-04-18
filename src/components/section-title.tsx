import { cn } from "@/lib/utils";

interface SectionTitleProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionTitleProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        isCenter ? "mx-auto text-center" : "",
        "max-w-2xl",
        className
      )}
    >
      {eyebrow && (
        <div
          className={cn(
            "flex items-center gap-3 mb-4",
            isCenter && "justify-center"
          )}
        >
          <div className="h-0.5 w-6 bg-accent-amber" />
          <span className="text-xs uppercase tracking-[0.08em] text-accent-amber font-medium">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-heading text-3xl font-semibold tracking-tight text-neutral-50 sm:text-[2.5rem] sm:leading-[1.2]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-lg text-neutral-300 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}