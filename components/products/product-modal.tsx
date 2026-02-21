"use client";

import { useRouter } from "next/navigation";
import { Product } from "@/types/product";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductView from "./product-view";

const ProductViewModalClient = ({ product }: { product: Product }) => {
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (window.history.length > 1) router.back();
      else router.push("/");
    } else {
      window.location.reload();
    }
  };
  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent
        className="
        p-0 overflow-hidden rounded-2xl w-[96vw] max-w-[1200px] min-[1300px]:max-w-[1350px] xl:max-w-[1400px] 2xl:max-w-[1700px] 3xl:max-w-[1900px] max-h-[92vh] overflow-y-auto"
      >
        <DialogTitle className="hidden">{product.title}</DialogTitle>

        <ProductView
          product={product}
          isModal={true}
          handleOpenChange={handleOpenChange}
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModalClient;
