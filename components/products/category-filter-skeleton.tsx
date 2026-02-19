import { Skeleton } from "../ui/skeleton";

const CategoryFilterSkeleton = () => {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-6 w-40 rounded-2xl bg-white/10" />
      <Skeleton className="h-6 w-25 rounded-2xl bg-white/10" />
      <Skeleton className="h-6 w-31 rounded-2xl bg-white/10" />
      <Skeleton className="h-6 w-17 rounded-2xl bg-white/10" />
      <Skeleton className="h-6 w-28 rounded-2xl bg-white/10" />
    </div>
  );
};

export default CategoryFilterSkeleton;
