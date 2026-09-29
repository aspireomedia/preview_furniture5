"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryGrid, CategoryNavigation, CollectionBanner, Footer, Hero, ProductGrid, ServiceFeatures } from "@/components/StoreSections";

export function Storefront() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [liked, setLiked] = useState<string[]>([]);
  const [cartCount, setCartCount] = useState(0);
  const toggleLiked = (id: string) => setLiked((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  return <><a className="skip-link" href="#main-content">Skip to content</a><Header cartCount={cartCount} menuOpen={menuOpen} setMenuOpen={setMenuOpen} searchOpen={searchOpen} setSearchOpen={setSearchOpen}/><main id="main-content"><Hero/><CategoryNavigation/><CategoryGrid/><ProductGrid liked={liked} toggleLiked={toggleLiked} addToCart={() => setCartCount((count) => count + 1)}/><CollectionBanner/><ServiceFeatures/></main><Footer/></>;
}
