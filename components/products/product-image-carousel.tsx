"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  CarouselApi,
} from "@/components/ui/carousel";

interface Props {
  images: string[];
  title: string;
}

export default function ProductImageCarousel({ images, title }: Props) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // sync carousel index
  useEffect(() => {
    if (!api) return;

    const update = () => {
      setCurrent(api.selectedScrollSnap());
    };

    // subscribe
    api.on("select", update);

    // run once AFTER subscribe (safe)
    update();

    return () => {
      api.off("select", update);
    };
  }, [api]);

  if (!images?.length) return null;

  return (
    <div className="bg-muted/40 p-6 sm:p-10 flex flex-col justify-center">
      {/* ===== MAIN IMAGE ===== */}
      <div className="relative aspect-square w-full max-w-2xl mx-auto">
        <Carousel setApi={setApi} opts={{ loop: true }}>
          <CarouselContent>
            {images.map((image, index) => (
              <CarouselItem key={image}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={image}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35 }}
                    className="relative aspect-square w-full"
                  >
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="100vw"
                      className="object-contain rounded-xl"
                      priority={index === 0}
                    />
                  </motion.div>
                </AnimatePresence>
              </CarouselItem>
            ))}
          </CarouselContent>

          {images.length > 1 && (
            <div className="hidden md:block">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          )}
        </Carousel>
      </div>

      {/* ===== THUMBNAILS ===== */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-8 flex-wrap justify-center">
          {images.map((img, index) => (
            <motion.button
              key={img}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => api?.scrollTo(index)}
              className={`
                relative w-16 h-16 rounded-xl overflow-hidden border
                transition-all duration-300
                ${
                  current === index
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
  );
}
