import { notFound } from "next/navigation";
import { premiumProductBySlug } from "@/data/premium";
import { PremiumProductDetail } from "./PremiumProductDetail";

export default async function PremiumProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = premiumProductBySlug(slug);
  if (!product) notFound();
  return <PremiumProductDetail product={product} />;
}
