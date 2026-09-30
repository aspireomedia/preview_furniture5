"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";

const supportCards = [
  { label: "Rest", copy: "The bed as the beginning and end of every day." },
  { label: "Gather", copy: "The sofa as the center of connection." },
  { label: "Work", copy: "The desk as a place where ideas grow." },
  { label: "Live", copy: "Furniture designed around real daily life." },
];

export default function PremiumAboutPage() {
  const store = usePremiumStore();
  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        {/* HERO */}
        <section className="premium-about-hero">
          <Image src="/images/living.jpg" alt="A calm, well-considered living room" fill sizes="100vw" priority />
          <div className="premium-about-hero-wash" />
          <div className="premium-shell premium-about-hero-copy">
            <p>Our Philosophy</p>
            <h1>
              Better Space.
              <br />
              Better Living.
            </h1>
          </div>
        </section>

        {/* MANIFESTO */}
        <section className="premium-about-section">
          <div className="premium-shell premium-about-manifesto">
            <h2>
              The spaces around us shape the way we live. <em>Quality of life often begins with the room we&apos;re in</em>, not the price tag on the furniture inside it.
            </h2>
          </div>
        </section>

        {/* FORM + FUNCTION */}
        <section className="premium-about-section alt">
          <div className="premium-shell premium-about-split">
            <Image src="/images/bedroom.jpg" alt="A bedroom arranged for rest and function" width={800} height={600} />
            <div>
              <h2>Furniture is more than an object</h2>
              <p>
                Its form, function, comfort, and placement change how people rest, work, gather, and connect. A sofa is not just upholstery and a frame &mdash; it is where a family sits down together at the end of the day. A desk is not just a work surface &mdash; it is where an idea, or a business, starts to take shape.
              </p>
              <ul>
                <li>Form</li>
                <li>Function</li>
                <li>Comfort</li>
                <li>Placement</li>
              </ul>
            </div>
          </div>
        </section>

        {/* BETTER DOESN'T MEAN BIGGER */}
        <section className="premium-about-section">
          <div className="premium-shell premium-about-manifesto">
            <h2 style={{ maxWidth: 620, marginInline: "auto" }}>
              A better room does not need to be a <em>larger</em> room. A better workplace does not need to be a more luxurious one. Improvement can begin with a better decision, not a bigger budget.
            </h2>
          </div>
        </section>

        {/* HOW BETTER SPACE SUPPORTS LIFE */}
        <section className="premium-about-section alt">
          <div className="premium-shell">
            <div className="premium-section-heading" style={{ justifyContent: "center", textAlign: "center", flexDirection: "column", alignItems: "center" }}>
              <p>How Better Space Supports Life</p>
              <h2>Every room has a job to do</h2>
            </div>
            <div className="premium-about-cards">
              {supportCards.map((card) => (
                <div className="premium-about-card" key={card.label}>
                  <b>{card.label}</b>
                  <p>{card.copy}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRAND ESSENCE */}
        <section className="premium-about-section">
          <div className="premium-shell">
            <div className="premium-essence-row">
              <span>Improvement</span>
              <span>Function</span>
              <span>Comfort</span>
              <span>Modern Living</span>
            </div>
          </div>
        </section>

        {/* FINAL STATEMENT */}
        <section className="premium-final-statement">
          <div className="premium-shell">
            <h2>Make Space Better.</h2>
            <p>Better Space. Better Living.</p>
            <Link href="/premium/shop">
              Explore the Collection <ChevronRight size={15} />
            </Link>
          </div>
        </section>
      </main>
    </PremiumShell>
  );
}
