"use client";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const ContinueShoppingButton = () => {
  const router = useRouter();
  return (
    <Button
      onClick={() => router.push("/products")}
      className="rounded-full bg-purple-600 hover:bg-purple-700 transition-all duration-200 dark:text-white"
      size="lg"
    >
      Start Shopping
    </Button>
  );
};

export default ContinueShoppingButton;
