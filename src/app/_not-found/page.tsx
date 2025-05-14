// src/app/_not-found/page.tsx
"use client"; // mark as client so no Server Component hooks run here

export default function SegmentFallback() {
  return (
    <main className="p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p>This page failed to render. Try refreshing, or head back home.</p>
      <a href="/" className="text-primary hover:underline">
        Return home
      </a>
    </main>
  );
}
