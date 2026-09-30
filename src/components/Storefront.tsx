"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryGrid, CategoryNavigation, CollectionBanner, Footer, Hero, ProductGrid, ServiceFeatures } from "@/components/StoreSections";

export function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const toggleLiked = (id: string) => setLiked((items) => { const next = items.includes(id) ? items.filter((item) => item !== id) : [...items, id]; localStorage.setItem("better-space-wishlist", JSON.stringify(next)); return next; });
  const addToCart = (id: string) => { try { const current = JSON.parse(localStorage.getItem("better-space-cart") || "[]") as Array<{ id: string; quantity: number }>; const next = current.some((item) => item.id === id) ? current.map((item) => item.id === id ? { ...item, quantity: item.quantity + 1 } : item) : [...current, { id, quantity: 1 }]; localStorage.setItem("better-space-cart", JSON.stringify(next)); } catch {} setCartCount((count) => count + 1); };
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header cartCount={cartCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen}/><main id="main-content"><Hero/><CategoryNavigation/><CategoryGrid/><ProductGrid liked={liked} toggleLiked={toggleLiked} addToCart={addToCart}/><CollectionBanner/><ServiceFeatures/></main><Footer/></>;
}
