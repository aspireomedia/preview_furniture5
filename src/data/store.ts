export type Product = { id: string; name: string; price: string; image: string; category: string };

export const roomCategories = [
  { label: "Living Room", icon: "sofa" }, { label: "Bedroom", icon: "bed" },
  { label: "Dining Room", icon: "table" }, { label: "Home Office", icon: "desk" },
  { label: "Storage", icon: "cabinet" }, { label: "Lighting", icon: "lamp" },
  { label: "Home Decor", icon: "vase" }, { label: "Sale", icon: "tag" },
];

export const categories = [
  { name: "Living Room", description: "Sofa, TV Cabinet, Coffee Table", image: "/images/living.jpg" },
  { name: "Bedroom", description: "Bed Frame, Mattress, Wardrobe and more", image: "/images/bedroom.jpg" },
  { name: "Dining Room", description: "Dining Table, Dining Chair, Sideboard and more", image: "/images/dining.jpg" },
  { name: "Home Office", description: "Work Desk, Office Chair, Bookshelf and more", image: "/images/office.jpg" },
  { name: "Storage", description: "Cabinet, Rack, Organizer and more", image: "/images/storage.jpg" },
  { name: "Home Decor", description: "Lighting, Mirror, Rug, Decoration and more", image: "/images/decor.jpg" },
];

export const products: Product[] = [
  ["luna","Luna 3-Seater Sofa","Rp 7.499.000","product1","Living Room"], ["arika","Arika Dining Table Set","Rp 5.999.000","product2","Dining Room"],
  ["evara","Evara Bed Frame","Rp 6.999.000","product3","Bedroom"], ["nexus","Nexus Office Chair","Rp 2.499.000","product4","Home Office"],
  ["kana","Kana Sideboard Cabinet","Rp 3.999.000","product5","Storage"], ["rika","Rika Coffee Table","Rp 2.999.000","product6","Living Room"],
  ["hana","Hana Bookshelf","Rp 2.499.000","product7","Storage"], ["mori","Mori Wardrobe","Rp 6.459.000","storage","Bedroom"],
  ["sora","Sora Woven Rug","Rp 1.299.000","product9","Home Decor"], ["ari","Ari Table Lamp","Rp 895.000","product10","Lighting"],
].map(([id,name,price,image,category]) => ({ id, name, price, image: `/images/${image}.jpg`, category }));

export const navLinks = [
  ["Home", "#home"], ["Products", "#products"], ["Rooms", "#rooms"], ["Inspiration", "#inspiration"], ["About Us", "#about"], ["Contact", "#contact"],
];
