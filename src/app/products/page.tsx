import { Suspense } from "react";
import { CollectionPage } from "@/components/CommercePages";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  return <Suspense fallback={null}><CollectionPage room={room}/></Suspense>;
}
