// src/app/not-found.tsx
export const dynamic = "force-dynamic"; // only if you really need dynamic behavior

export default function NotFound({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const q = Array.isArray(searchParams?.q)
    ? searchParams.q[0]
    : searchParams?.q;

  return (
    <main className="p-12 text-center">
      <h1 className="text-4xl font-bold mb-4">404 – Page Not Found</h1>
      {q && (
        <p>
          You searched for: <strong>{q}</strong>
        </p>
      )}
      <p>Sorry, we couldn’t find what you were looking for.</p>
    </main>
  );
}
