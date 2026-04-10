"use client";

import React from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import { Button } from "../../ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-32 overflow-hidden bg-background min-h-[calc(100vh-80px)] flex items-center">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase mb-6 border border-primary/20">
                Your Health, Our Priority
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black text-foreground mb-6 leading-[1.1] tracking-tight"
            >
              Get Trusted Medicines <br className="hidden md:block"/> <span className="text-primary">Delivered Fast</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed"
            >
              Explore a wide range of OTC medicines and healthcare products from verified sellers. 100% Genuine, delivered straight to your doorstep.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 mb-4"
            >
              <Button asChild size="lg" className="h-14 px-10 rounded-full font-bold text-lg spotlight shadow-lg transition-transform hover:scale-105">
                <Link href="/shop">
                  Shop Medicines
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-14 px-10 rounded-full font-bold text-lg transition-all">
                <Link href="/shop">
                  View Offers
                </Link>
              </Button>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl border bg-secondary/20 aspect-square md:aspect-auto md:h-[600px] w-full">
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=1000&auto=format&fit=crop"
                alt="Pharmacy Medicines"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element behind image */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/30 to-emerald-400/30 rounded-[2.5rem] -z-10 blur-xl opacity-70" />
          </motion.div>

        </div>
      </div>

      <div className="absolute top-20 left-10 w-96 h-96 bg-primary/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-50" />
    </section>
  );
}
