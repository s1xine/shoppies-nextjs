// "use client";

// import { useRouter } from "next/navigation";
// import { use, useState } from "react";
// import { Heart, ShoppingCart } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";
// import { Dialog, DialogContent } from "@/components/ui/dialog";
// import { useCartStore } from "@/store/cartStore";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { Product } from "@/types/product";

// interface Props {
//   params: Promise<{ id: string }>;
// }

// export default function ProductViewModal({ params }: Props) {
//   const router = useRouter();
//   const { id } = use(params); // 👈 unwrap promise
//   const productId = Number(id);

//   const product: Product | undefined = useCartStore((state) =>
//     state.getProduct(productId),
//   );

//   const [open, setOpen] = useState(true);
//   const [selectedImage, setSelectedImage] = useState<string>("");
//   const [wishlisted, setWishlisted] = useState<boolean>(false);

//   const handleClose = () => {
//     setOpen(false);
//     router.back();
//   };

//   if (!product) return null;

//   return (
//     <Dialog open={open} onOpenChange={handleClose}>
//       <DialogContent className="p-0 border-none bg-transparent shadow-none max-w-6xl">
//         <motion.div
//           initial={{ opacity: 0, scale: 0.96, y: 40 }}
//           animate={{ opacity: 1, scale: 1, y: 0 }}
//           exit={{ opacity: 0, scale: 0.96, y: 40 }}
//           transition={{ duration: 0.25, ease: "easeOut" }}
//           className="w-full h-[92vh] bg-background rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2"
//         >
//           {/* LEFT: IMAGES */}
//           <div className="bg-muted/40 p-6 flex flex-col gap-4">
//             <motion.div
//               key={selectedImage}
//               initial={{ opacity: 0.4, scale: 0.98 }}
//               animate={{ opacity: 1, scale: 1 }}
//               className="w-full aspect-square rounded-2xl overflow-hidden bg-background"
//             >
//               <Image
//                 src={selectedImage}
//                 alt="product"
//                 fill
//                 className="object-cover"
//               />
//             </motion.div>

//             <div className="grid grid-cols-4 gap-3">
//               {product.images?.map((img, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setSelectedImage(img)}
//                   className={`aspect-square rounded-xl overflow-hidden border transition ${
//                     selectedImage === img
//                       ? "border-primary"
//                       : "border-border hover:border-primary"
//                   }`}
//                 >
//                   <Image
//                     src={img}
//                     alt="thumb"
//                     width={200}
//                     height={200}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT: DETAILS */}
//           <div className="relative flex flex-col h-full">
//             <button
//               onClick={handleClose}
//               className="absolute right-4 top-4 z-10 rounded-full p-2 hover:bg-muted"
//             >
//               ✕
//             </button>

//             <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-6">
//               <div>
//                 <h1 className="text-3xl font-semibold tracking-tight">
//                   {product.title}
//                 </h1>
//                 <p className="text-2xl font-bold mt-2">₹{product.price}</p>
//               </div>

//               <div className="flex flex-col gap-3 pt-4">
//                 <Button size="lg" className="w-full text-base h-12 rounded-xl">
//                   <ShoppingCart className="mr-2" size={18} />
//                   Add to cart
//                 </Button>

//                 <Button
//                   variant={wishlisted ? "default" : "outline"}
//                   size="lg"
//                   onClick={() => setWishlisted(!wishlisted)}
//                   className="w-full text-base h-12 rounded-xl"
//                 >
//                   <Heart className="mr-2" size={18} />
//                   {wishlisted ? "Wishlisted" : "Add to wishlist"}
//                 </Button>
//               </div>

//               <Card className="p-4 rounded-xl">
//                 <div className="text-sm text-muted-foreground space-y-1">
//                   <p>✔ Free delivery</p>
//                   <p>✔ 7 day returns</p>
//                   <p>✔ Secure checkout</p>
//                 </div>
//               </Card>
//             </div>
//           </div>
//         </motion.div>
//       </DialogContent>
//     </Dialog>
//   );
// }

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const ProductViewModal = () => {
  return (
    <Dialog>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModal;
