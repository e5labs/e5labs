export function HeroPattern() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <svg className="absolute inset-0 h-full w-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="hero-grid" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
      <div className="absolute top-[15%] left-[10%] h-[500px] w-[500px] rounded-full bg-accent-amber/[0.07] blur-[120px]" />
      <div className="absolute bottom-[10%] right-[5%] h-[400px] w-[400px] rounded-full bg-accent-amber/[0.05] blur-[100px]" />
      <div className="absolute top-[50%] left-[50%] h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-amber/[0.04] blur-[80px]" />
    </div>
  );
}