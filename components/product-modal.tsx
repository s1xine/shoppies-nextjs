"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const ProductViewModalClient = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [activeImage, setActiveImage] = useState(product.images?.[0]);

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

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="
          grid
          md:grid-cols-1
          xl:grid-cols-[1.2fr_.8fr]
          2xl:grid-cols-[1.4fr_.6fr]
        "
        >
          {/* ================= LEFT: IMAGE SECTION ================= */}
          <div className="bg-muted/40 p-6 sm:p-10 flex flex-col justify-center">
            <div className="relative aspect-square w-full max-w-2xl mx-auto">
              <AnimatePresence mode="wait">
                {activeImage && (
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.35 }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={activeImage}
                      alt={product.title}
                      fill
                      priority
                      className="object-contain rounded-xl"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* thumbnails */}
            {product.images?.length > 1 && (
              <div className="flex gap-3 mt-8 flex-wrap justify-center">
                {product.images.map((img) => (
                  <motion.button
                    key={img}
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveImage(img)}
                    className={`
                      relative w-16 h-16 rounded-xl overflow-hidden border
                      transition-all duration-300
                      ${
                        activeImage === img
                          ? "border-primary ring-2 ring-primary/20"
                          : "border-border hover:border-primary/50"
                      }
                    `}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* ================= RIGHT: DETAILS ================= */}
          <div className="p-6 sm:p-10 flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {/* title */}
              <h1 className="text-2xl sm:text-3xl font-semibold leading-tight">
                {product.title}
              </h1>

              {/* price */}
              <div className="text-3xl sm:text-4xl font-bold mt-4">
                ₹{product.price.toLocaleString()}
              </div>

              {/* description */}
              {product.description && (
                <p className="text-muted-foreground mt-5 leading-relaxed max-w-md">
                  {product.description}
                </p>
              )}
            </motion.div>

            <div className="flex-1" />

            {/* actions */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 mt-10"
            >
              <Button className="flex-1 h-12 text-base">Add to Cart</Button>

              <Button variant="outline" className="flex-1 h-12 text-base">
                Buy Now
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModalClient;
