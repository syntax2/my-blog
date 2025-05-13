
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <svg
        width="32"
        height="32"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="group-hover:opacity-90 transition-opacity duration-200"
        aria-label="Ayush Logo"
      >
        {/* Left main stroke of 'A' */}
        <path d="M20 85 L48 15" stroke="hsl(var(--primary))" strokeWidth="12" strokeLinecap="round" />
        {/* Right main stroke of 'A' */}
        <path d="M80 85 L52 15" stroke="hsl(var(--accent))" strokeWidth="12" strokeLinecap="round" />
        {/* Crossbar of 'A' */}
        <path d="M32 55 L68 55" stroke="hsl(var(--chart-1))" strokeWidth="10" strokeLinecap="round" />
        {/* Decorative element / Apex highlight */}
        <path d="M40 35 Q50 25 60 35" stroke="hsl(var(--chart-2))" strokeWidth="8" fill="none" strokeLinecap="round" />

      </svg>
      <span className="font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-200 hidden sm:inline-block">
        Ayush
      </span>
    </Link>
  );
}
