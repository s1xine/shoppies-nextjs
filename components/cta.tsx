"use client";
import { redirect } from "next/navigation";
import { Button } from "./ui/button";

const CTA = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto text-center px-6">
        <h3 className="text-4xl font-bold">Join 50,000+ Happy Customers</h3>
        <p className="text-gray-600 mt-4">
          Get exclusive deals and discounts straight to your inbox.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            onClick={() => redirect("/products")}
            className="rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 dark:text-white"
            size="lg"
          >
            Start Shopping
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
