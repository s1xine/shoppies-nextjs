"use client";

import { motion } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Product } from "@/types/product";
import { useRef } from "react";
import currencyIndianRupee from "@/utils/currency";
import { useRouter } from "next/navigation";

export default function HeroCarousel({
  heroProducts,
}: {
  heroProducts: Product[];
}) {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  const router = useRouter();

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
      opts={{ loop: true }}
      className="w-full"
    >
      <CarouselContent className=" flex items-center">
        {heroProducts.map((product, index) => (
          <CarouselItem key={index}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center px-4 md:px-10">
              {/* LEFT TEXT */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-7 order-2 lg:order-1"
              >
                <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-white">
                  {product.title}
                </h1>

                <p className="text-lg text-gray-400 max-w-md line-clamp-3 min-h-[72px]">
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
                    onClick={() => router.push(`products/${product.slug}`)}
                  >
                    Learn more
                  </Button>
                </div>
              </motion.div>

              {/* RIGHT IMAGE */}
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

      <CarouselPrevious className="-left-6 md:-left-10 bg-white/10 border-none text-white hover:bg-white/20" />
      <CarouselNext className="-right-6 md:-right-10 bg-white/10 border-none text-white hover:bg-white/20" />
    </Carousel>
  );
}
