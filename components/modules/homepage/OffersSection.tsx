"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Timer, Tag } from "lucide-react";
import Image from "next/image";

const offers = [
  {
    id: 1,
    title: "Flat 20% Off on First Order",
    code: "WELCOME20",
    description: "Use code at checkout to get instant discount on all OTC medicines.",
    image: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?q=80&w=500&auto=format&fit=crop",
    gradient: "from-blue-600 to-indigo-700"
  },
  {
    id: 2,
    title: "Baby Care Essentials - Extra 15% Off",
    code: "BABYCARE",
    description: "Wide range of baby products from top brands at unbeatable prices.",
    image: "https://images.unsplash.com/photo-1515488764276-beab76077981?q=80&w=500&auto=format&fit=crop",
    gradient: "from-emerald-600 to-teal-700"
  }
];

export function OffersSection() {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Exclusive Offers</h2>
            <p className="text-muted-foreground">Don't miss out on these limited time deals.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Timer className="h-4 w-4" />
            Ending Soon
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {offers.map((offer, index) => (
            <motion.div
              key={offer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${offer.gradient} text-white p-8 md:p-12 h-[300px] flex flex-col justify-center`}
            >
              <div className="relative z-10 max-w-[60%]">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold w-fit mb-4">
                  <Tag className="h-3 w-3" />
                  LIMITED OFFER
                </div>
                <h3 className="text-2xl md:text-3xl font-bold mb-3">{offer.title}</h3>
                <p className="text-white/80 mb-6 text-sm md:text-base">{offer.description}</p>
                <div className="flex items-center gap-4">
                  <div className="bg-white text-black px-4 py-2 rounded-lg font-mono font-bold">
                    {offer.code}
                  </div>
                  <Button variant="secondary" className="rounded-full">Shop Now</Button>
                </div>
              </div>
              <div className="absolute top-0 right-0 h-full w-1/2 opacity-40 mix-blend-overlay">
                <img 
                  src={offer.image} 
                  alt="" 
                  className="h-full w-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
