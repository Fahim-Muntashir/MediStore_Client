"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "Do I need a prescription to order medicines?",
    answer: "No, MediStore primarily sells Over-The-Counter (OTC) medicines that do not require a prescription. For prescription-only medicines, we recommend consulting a local pharmacist or doctor."
  },
  {
    question: "How long does delivery take?",
    answer: "Typically, orders are delivered within 24-48 hours in major cities. Remote areas may take 3-5 business days."
  },
  {
    question: "Is cash on delivery available?",
    answer: "Yes, we support Cash on Delivery (COD) for all orders. You can pay when you receive your package."
  },
  {
    question: "Can I return medicines if they are damaged?",
    answer: "Yes, we have a strict return policy for damaged or incorrect items. Please check the items upon delivery and contact our support immediately."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order is placed, you can track its status in the 'My Orders' section of your dashboard."
  }
];

export function FAQSection() {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground">Find answers to common questions about our services and policies.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-card border rounded-2xl p-6 md:p-8"
          >
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b last:border-0 border-border">
                  <AccordionTrigger className="text-left font-semibold py-4 hover:no-underline hover:text-primary transition-colors">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
