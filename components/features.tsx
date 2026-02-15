import {
  HandCoins,
  IndianRupeeIcon,
  ShieldCheck,
  Star,
  Truck,
} from "lucide-react";
import React from "react";

function Feature({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex flex-col items-center text-center p-3">
      <div
        className="
      bg-white/20 dark:bg-black/30 
      backdrop-blur-md 
      p-3 rounded-full mb-3
      border border-white/20 dark:border-white/10
      "
      >
        {icon}
      </div>

      <h4 className="font-semibold text-sm md:text-base">{title}</h4>
    </div>
  );
}

const Features = () => {
  return (
    <div
      className="bg-linear-to-r
      from-violet-500 via-purple-500 to-purple-700
      dark:from-[#140f2d] dark:via-[#1f1147] dark:to-[#0c0820]
      text-white
      px-6 md:px-10 py-6
      "
    >
      <section className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          <Feature
            icon={
              <Truck className="text-white dark:text-violet-400" size={22} />
            }
            title="Free Shipping"
          />

          <Feature
            icon={
              <ShieldCheck
                className="text-white dark:text-green-400"
                size={22}
              />
            }
            title="Secure Payments"
          />

          <Feature
            icon={<Star className="text-white dark:text-amber-400" size={22} />}
            title="Top Quality"
          />

          <Feature
            icon={
              <IndianRupeeIcon
                className="text-white dark:text-blue-400"
                size={22}
              />
            }
            title="Cash on Delivery"
          />

          <Feature
            icon={
              <HandCoins className="text-white dark:text-red-400" size={22} />
            }
            title="Easy Returns"
          />
        </div>
      </section>
    </div>
  );
};

export default Features;
