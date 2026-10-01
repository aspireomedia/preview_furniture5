import type { Metadata } from "next";
import "./premium.css";

export const metadata: Metadata = {
  title: "Better Space Premium | Curated Living",
  description: "Curated luxury furniture and home decor for those who appreciate the art of living beautifully.",
  openGraph: { title: "Better Space Premium | Curated Living", description: "Curated luxury furniture and home decor.", type: "website" },
};

export default function PremiumLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Premium footer is --p-choc (#37291d) — pin the root overscroll layer to it
          explicitly so the premium storefront never depends on the standard default. */}
      <style>{`:root{--page-overscroll-bg:#37291d}`}</style>
      {children}
    </>
  );
}
