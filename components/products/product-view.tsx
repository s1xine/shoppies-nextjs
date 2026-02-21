"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import currencyIndianRupee from "@/utils/currency";
import StarRating from "../star-rating";

interface ModalProps {
  product: Product;
  isModal?: boolean;
}

const ProductView = ({ product, isModal = false }: ModalProps) => {
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

  return (
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
          {/* carousel controls */}
          <div>
            {product.images?.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="
                    absolute left-3 top-1/2 -translate-y-1/2
                    h-10 w-10 rounded-full
                    bg-background/80 backdrop-blur
                    border border-border
                    flex items-center justify-center
                    hover:scale-110 transition
                    "
                >
                  ←
                </button>

                <button
                  onClick={goNext}
                  className="
                    absolute right-3 top-1/2 -translate-y-1/2
                    h-10 w-10 rounded-full
                    bg-background/80 backdrop-blur
                    border border-border
                    flex items-center justify-center
                    hover:scale-110 transition
                    "
                >
                  →
                </button>
              </>
            )}
          </div>
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
            {currencyIndianRupee(product.price)}
          </div>

          {/* rating */}
          <div className=" flex items-center mt-5">
            <StarRating value={product.rating ?? 0} readonly />
            {(product.reviewCount ?? 0) > 0 && (
              <span className="ml-2 text-muted-foreground">
                ({product.reviewCount} reviews)
              </span>
            )}
          </div>

          {!isModal && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row gap-3 mt-10"
            >
              <Button className="flex-1 h-12 text-base">Add to Cart</Button>

              <Button variant="outline" className="flex-1 h-12 text-base">
                Add to Wishlist
              </Button>
            </motion.div>
          )}

          {/* description */}
          {product.description && (
            <p
              className={`text-muted-foreground mt-5 leading-relaxed max-w-md
              
              ${!isModal && "mt-10"}
              `}
            >
              {product.description}
            </p>
          )}
        </motion.div>

        {isModal && <div className="flex-1" />}

        {isModal && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col sm:flex-row gap-3 mt-10"
          >
            <Button className="flex-1 h-12 text-base">Add to Cart</Button>

            <Button
              variant="outline"
              className="flex-1 h-12 text-base"
              onClick={() => {
                if (isModal) window.location.reload();
              }}
            >
              Learn More
            </Button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductView;
