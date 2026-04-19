import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { icon: 24, gap: "gap-1.5", text: "text-base" },
  md: { icon: 32, gap: "gap-2", text: "text-xl" },
  lg: { icon: 40, gap: "gap-2.5", text: "text-2xl" },
};

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const s = sizeMap[size];
  const gradId = `amber-${size}`;

  return (
    <Link href="/" className={cn("flex items-center", s.gap, className)} aria-label="E5Labs home">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 512 512"
        width={s.icon}
        height={s.icon}
        className="shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <filter id={`glow-${size}`} x="-10%" y="-10%" width="120%" height="120%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        <rect width="512" height="512" fill="#0a0f1a" rx="104" />
        <polygon
          points="256,48 432,144 432,368 256,464 80,368 80,144"
          fill="#0d1424"
          stroke="#1e293b"
          strokeWidth="2.5"
        />
        <g opacity="0.06" stroke="#94a3b8" strokeWidth="0.5">
          <line x1="160" y1="140" x2="352" y2="140" />
          <line x1="144" y1="200" x2="368" y2="200" />
          <line x1="144" y1="260" x2="368" y2="260" />
          <line x1="144" y1="320" x2="368" y2="320" />
          <line x1="160" y1="380" x2="352" y2="380" />
          <line x1="176" y1="140" x2="176" y2="380" />
          <line x1="232" y1="140" x2="232" y2="380" />
          <line x1="288" y1="140" x2="288" y2="380" />
          <line x1="344" y1="140" x2="344" y2="380" />
        </g>
        <g fill="#f8fafc">
          <rect x="144" y="168" width="24" height="160" rx="3" />
          <rect x="144" y="168" width="88" height="24" rx="3" />
          <rect x="144" y="236" width="72" height="20" rx="3" />
          <rect x="144" y="304" width="88" height="24" rx="3" />
        </g>
        <g filter={`url(#glow-${size})`}>
          <rect x="232" y="168" width="90" height="24" rx="3" fill={`url(#${gradId})`} />
          <rect x="232" y="168" width="24" height="74" rx="3" fill={`url(#${gradId})`} />
          <rect x="232" y="242" width="56" height="20" rx="3" fill={`url(#${gradId})`} />
        </g>
        <path
          d="M 288 262 C 318 262, 332 280, 332 306 C 332 340, 310 356, 278 356 L 240 356"
          fill="none"
          stroke={`url(#${gradId})`}
          strokeWidth="24"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#glow-${size})`}
        />
        <rect x="256" y="280" width="40" height="36" fill="#0d1424" />
        <rect x="248" y="276" width="20" height="4" fill="#0d1424" rx="2" />
        <circle cx="338" cy="160" r="5" fill="#f59e0b" opacity="0.7" />
        <circle cx="338" cy="160" r="10" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.3" />
        <circle cx="168" cy="350" r="4" fill="#f59e0b" opacity="0.5" />
        <circle cx="168" cy="350" r="8" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.2" />
        <text
          x="256"
          y="420"
          textAnchor="middle"
          fontFamily="'Space Grotesk', sans-serif"
          fontWeight="600"
          fontSize="28"
          fill="#94a3b8"
          letterSpacing="10"
        >
          LABS
        </text>
      </svg>
      {showText && (
        <span className={cn("font-heading font-bold tracking-tight", s.text)}>
          E<span className="text-accent-amber">5</span>Labs
        </span>
      )}
    </Link>
  );
}