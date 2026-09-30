import { CollectionPage } from "@/components/CommercePages";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  return <CollectionPage category={room}/>;
}
