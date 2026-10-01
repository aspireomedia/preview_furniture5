// Shared sort options + comparators for every product listing surface.
// One source of truth so the standard and premium catalogues (and their toolbars)
// can never drift apart. Order here is the order shown in the <select>.
//
// `featured` is a real option and must be kept — we ADD to the list, never replace.
export const SORT_OPTIONS = [
  { value: "featured", label: "Pilihan" },
  { value: "newest", label: "Terbaru" },
  { value: "popular", label: "Populer" },
  { value: "price-low", label: "Harga: rendah ke tinggi" },
  { value: "price-high", label: "Harga: tinggi ke rendah" },
] as const;

export type SortValue = (typeof SORT_OPTIONS)[number]["value"];

// The shape the comparator needs. Every catalogue product satisfies this
// (P5 standard, P5 premium, P6 standard, P6 premium).
export type SortableProduct = {
  numericPrice: number;
  badge?: string;
  rating?: number;
  reviews?: number;
  isNew?: boolean;
};

// "Terbaru" / "Populer" are backed by real catalogue data, not a fake tie-break:
//  - newness  : an explicit isNew flag, else a new-arrival badge ("Produk Baru" / "Baru")
//  - popularity: the review count (how many people engaged), then rating
const NEW_BADGES = ["Produk Baru", "Baru"];
const BESTSELLER_BADGES = ["Terlaris"];
const isNewProduct = (p: SortableProduct) => p.isNew === true || (p.badge ? NEW_BADGES.includes(p.badge) : false);
const isBestseller = (p: SortableProduct) => (p.badge ? BESTSELLER_BADGES.includes(p.badge) : false);
const popularity = (p: SortableProduct) => p.reviews ?? 0;

export function sortProducts<T extends SortableProduct>(items: T[], sort: string): T[] {
  const out = [...items];
  switch (sort) {
    case "newest":
      // New arrivals first, newest-flagged before the rest; stable otherwise.
      return out.sort((a, b) => Number(isNewProduct(b)) - Number(isNewProduct(a)));
    case "popular":
      // Popularity uses whatever real signal the catalogue has, in priority order:
      // bestseller badge (curated "Terlaris") > review count > rating. Never fabricates one.
      return out.sort(
        (a, b) =>
          Number(isBestseller(b)) - Number(isBestseller(a)) ||
          popularity(b) - popularity(a) ||
          (b.rating ?? 0) - (a.rating ?? 0),
      );
    case "popular-views":
      return out.sort((a, b) => popularity(b) - popularity(a));
    case "price-low":
      return out.sort((a, b) => a.numericPrice - b.numericPrice);
    case "price-high":
      return out.sort((a, b) => b.numericPrice - a.numericPrice);
    case "rating":
      return out.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
    case "featured":
    default:
      // No reordering: the catalogue's curated order IS the "Pilihan" order.
      return out;
  }
}

export function parseSortParam(value: string | null): SortValue {
  return (SORT_OPTIONS as readonly { value: string }[]).some((o) => o.value === value)
    ? (value as SortValue)
    : "featured";
}
