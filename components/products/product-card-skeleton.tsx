import { Card } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

const ProductCardSkeleton = ({ product }: { product: number }) => {
  return (
    <Card className="break-inside-avoid p-3">
      {/* image */}
      <Skeleton className={` w-full min-h-15 h-${product * 5} `} />

      {/* info */}
      <Skeleton className="h-5 w-2/3" />
      <Skeleton className="h-3 w-1/2" />
    </Card>
  );
};

export default ProductCardSkeleton;
