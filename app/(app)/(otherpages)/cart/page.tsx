import PageHeader from "@/components/page-header";
import CartPageClient from "@/components/cart/cart-page-client";
import { Suspense } from "react";

export default function CartPage() {
  return (
    <Suspense>
      <PageHeader title="Cart" />
      <section className="pb-32 pt-6 max-w-7xl mx-auto px-6">
        <CartPageClient />
      </section>
    </Suspense>
  );
}
