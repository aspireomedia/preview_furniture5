"use client";

import Link from "next/link";
import { AlertTriangle, Clock3, CreditCard, FileWarning, PackageX, RefreshCw, SearchX, ShieldAlert, ShoppingBag, UploadCloud, WifiOff } from "lucide-react";

type State = keyof typeof states;
const states = {
  "not-found": [SearchX, "This page is no longer here", "The address may be incomplete or the page may have moved. No payment was made.", "Browse the collection", "/#products"],
  unavailable: [WifiOff, "The store cannot be reached right now", "We could not connect to the store. No payment was made.", "Try again", "retry"],
  timeout: [Clock3, "The request took too long", "We did not receive a response in time. No payment was made.", "Try again", "retry"],
  declined: [CreditCard, "Your payment was not approved", "Your card was not charged. Check the details or choose another payment method.", "Choose another method", "/status/pending"],
  pending: [Clock3, "We are waiting for payment confirmation", "Do not pay again yet. We will update this order when confirmation arrives.", "Check again", "retry"],
  expired: [Clock3, "Your payment session has expired", "No payment was made. Start a new payment session when you are ready.", "Start payment again", "/#products"],
  "order-not-found": [FileWarning, "We could not find that order", "Check the order reference and try again. No new payment was made.", "Contact support", "/#footer"],
  "out-of-stock": [PackageX, "This item is out of stock", "It cannot be added to your order right now. No payment was made.", "Browse available items", "/#products"],
  "stock-changed": [PackageX, "Stock changed after it was added", "The unavailable item was removed before payment. No payment was made.", "Review the collection", "/#products"],
  "price-changed": [AlertTriangle, "The price changed before payment", "Review the updated total before continuing. No payment was made.", "Review items", "/#products"],
  "empty-cart": [ShoppingBag, "Your cart is waiting for something", "Add an item before starting checkout. No payment was made.", "Browse the collection", "/#products"],
  "empty-search": [SearchX, "No products matched that search", "Try a room, material, or a shorter search term. No payment was made.", "Browse all products", "/#products"],
  validation: [AlertTriangle, "Please check the delivery details", "Some required information is missing or invalid. No payment was made.", "Review checkout", "/#products"],
  "too-many-attempts": [Clock3, "Please wait before trying again", "Too many attempts were made in a short time. No payment was made.", "Try again", "retry"],
  "session-expired": [ShieldAlert, "Your staff session has ended", "For your security, please sign in again. No payment was made.", "Sign in again", "/"],
  unauthorized: [ShieldAlert, "You do not have access to this area", "This account does not have the required role. No payment was made.", "Return home", "/"],
  "upload-rejected": [UploadCloud, "That image cannot be uploaded", "Use a JPG, PNG, or WebP image up to 5 MB. No payment was made.", "Choose another image", "/"],
  unexpected: [AlertTriangle, "This part of the store could not load", "Your basket has not been charged. Please try again.", "Try again", "retry"],
} as const;

export function ErrorExperience({ state = "unexpected", reset }: { state?: string; reset?: () => void }) {
  const [Icon, title, detail, action, href] = states[(state in states ? state : "unexpected") as State];
  const retry = () => reset ? reset() : window.location.reload();
  return <main className="error-page"><section className="error-card" role="alert"><Icon aria-hidden="true" size={42}/><p>BETTER SPACE UPDATE</p><h1>{title}</h1><span>{detail}</span><div>{href === "retry" ? <button onClick={retry}><RefreshCw size={16}/>{action}</button> : <Link href={href}>{action}</Link>}<Link className="error-secondary" href="/">Return home</Link></div></section></main>;
}

export function ErrorTriggerLinks() { return <nav className="error-trigger-links" aria-label="Service state examples"><Link href="/status/empty-cart">Cart help</Link><Link href="/status/pending">Payment status</Link></nav>; }
