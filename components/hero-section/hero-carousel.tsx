"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/product";
import { useRef, useState, useEffect } from "react";
import currencyIndianRupee from "@/utils/currency";
import { useRouter } from "next/navigation";

export default function HeroCarousel({
  heroProducts,
}: {
  heroProducts: Product[];
}) {
  const router = useRouter();

  // autoplay plugin
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));

  // carousel api + active index
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // track active slide
  useEffect(() => {
    if (!api) return;

    const update = () => setCurrent(api.selectedScrollSnap());

    api.on("select", update);
    api.on("init", update);

    return () => {
      api.off("select", update);
      api.off("init", update);
    };
  }, [api]);

  return (
    <div className="w-full">
      <Carousel
        setApi={setApi}
        plugins={[plugin.current]}
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
        opts={{ loop: true }}
        className="w-full"
      >
        <CarouselContent className="flex items-center">
          {heroProducts.map((product, index) => (
            <CarouselItem key={product.id ?? index}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 md:px-10">
                {/* ===== LEFT: INFO ===== */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="space-y-7 order-2 lg:order-1"
                >
                  <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                    {product.title}
                  </h1>

                  <p className="text-lg text-gray-400 max-w-md line-clamp-3 min-h-18">
                    {product.description}
                  </p>

                  <p className="text-xl font-medium text-gray-200">
                    {currencyIndianRupee(product.price)}
                  </p>

                  <div className="flex gap-4 pt-6">
                    <Button className="rounded-full px-7 py-6 text-base bg-purple-700 text-white hover:bg-purple-900">
                      Buy now
                    </Button>

                    <Button
                      variant="outline"
                      className="rounded-full px-7 py-6 text-base cursor-pointer"
                      onClick={() => router.push(`/products/${product.slug}`)}
                    >
                      Learn more
                    </Button>
                  </div>
                </motion.div>

                {/* ===== RIGHT: IMAGE ===== */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative flex justify-center order-1"
                >
                  <div className="relative w-full max-w-xl aspect-4/3 mx-auto">
                    <Image
                      src={product.images[0]}
                      alt={product.title}
                      fill
                      priority={index === 0}
                      className="object-contain drop-shadow-2xl"
                      sizes="(max-width:768px) 90vw, 600px"
                    />
                  </div>
                </motion.div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {heroProducts.length > 1 && (
          <div className="hidden md:block">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )}
      </Carousel>

      {/* ===== DOTS ===== */}
      {heroProducts.length > 1 && (
        <div className="flex justify-center gap-3 mt-12 md:mt-20">
          {heroProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => api?.scrollTo(index)}
              className={`
                h-2.5 rounded-full transition-all duration-300
                ${
                  current === index
                    ? "w-8 bg-purple-600"
                    : "w-2.5 bg-gray-500/50 hover:bg-gray-400"
                }
              `}
            />
          ))}
        </div>
      )}
    </div>
  );
}
