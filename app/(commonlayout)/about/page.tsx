import React from "react";
import Image from "next/image";
import { Pill, ShieldCheck, Truck, Users, Award, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1587854692152-cbe660dbbb88?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
            alt="Pharmacy"
            fill
            className="object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <Pill className="h-8 w-8" />
          </div>
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
            We are <span className="text-primary">MediStore</span>
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-muted-foreground leading-relaxed">
            Revolutionizing healthcare accessibility by bringing your pharmacy to your fingertips. 
            Safe, reliable, and always here for you.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 bg-secondary/20">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                At MediStore, our mission is to provide seamless access to high-quality healthcare products. 
                We believe that obtaining essential medicine should be simple, transparent, and affordable 
                for everyone, regardless of where they live.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <ShieldCheck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold">100% Genuine</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Truck className="h-5 w-5 text-primary" />
                  </div>
                  <span className="font-bold">Fast Delivery</span>
                </div>
              </div>
            </div>
            <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <Image 
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Pharmacist"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="container px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Core Values</h2>
            <p className="text-muted-foreground">The principles that guide everything we do at MediStore.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Quality Guaranteed", 
                desc: "Every product we sell undergoes rigorous quality checks to ensure your safety.",
                icon: Award
              },
              { 
                title: "Customer First", 
                desc: "Our support team and pharmacists are available 24/7 to help you with your health needs.",
                icon: Heart
              },
              { 
                title: "Leading Innovation", 
                desc: "We use state-of-the-art technology to make healthcare management easy and efficient.",
                icon: Users
              }
            ].map((value, i) => (
              <div key={i} className="p-8 rounded-3xl bg-secondary/30 border border-secondary hover:border-primary/50 transition-all group">
                <div className="h-14 w-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
