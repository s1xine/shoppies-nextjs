"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductView from "./product-view";

const ProductViewModalClient = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.images?.[0]);

  const currentIndex =
    product.images?.findIndex((img) => img === activeImage) ?? 0;

  const goNext = () => {
    if (!product.images?.length) return;
    const next = (currentIndex + 1) % product.images.length;
    setActiveImage(product.images[next]);
  };

  const goPrev = () => {
    if (!product.images?.length) return;
    const prev =
      (currentIndex - 1 + product.images.length) % product.images.length;
    setActiveImage(product.images[prev]);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (window.history.length > 1) router.back();
      else router.push("/");
    }
  };

  return (
    <Dialog defaultOpen onOpenChange={handleOpenChange}>
      <DialogContent
        className="
        p-0 overflow-hidden rounded-2xl
        w-[96vw]
         max-w-[1200px]                  
  min-[1300px]:max-w-[1350px]    
  xl:max-w-[1400px]               
  2xl:max-w-[1700px]              
  3xl:max-w-[1900px] 
  max-h-[92vh]
        overflow-y-auto
      "
      >
        <DialogTitle className="hidden">{product.title}</DialogTitle>

        <ProductView product={product} isModal={true} />
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModalClient;
