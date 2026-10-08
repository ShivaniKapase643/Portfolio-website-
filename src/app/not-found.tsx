import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="flex min-h-[80dvh] flex-col items-center justify-center px-4 pt-28 pb-16 text-center">
      <p className="font-mono text-sm tracking-[0.2em] text-accent uppercase">404</p>
      <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">This page doesn&rsquo;t exist.</h1>
      <p className="mt-4 max-w-md text-ink-soft">The link may be outdated. Everything lives on the home page.</p>
      <Link href="/" className={buttonClasses({ size: "lg", className: "mt-8" })}>
        <ArrowLeft size={17} /> Back to the portfolio
      </Link>
    </section>
  );
}
