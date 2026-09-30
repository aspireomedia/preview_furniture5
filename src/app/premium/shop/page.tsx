"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { PremiumShell, PremiumProductCard, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumCategories, premiumProductsForCategory } from "@/data/premium";

export default function PremiumShopPage() {
  return (
    <Suspense fallback={null}>
      <PremiumShopContent />
    </Suspense>
  );
}

function PremiumShopContent() {
  const store = usePremiumStore();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState<string>("all");
  const [sort, setSort] = useState("featured");

  useEffect(() => {
    const fromUrl = searchParams.get("category");
    if (fromUrl) setCategory(fromUrl);
  }, [searchParams]);

  const products = useMemo(() => {
    const base = [...premiumProductsForCategory(category === "all" ? undefined : category)];
    if (sort === "price-low") base.sort((a, b) => a.numericPrice - b.numericPrice);
    if (sort === "price-high") base.sort((a, b) => b.numericPrice - a.numericPrice);
    if (sort === "rating") base.sort((a, b) => b.rating - a.rating);
    return base;
  }, [category, sort]);

  const activeLabel = category === "all" ? "All Furniture" : premiumCategories.find((item) => item.id === category)?.name || "All Furniture";

  return (
    <PremiumShell cartCount={store.cartCount}>
      <main>
        <div className="premium-shell premium-page-hero">
          <p className="eyebrow">Better Space Premium</p>
          <h1>{activeLabel}</h1>
          <p className="lede">Furniture made for rooms that feel calm, considered, and distinctly yours.</p>
        </div>
        <div className="premium-shell premium-shop-layout">
          <aside className="premium-shop-sidebar">
            <b>Browse by category</b>
            <a className={category === "all" ? "active" : ""} onClick={() => setCategory("all")} role="button" tabIndex={0}>
              All furniture
            </a>
            {premiumCategories.map((item) => (
              <a key={item.id} className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)} role="button" tabIndex={0}>
                {item.name} ({item.count})
              </a>
            ))}
          </aside>
          <div>
            <div className="premium-shop-toolbar">
              <span>{products.length} pieces for your home</span>
              <label>
                Sort{" "}
                <select value={sort} onChange={(event) => setSort(event.target.value)}>
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="rating">Highest rated</option>
                </select>
              </label>
            </div>
            <div className="premium-grid">
              {products.map((product) => (
                <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add} />
              ))}
            </div>
          </div>
        </div>
      </main>
    </PremiumShell>
  );
}
