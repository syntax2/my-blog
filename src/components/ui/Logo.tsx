import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2 group">
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary group-hover:text-accent transition-colors duration-200"
      >
        <path
          d="M16 4L28 28H4L16 4Z"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M10 20H22"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold text-xl text-foreground group-hover:text-accent transition-colors duration-200 hidden sm:inline-block">
        Content Canvas
      </span>
    </Link>
  );
}
