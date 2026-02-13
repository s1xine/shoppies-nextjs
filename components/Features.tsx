import { ShieldCheck, Star, Truck } from "lucide-react";
import React from "react";

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-2xl border shadow-sm">
      <div className="bg-primary/10 p-3 rounded-full mb-4">{icon}</div>
      <h4 className="font-semibold text-lg">{title}</h4>
      <p className="text-gray-500 text-sm mt-2">{desc}</p>
    </div>
  );
}

const Features = () => {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8">
        <Feature
          icon={<Truck />}
          title="Free Shipping"
          desc="Free shipping on all orders over $50"
        />
        <Feature
          icon={<ShieldCheck />}
          title="Secure Payments"
          desc="100% secure payment protection"
        />
        <Feature
          icon={<Star />}
          title="Top Quality"
          desc="Premium quality products guaranteed"
        />
      </div>
    </section>
  );
};

export default Features;
