import WishlistCardSkeleton from "./wishlist-card-skeleton";

export default function WishlistGridSkeleton() {
  return (
    <section className="pb-32 pt-6 max-w-7xl mx-auto px-6">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }).map((_, i) => (
          <WishlistCardSkeleton key={i} />
        ))}
      </div>
    </section>
  );
}
