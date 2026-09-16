import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center bg-[#0a0a0a] px-6 text-center text-white">
      <p className="text-sm font-semibold tracking-[0.16em] text-white/50">404</p>
      <h1 className="mt-4 text-4xl font-extrabold tracking-tight">Page not found</h1>
      <p className="mt-3 max-w-md text-base text-white/65">
        This page does not exist. Return to the home page.
      </p>
      <Link
        href="/index"
        className="mt-8 rounded-full border border-white/30 px-5 py-2.5 text-sm font-semibold text-white"
      >
        Back to home
      </Link>
    </main>
  )
}
