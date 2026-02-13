"use client";
import { Button } from "./ui/button";
import Image from "next/image";

const HeroSection = () => {
  return (
    <section className="bg-linear-to-r from-gray-50 to-gray-100  ">
      <div className="container mx-auto grid md:grid-cols-2 gap-10 px-6 py-20 items-center">
        <div>
          <h2 className="text-5xl font-bold leading-tight dark:text-black">
            Discover Your{" "}
            <span className="text-primary  dark:text-black">Perfect Style</span>
          </h2>
          <p className="mt-6 text-gray-600 text-lg">
            Shop the latest trends with unbeatable prices and fast delivery.
            Premium quality products curated just for you.
          </p>

          <div className="mt-8 flex gap-4">
            <Button size="lg" variant="default">
              Shop Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="dark:text-black dark:bg-amber-300 dark:hover:bg-amber-400"
            >
              View Collection
            </Button>
          </div>
        </div>

        <div className="relative w-full max-w-md h-100">
          <Image
            src="https://images.unsplash.com/photo-1607082349566-187342175e2f"
            alt="shopping"
            fill
            className="rounded-2xl shadow-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
