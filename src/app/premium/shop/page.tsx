"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PremiumShell, PremiumProductCard, usePremiumStore } from "@/components/premium/PremiumStore";
import { premiumCategories, premiumProductsForCategory } from "@/data/premium";
import { Pagination, PageSizeSelect, ListingRangeLabel } from "@/components/Pagination";
import { paginate, PageSize, parsePageParam, parsePageSizeParam } from "@/lib/paginate";

export default function PremiumShopPage() { return <Suspense fallback={null}><PremiumShopContent /></Suspense>; }
function PremiumShopContent() {
  const store = usePremiumStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // URL is the single source of truth for category/page/limit. Selection state is only
  // mirrored locally so back/forward and deep links stay correct.
  const urlCategory = searchParams.get("category") || "all";
  const urlPage = parsePageParam(searchParams.get("page"));
  const urlPageSize = parsePageSizeParam(searchParams.get("limit"));

  const [category, setCategory] = useState(urlCategory);
  const [page, setPage] = useState(urlPage);
  const [pageSize, setPageSize] = useState<PageSize>(urlPageSize);
  const [sort, setSort] = useState("featured");

  // Adopt external URL changes (back button, manual edit, shared link) via the
  // render-time adjustment pattern: no effect, no stale-closure ordering hazard.
  const [seenUrl, setSeenUrl] = useState({ category: urlCategory, page: urlPage, pageSize: urlPageSize });
  if (seenUrl.category !== urlCategory || seenUrl.page !== urlPage || seenUrl.pageSize !== urlPageSize) {
    setSeenUrl({ category: urlCategory, page: urlPage, pageSize: urlPageSize });
    setCategory(urlCategory);
    setPage(urlPage);
    setPageSize(urlPageSize);
  }

  const pushUrl = (next: { category: string; page: number; pageSize: PageSize }) => {
    setSeenUrl(next); // keep the baseline in step so our own write is not re-adopted as external
    setCategory(next.category);
    setPage(next.page);
    setPageSize(next.pageSize);
    const params = new URLSearchParams();
    if (next.category !== "all") params.set("category", next.category);
    params.set("page", String(next.page));
    params.set("limit", String(next.pageSize));
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const chooseCategory = (next: string) => pushUrl({ category: next, page: 1, pageSize });
  const changePage = (next: number) => pushUrl({ category, page: next, pageSize });
  const choosePageSize = (next: PageSize) => pushUrl({ category, page: 1, pageSize: next });

  // Reset to page 1 on any filter change. The key is derived from the already-committed
  // urlCategory (not the local mirror) so it can never fire against a stale searchParams
  // identity mid-commit, and never reverts a category that arrived via the URL.
  const [resetKey, setResetKey] = useState(`${urlCategory}|${sort}`);
  if (resetKey !== `${urlCategory}|${sort}`) { setResetKey(`${urlCategory}|${sort}`); setPage(1); }

  const products = useMemo(() => {
    const base = [...premiumProductsForCategory(category === "all" ? undefined : category)];
    if (sort === "price-low") base.sort((a, b) => a.numericPrice - b.numericPrice);
    if (sort === "price-high") base.sort((a, b) => b.numericPrice - a.numericPrice);
    if (sort === "rating") base.sort((a, b) => b.rating - a.rating);
    return base;
  }, [category, sort]);
  const { pageItems, total, totalPages, safePage, start, end } = useMemo(() => paginate(products, page, pageSize), [products, page, pageSize]);
  // Out-of-range pages clamp locally so the grid is never blank.
  if (safePage !== page) setPage(safePage);

  const activeLabel = category === "all" ? "Semua Furniture" : premiumCategories.find((item) => item.id === category)?.name || "Semua Furniture";
  return <PremiumShell cartCount={store.cartCount}><main><div className="premium-shell premium-page-hero"><p className="eyebrow">Better Space Premium</p><h1>{activeLabel}</h1><p className="lede">Furniture untuk ruang yang terasa tenang, tertata, dan benar-benar milik Anda.</p></div><div id="premium-shop-listing" className="premium-shell premium-shop-layout"><aside className="premium-shop-sidebar"><b>Belanja berdasarkan kategori</b><button type="button" className={category === "all" ? "active" : ""} onClick={() => chooseCategory("all")}>Semua Furniture</button>{premiumCategories.map((item) => <button type="button" key={item.id} className={category === item.id ? "active" : ""} onClick={() => chooseCategory(item.id)}>{item.name} ({item.count})</button>)}</aside><div><div className="premium-shop-toolbar"><ListingRangeLabel total={total} start={start} end={end}/><div className="premium-shop-toolbar-controls"><PageSizeSelect pageSize={pageSize} onPageSizeChange={choosePageSize}/><label>Urutkan <select value={sort} onChange={(event) => setSort(event.target.value)}><option value="featured">Pilihan</option><option value="price-low">Harga terendah</option><option value="price-high">Harga tertinggi</option><option value="rating">Rating tertinggi</option></select></label></div></div><div className="premium-grid">{pageItems.map((product) => <PremiumProductCard key={product.id} product={product} wishlisted={store.wishlist.includes(product.id)} onWishlist={store.toggleWishlist} onAdd={store.add}/>)}</div><Pagination page={safePage} totalPages={totalPages} onPageChange={changePage} className="premium-pagination" scrollTargetId="premium-shop-listing"/></div></div></main></PremiumShell>;
}
