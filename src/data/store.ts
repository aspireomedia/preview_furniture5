export type Product = {
  id: string;
  name: string;
  price: string;
  numericPrice: number;
  image: string;
  category: string;
  productType: string;
  material: string;
  dimensions: string;
  description: string;
  badge?: string;
};

type ProductRow = Omit<Product, "image"> & { image: string };

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
  { name: "Living Room", slug: "living-room", description: "Sofa, lounge chair, coffee table and more", image: "/images/living.jpg" },
  { name: "Bedroom", slug: "bedroom", description: "Bed frame, bedside table, wardrobe and more", image: "/images/bedroom.jpg" },
  { name: "Dining Room", slug: "dining-room", description: "Dining table, dining chair, sideboard and more", image: "/images/dining.jpg" },
  { name: "Home Office", slug: "home-office", description: "Work desk, office chair, bookshelf and more", image: "/images/office.jpg" },
  { name: "Storage", slug: "storage", description: "Cabinet, rack, organizer and more", image: "/images/storage.jpg" },
  { name: "Home Decor", slug: "home-decor", description: "Lighting, mirror, rug, decoration and more", image: "/images/decor.jpg" },
];

const rows: ProductRow[] = [
  { id:"luna", name:"Luna 3-Seater Sofa", price:"Rp 7.499.000", numericPrice:7499000, image:"product1", category:"Living Room", productType:"Sofa", material:"Textured linen", dimensions:"W 218 × D 91 × H 82 cm", description:"A deeply comfortable linen sofa with a low, relaxed silhouette for everyday gathering.", badge:"Best Seller" },
  { id:"luna-loveseat", name:"Luna 2-Seater Sofa", price:"Rp 5.899.000", numericPrice:5899000, image:"product1", category:"Living Room", productType:"Sofa", material:"Textured linen", dimensions:"W 168 × D 91 × H 82 cm", description:"The compact Luna sofa keeps the same soft, relaxed comfort for smaller living rooms." },
  { id:"luna-chaise", name:"Luna Chaise Sofa", price:"Rp 8.499.000", numericPrice:8499000, image:"living", category:"Living Room", productType:"Sofa", material:"Textured linen", dimensions:"W 246 × D 158 × H 82 cm", description:"A generous chaise sofa made for slow weekends and open, comfortable living rooms." },
  { id:"luna-ottoman", name:"Luna Ottoman", price:"Rp 1.799.000", numericPrice:1799000, image:"product1", category:"Living Room", productType:"Sofa", material:"Textured linen", dimensions:"W 84 × D 64 × H 42 cm", description:"A matching upholstered ottoman that adds an easy extra seat or place to put your feet up." },
  { id:"arika", name:"Arika Dining Table Set", price:"Rp 5.999.000", numericPrice:5999000, image:"product2", category:"Dining Room", productType:"Dining Table", material:"Solid rubberwood", dimensions:"Table W 160 × D 80 × H 75 cm", description:"An easygoing dining set with warm timber grain and room for long, unhurried meals.", badge:"New Arrival" },
  { id:"arika-round", name:"Arika Round Dining Table", price:"Rp 4.299.000", numericPrice:4299000, image:"dining", category:"Dining Room", productType:"Dining Table", material:"Solid rubberwood", dimensions:"Ø 120 × H 75 cm", description:"A round timber dining table that makes everyday meals and intimate gatherings feel easy." },
  { id:"arika-extend", name:"Arika Extendable Dining Table", price:"Rp 6.899.000", numericPrice:6899000, image:"product2", category:"Dining Room", productType:"Dining Table", material:"Solid rubberwood", dimensions:"W 160–210 × D 90 × H 75 cm", description:"A flexible dining table with an understated timber profile and extra room when friends arrive." },
  { id:"arika-bench", name:"Arika Dining Bench", price:"Rp 1.899.000", numericPrice:1899000, image:"dining", category:"Dining Room", productType:"Dining Table", material:"Solid rubberwood", dimensions:"W 130 × D 38 × H 45 cm", description:"A matching dining bench with simple proportions and a naturally warm finish." },
  { id:"evara", name:"Evara Bed Frame", price:"Rp 6.999.000", numericPrice:6999000, image:"product3", category:"Bedroom", productType:"Bed Frame", material:"Oak veneer", dimensions:"W 180 × D 200 × H 108 cm", description:"A calm, structured bed frame that brings a grounded, natural finish to the bedroom." },
  { id:"evara-queen", name:"Evara Queen Bed Frame", price:"Rp 5.999.000", numericPrice:5999000, image:"bedroom", category:"Bedroom", productType:"Bed Frame", material:"Oak veneer", dimensions:"W 160 × D 200 × H 108 cm", description:"A quieter, space-conscious version of the Evara bed with the same warm oak profile." },
  { id:"evara-platform", name:"Evara Platform Bed", price:"Rp 6.499.000", numericPrice:6499000, image:"product3", category:"Bedroom", productType:"Bed Frame", material:"Oak veneer", dimensions:"W 180 × D 200 × H 38 cm", description:"A low platform bed frame with clean lines for an uncluttered, restful bedroom." },
  { id:"evara-storage", name:"Evara Storage Bed", price:"Rp 8.299.000", numericPrice:8299000, image:"bedroom", category:"Bedroom", productType:"Bed Frame", material:"Oak veneer", dimensions:"W 180 × D 200 × H 108 cm", description:"A beautifully finished bed with discreet under-bed storage for a more settled room." },
  { id:"atlas", name:"Atlas Work Desk", price:"Rp 3.299.000", numericPrice:3299000, image:"office", category:"Home Office", productType:"Desk", material:"Oak veneer & steel", dimensions:"W 140 × D 65 × H 75 cm", description:"A generous work desk with a quiet timber surface and practical cable-friendly proportions.", badge:"Best Seller" },
  { id:"atlas-compact", name:"Atlas Compact Desk", price:"Rp 2.499.000", numericPrice:2499000, image:"product4", category:"Home Office", productType:"Desk", material:"Oak veneer & steel", dimensions:"W 100 × D 55 × H 75 cm", description:"A streamlined desk designed to bring a focused work zone to compact spaces." },
  { id:"atlas-corner", name:"Atlas Corner Desk", price:"Rp 4.599.000", numericPrice:4599000, image:"office", category:"Home Office", productType:"Desk", material:"Oak veneer & steel", dimensions:"W 150 × D 150 × H 75 cm", description:"A spacious corner desk that creates a clear, considered place to work from home." },
  { id:"atlas-writing", name:"Atlas Writing Desk", price:"Rp 2.899.000", numericPrice:2899000, image:"product4", category:"Home Office", productType:"Desk", material:"Oak veneer & steel", dimensions:"W 120 × D 55 × H 75 cm", description:"A simple writing desk with room for a laptop, notebook, and a slower daily rhythm." },
  { id:"nexus", name:"Nexus Office Chair", price:"Rp 2.499.000", numericPrice:2499000, image:"product4", category:"Home Office", productType:"Office Chair", material:"Woven performance fabric", dimensions:"W 64 × D 65 × H 108 cm", description:"Supportive, adjustable seating made to carry you through focused workdays." },
  { id:"kana", name:"Kana Sideboard Cabinet", price:"Rp 3.999.000", numericPrice:3999000, image:"product5", category:"Storage", productType:"Sideboard", material:"Oak veneer", dimensions:"W 150 × D 42 × H 78 cm", description:"A low-profile sideboard with quiet storage for dining rooms and living spaces." },
  { id:"rika", name:"Rika Coffee Table", price:"Rp 2.999.000", numericPrice:2999000, image:"product6", category:"Living Room", productType:"Coffee Table", material:"Oak veneer", dimensions:"W 110 × D 60 × H 38 cm", description:"A softly rounded coffee table that keeps the centre of a room clear and inviting." },
  { id:"hana", name:"Hana Bookshelf", price:"Rp 2.499.000", numericPrice:2499000, image:"product7", category:"Storage", productType:"Bookshelf", material:"Powder-coated steel & oak", dimensions:"W 90 × D 34 × H 182 cm", description:"Open shelving for books, ceramics, and the everyday objects that make a home personal." },
  { id:"mori", name:"Mori Wardrobe", price:"Rp 6.459.000", numericPrice:6459000, image:"storage", category:"Bedroom", productType:"Wardrobe", material:"Natural oak veneer", dimensions:"W 120 × D 55 × H 195 cm", description:"A generous wardrobe with a warm timber face and practical interior organisation." },
  { id:"sora", name:"Sora Woven Rug", price:"Rp 1.299.000", numericPrice:1299000, image:"product9", category:"Home Decor", productType:"Rug", material:"Handwoven cotton blend", dimensions:"W 160 × L 230 cm", description:"A soft woven rug that adds gentle texture and a comfortable landing underfoot.", badge:"Special Offer" },
  { id:"ari", name:"Ari Table Lamp", price:"Rp 895.000", numericPrice:895000, image:"product10", category:"Lighting", productType:"Table Lamp", material:"Ceramic & linen", dimensions:"W 32 × D 32 × H 52 cm", description:"A sculptural ceramic lamp with a linen shade for a warmer evening atmosphere." },
];

export const products: Product[] = rows.map(({ image, ...product }) => ({ ...product, image: `/images/${image}.jpg` }));
export function productById(id: string) { return products.find((product) => product.id === id); }
export function productsForCategory(slug?: string) { if (!slug || slug === "all") return products; const category = roomCategories.find((item) => item.slug === slug)?.label; return category ? products.filter((product) => product.category === category) : products; }
export function relatedProducts(product: Product) { return products.filter((item) => item.id !== product.id && item.productType === product.productType).slice(0, 4); }
export const navLinks = [["Home", "/"], ["Products", "/products"], ["Rooms", "/products#rooms"], ["Inspiration", "/#inspiration"], ["About Us", "/#about"], ["Contact", "/#contact"]] as const;
