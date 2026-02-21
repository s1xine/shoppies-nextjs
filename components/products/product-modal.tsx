"use client";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useEffect, useState } from "react";
const ProductViewModalClient = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, []);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      if (window.history.length > 1) {
        setOpen(false);
        router.back();
      } else router.push("/");
    }
  };
  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent
        className="
        p-0 overflow-hidden rounded-2xl w-[96vw] max-w-[1200px] min-[1300px]:max-w-[1350px] xl:max-w-[1400px] 2xl:max-w-[1700px] 3xl:max-w-[1900px] max-h-[92vh] overflow-y-auto"
      >
        <DialogTitle className="hidden">Product</DialogTitle>

        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewModalClient;
