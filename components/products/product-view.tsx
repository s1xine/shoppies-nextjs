"use client";

import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import currencyIndianRupee from "@/utils/currency";
import StarRating from "../star-rating";

import ProductImageCarousel from "./product-image-carousel";

interface ModalProps {
  product: Product;
  isModal?: boolean;
}

const ProductView = ({ product, isModal = false }: ModalProps) => {
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
      <ProductImageCarousel images={product.images} title={product.title} />

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
                if (isModal) {
                  window.location.href = `/products/${product.slug}`;
                }
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
