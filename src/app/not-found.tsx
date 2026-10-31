import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[70svh] flex-col items-start justify-end px-4 pt-28 md:px-8">
      <div className="w-full">
        <h1 className="text-poster">skipped track</h1>
        <p className="mt-6 max-w-md text-lead">
          this page isn&#39;t on the record. maybe it was a b-side, maybe it
          never existed.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-paper transition hover:-translate-y-0.5 hover:bg-blue hover:text-paper active:translate-y-0"
        >
          back to the turntable
        </Link>
      </div>
    </main>
  );
}
