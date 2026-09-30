export type Product = {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: string;
  material: string;
  dimensions: string;
  description: string;
  badge?: string;
};

export const roomCategories = [
  { label: "Living Room", icon: "sofa", slug: "living-room" },
  { label: "Bedroom", icon: "bed", slug: "bedroom" },
  { label: "Dining Room", icon: "table", slug: "dining-room" },
  { label: "Home Office", icon: "desk", slug: "home-office" },
  { label: "Storage", icon: "cabinet", slug: "storage" },
  { label: "Lighting", icon: "lamp", slug: "lighting" },
  { label: "Home Decor", icon: "vase", slug: "home-decor" },
  { label: "Special Offers", icon: "tag", slug: "special-offers" },
];

export const categories = [
  { name: "Living Room", slug: "living-room", description: "Sofa, TV Cabinet, Coffee Table", image: "/images/living.jpg" },
  { name: "Bedroom", slug: "bedroom", description: "Bed Frame, Mattress, Wardrobe and more", image: "/images/bedroom.jpg" },
  { name: "Dining Room", slug: "dining-room", description: "Dining Table, Dining Chair, Sideboard and more", image: "/images/dining.jpg" },
  { name: "Home Office", slug: "home-office", description: "Work Desk, Office Chair, Bookshelf and more", image: "/images/office.jpg" },
  { name: "Storage", slug: "storage", description: "Cabinet, Rack, Organizer and more", image: "/images/storage.jpg" },
  { name: "Home Decor", slug: "home-decor", description: "Lighting, Mirror, Rug, Decoration and more", image: "/images/decor.jpg" },
];

const rawProducts = [
  ["luna", "Luna 3-Seater Sofa", "Rp 7.499.000", 7499000, "product1", "Living Room", "Textured linen", "W 218 × D 91 × H 82 cm", "A deeply comfortable linen sofa with a low, relaxed silhouette for everyday gathering.", "Best Seller"],
  ["arika", "Arika Dining Table Set", "Rp 5.999.000", 5999000, "product2", "Dining Room", "Solid rubberwood", "Table W 160 × D 80 × H 75 cm", "An easygoing dining set with warm timber grain and room for long, unhurried meals.", "New Arrival"],
  ["evara", "Evara Bed Frame", "Rp 6.999.000", 6999000, "product3", "Bedroom", "Oak veneer", "W 180 × D 200 × H 108 cm", "A calm, structured bed frame that brings a grounded, natural finish to the bedroom."],
  ["nexus", "Nexus Office Chair", "Rp 2.499.000", 2499000, "product4", "Home Office", "Woven performance fabric", "W 64 × D 65 × H 108 cm", "Supportive, adjustable seating made to carry you through focused workdays."],
  ["kana", "Kana Sideboard Cabinet", "Rp 3.999.000", 3999000, "product5", "Storage", "Oak veneer", "W 150 × D 42 × H 78 cm", "A low-profile sideboard with quiet storage for dining rooms and living spaces."],
  ["rika", "Rika Coffee Table", "Rp 2.999.000", 2999000, "product6", "Living Room", "Oak veneer", "W 110 × D 60 × H 38 cm", "A softly rounded coffee table that keeps the centre of a room clear and inviting."],
  ["hana", "Hana Bookshelf", "Rp 2.499.000", 2499000, "product7", "Storage", "Powder-coated steel & oak", "W 90 × D 34 × H 182 cm", "Open shelving for books, ceramics, and the everyday objects that make a home personal."],
  ["mori", "Mori Wardrobe", "Rp 6.459.000", 6459000, "storage", "Bedroom", "Natural oak veneer", "W 120 × D 55 × H 195 cm", "A generous wardrobe with a warm timber face and practical interior organisation."],
  ["sora", "Sora Woven Rug", "Rp 1.299.000", 1299000, "product9", "Home Decor", "Handwoven cotton blend", "W 160 × L 230 cm", "A soft woven rug that adds gentle texture and a comfortable landing underfoot.", "Special Offer"],
  ["ari", "Ari Table Lamp", "Rp 895.000", 895000, "product10", "Lighting", "Ceramic & linen", "W 32 × D 32 × H 52 cm", "A sculptural ceramic lamp with a linen shade for a warmer evening atmosphere."],
] as const;

export const products: Product[] = rawProducts.map(([id, name, price, numericPrice, image, category, material, dimensions, description, badge]) => ({
  id, name, price, numericPrice, image: `/images/${image}.jpg`, category, material, dimensions, description, ...(badge ? { badge } : {}),
}));

export function productById(id: string) {
  return products.find((product) => product.id === id);
}

export function productsForCategory(slug?: string) {
  if (!slug || slug === "all") return products;
  const category = roomCategories.find((item) => item.slug === slug)?.label;
  return category ? products.filter((product) => product.category === category) : products;
}

export const navLinks = [
  ["Home", "/"], ["Products", "/products"], ["Rooms", "/products#rooms"], ["Inspiration", "/#inspiration"], ["About Us", "/#about"], ["Contact", "/#contact"],
] as const;
