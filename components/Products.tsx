"use client ";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";

const Products = () => {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <h3 className="text-3xl font-bold text-center mb-12 dark:text-black">
          Featured Products
        </h3>

        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <Card key={item} className="hover:shadow-xl transition">
              <CardContent className="p-4">
                <Image
                  src={`https://picsum.photos/400/300?random=${item}`}
                  alt={`ProductImage ${item}`}
                  width={400}
                  height={300}
                  className="rounded-xl mb-4"
                />

                <h4 className="font-semibold">Premium Hoodie</h4>
                <p className="text-gray-500 text-sm">$79.99</p>

                <Button className="w-full mt-4">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
