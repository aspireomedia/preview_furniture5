"use client";

import "./globals.css";
import { ErrorExperience } from "@/components/ErrorExperience";

export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <html lang="en"><body><ErrorExperience reset={reset} /></body></html>;
}
