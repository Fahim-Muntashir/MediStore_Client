"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin, MessageSquare, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <section className="bg-secondary/30 py-20 border-b">
        <div className="container px-4 mx-auto text-center">
          <h1 className="text-5xl font-black mb-4">Get in Touch</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Have questions about your prescription or order? Our pharmacists and support team are here to help.
          </p>
        </div>
      </section>

      <div className="container px-4 mx-auto py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-3xl font-bold mb-4">Send us a Message</h2>
              <p className="text-muted-foreground">Fill out the form below and we'll get back to you within 24 hours.</p>
            </div>

            <form className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="first-name">First Name</Label>
                  <Input id="first-name" placeholder="John" className="h-12 rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="last-name">Last Name</Label>
                  <Input id="last-name" placeholder="Doe" className="h-12 rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="john@example.com" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Order Status" className="h-12 rounded-xl" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">How can we help?</Label>
                <Textarea id="message" placeholder="Type your message here..." className="min-h-[150px] rounded-2xl p-4" />
              </div>
              <Button size="lg" className="w-full h-14 rounded-2xl font-bold text-lg spotlight shadow-lg">
                Send Message
              </Button>
            </form>
          </motion.div>

          {/* Info Side */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-3xl bg-secondary/30 border border-secondary space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl">Email Us</h3>
                <p className="text-muted-foreground text-sm">Our team typically responds in less than 2 hours.</p>
                <p className="font-bold text-primary">support@medistore.com</p>
              </div>
              <div className="p-8 rounded-3xl bg-secondary/30 border border-secondary space-y-4">
                <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-xl">Call Us</h3>
                <p className="text-muted-foreground text-sm">Available Mon-Fri from 8am to 8pm EST.</p>
                <p className="font-bold text-primary">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-secondary/30 border border-secondary space-y-6">
              <h3 className="font-bold text-2xl">Visit our Pharmacy</h3>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold">New York Headquarters</p>
                    <p className="text-muted-foreground text-sm">123 Health Ave, Suite 400, New York, NY 10001</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Clock className="h-5 w-5 text-primary shrink-0" />
                  <div>
                    <p className="font-bold">Operating Hours</p>
                    <p className="text-muted-foreground text-sm">Monday - Sunday: 24/7 (Emergency Shop)</p>
                  </div>
                </div>
              </div>
              
              <div className="pt-6 border-t border-secondary">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-600">
                  <ShieldCheck className="h-5 w-5" />
                  MediStore Verified Pharmacy
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-primary text-primary-foreground">
              <div className="flex items-center gap-4 mb-4">
                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold">Live Chat</h3>
              </div>
              <p className="opacity-80 mb-6">Need instant help? Our health experts are online now to chat with you about your needs.</p>
              <Button variant="secondary" className="w-full h-12 rounded-xl bg-white text-primary hover:bg-white/90 font-bold">
                Start Chatting
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
