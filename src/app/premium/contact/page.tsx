"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, MessageCircle, MapPin } from "lucide-react";
import { PremiumShell, usePremiumStore } from "@/components/premium/PremiumStore";

export default function PremiumContactPage() {
  const store = usePremiumStore();
  const [form, setForm] = useState({ name: "", email: "", subject: "general", message: "" });
  const update = (field: keyof typeof form, value: string) => setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`[${form.subject}] Message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\nReply to: ${form.email}`);
    window.location.href = `mailto:hello@betterspace.id?subject=${subject}&body=${body}`;
  };

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <nav className="premium-shell premium-breadcrumb">
          <Link href="/premium">Home</Link> <span>/</span> <b>Contact</b>
        </nav>
        <div className="premium-shell premium-page-hero">
          <p className="eyebrow">Get in Touch</p>
          <h1>Contact Us</h1>
          <p className="lede">Ask about products, delivery, design consultation, or an existing order.</p>
        </div>
        <div className="premium-shell premium-contact-layout">
          <aside className="premium-contact-info">
            <div className="premium-contact-item">
              <Mail size={18} />
              <div>
                <p>Email</p>
                <a href="mailto:hello@betterspace.id">hello@betterspace.id</a>
              </div>
            </div>
            <div className="premium-contact-item">
              <MessageCircle size={18} />
              <div>
                <p>Order support</p>
                <span>Include your order number for faster assistance.</span>
              </div>
            </div>
            <div className="premium-contact-item">
              <MapPin size={18} />
              <div>
                <p>Visit</p>
                <span>
                  Menara Karya, Level 18, Jl. H. R. Rasuna Said Blok X-5, Kuningan, Jakarta Selatan 12950
                </span>
              </div>
            </div>
          </aside>
          <form className="premium-form" onSubmit={submit}>
            <div className="premium-form-row">
              <div>
                <label htmlFor="premium-contact-name">Full name</label>
                <input id="premium-contact-name" required value={form.name} onChange={(event) => update("name", event.target.value)} />
              </div>
              <div>
                <label htmlFor="premium-contact-email">Email</label>
                <input id="premium-contact-email" type="email" required value={form.email} onChange={(event) => update("email", event.target.value)} />
              </div>
            </div>
            <div>
              <label htmlFor="premium-contact-subject">Subject</label>
              <select id="premium-contact-subject" value={form.subject} onChange={(event) => update("subject", event.target.value)}>
                <option value="general">General inquiry</option>
                <option value="product">Product question</option>
                <option value="order">Order support</option>
                <option value="order-status">Order status</option>
                <option value="delivery-issue">Delivery issue</option>
                <option value="design">Design consultation</option>
              </select>
            </div>
            <div>
              <label htmlFor="premium-contact-message">Message</label>
              <textarea id="premium-contact-message" required minLength={10} rows={7} value={form.message} onChange={(event) => update("message", event.target.value)} />
            </div>
            <button type="submit">Open Email Message</button>
            <p className="note">This opens your email application; the website does not store contact messages.</p>
          </form>
        </div>
      </main>
    </PremiumShell>
  );
}
