"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";

export function NewsletterSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-primary rounded-[2.5rem] p-10 md:p-16 lg:p-20 text-primary-foreground text-center"
        >
          {/* Decorative shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md mb-8">
              <Mail className="h-8 w-8" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Stay Healthy & Stay Informed
            </h2>
            <p className="text-lg text-primary-foreground/80 mb-10 text-balance">
              Subscribe to our newsletter to receive the latest health tips, 
              medicine alerts, and exclusive discounts right in your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Enter your email address" 
                className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/60 rounded-xl focus-visible:ring-white/50"
              />
              <Button size="lg" className="h-14 px-8 bg-white text-primary hover:bg-white/90 rounded-xl gap-2 font-bold shrink-0">
                Subscribe Now
                <Send className="h-4 w-4" />
              </Button>
            </form>
            <p className="mt-6 text-sm text-primary-foreground/60">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
