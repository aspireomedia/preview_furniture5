"use client";

import Link from "next/link";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";

const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "Ordering",
    items: [
      { q: "How do I place an order?", a: "Browse the Premium shop, add pieces to your cart, and continue to checkout. This preview experience shows the full ordering flow up to delivery details." },
      { q: "Can I change or cancel my order?", a: "Contact our team as soon as possible after ordering. Once an order has moved into preparation or dispatch, changes may not always be possible." },
      { q: "How can I check my order status?", a: "Order status will be shown in your account or confirmed directly by our team. Contact us with your order details if you need an update." },
    ],
  },
  {
    title: "Payment",
    items: [
      { q: "What payment methods do you accept?", a: "Accepted payment methods will be presented at checkout. This preview does not process live payments." },
      { q: "Is my payment information secure?", a: "Any payment integration we use is handled through a trusted, secure payment provider rather than being stored on our own servers." },
      { q: "Can I use bank transfer or digital payment methods?", a: "Available payment options, including bank transfer or digital wallets, will be shown at checkout once the payment integration is live." },
    ],
  },
  {
    title: "Shipping & Delivery",
    items: [
      { q: "Where does Better Space deliver?", a: "We deliver across the areas our logistics partners currently service. Availability for your address will be confirmed at checkout." },
      { q: "How much does delivery cost?", a: "Delivery for Premium orders over Rp500.000 is complimentary. Delivery costs for smaller orders are calculated based on your location." },
      { q: "How long does delivery take?", a: "Delivery times vary depending on product availability and destination. Your estimated delivery window will be shown during checkout or confirmed by our team." },
      { q: "How can I track my delivery?", a: "Once your order ships, tracking information will be shared with you directly by our team or shown in your order status." },
    ],
  },
  {
    title: "Returns & Exchanges",
    items: [
      { q: "Can I return an item?", a: "Yes. Better Space Premium offers a 30-day return window on eligible items, as noted on each product page." },
      { q: "How long do I have to request a return?", a: "Returns must be requested within 30 days of delivery." },
      { q: "What condition must returned products be in?", a: "Returned items should be unused, in their original condition, and where possible in their original packaging." },
      { q: "How are refunds processed?", a: "Refunds are processed back to your original payment method once the returned item has been received and inspected." },
    ],
  },
  {
    title: "Products",
    items: [
      { q: "Are product colors exactly the same as shown online?", a: "We aim for accurate photography, but screen settings can affect how colors appear. Material swatches or in-person viewing can help confirm color before purchase." },
      { q: "How can I check dimensions before purchasing?", a: "Full dimensions are listed on each product page under the Dimensions tab. We recommend measuring your space before ordering." },
      { q: "What happens if an item is out of stock?", a: "Out-of-stock items are marked on the product page. Contact us if you would like to be notified when a piece becomes available again." },
      { q: "Are Better Space products covered by a warranty?", a: "Warranty coverage, where applicable, will be noted on the relevant product page or provided at the time of purchase." },
    ],
  },
  {
    title: "Care",
    items: [
      { q: "How should I care for my furniture?", a: "General care recommendations are included with your piece. Avoid direct sunlight and moisture where possible to help materials last longer." },
      { q: "Where can I find material-specific care instructions?", a: "Material and care notes for each piece are listed on its product page under Details." },
    ],
  },
  {
    title: "Support",
    items: [
      { q: "How can I contact Better Space?", a: "Reach us through the Contact page, by email, or by phone. Details are available in the footer of every page." },
      { q: "What information should I prepare when contacting support?", a: "Having your order number, the product name, and a short description of your question ready helps us assist you faster." },
    ],
  },
];

export default function PremiumFaqPage() {
  const store = usePremiumStore();
  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <nav className="premium-shell premium-breadcrumb">
          <Link href="/premium">Home</Link> <span>/</span> <b>FAQ</b>
        </nav>
        <div className="premium-shell premium-page-hero">
          <p className="eyebrow">FAQ</p>
          <h1>Frequently Asked Questions</h1>
          <p className="lede">Everything you need to know about shopping with Better Space Premium.</p>
        </div>
        <div className="premium-shell premium-faq-groups">
          {faqGroups.map((group) => (
            <div className="premium-faq-group" key={group.title}>
              <h2>{group.title}</h2>
              {group.items.map((item) => (
                <details className="premium-faq-item" key={item.q}>
                  <summary>{item.q}</summary>
                  <p>{item.a}</p>
                </details>
              ))}
            </div>
          ))}
        </div>
      </main>
    </PremiumShell>
  );
}
