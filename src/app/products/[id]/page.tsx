import { notFound } from "next/navigation";
import { ProductPage } from "@/components/CommercePages";
import { productById } from "@/data/store";

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = productById(id);
  if (!product) notFound();
  return <ProductPage product={product}/>;
}
