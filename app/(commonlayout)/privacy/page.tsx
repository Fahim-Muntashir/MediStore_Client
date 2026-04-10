import React from "react";
import { Shield, FileText, Lock, Globe, Mail } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">Last Updated: May 12, 2024</p>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <FileText className="h-6 w-6 text-primary" />
              1. Information We Collect
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              At MediStore, we collect information to provide better services to all our users. This includes 
              personal details like your name, email address, physical address for delivery, and payment information. 
              We also collect data related to your health history and prescriptions to ensure medical accuracy.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Lock className="h-6 w-6 text-primary" />
              2. How We Use Information
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information we collect to maintain and improve our services, process your orders, 
              provide customer support, and ensure your health and safety. We never sell your personal or 
              medical information to third parties.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Processing and delivering your medicine orders</li>
              <li>Verifying prescriptions with healthcare providers</li>
              <li>Sending order updates and health-related information</li>
              <li>Improving user experience on our platform</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Globe className="h-6 w-6 text-primary" />
              3. Information Sharing
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We share your information with third-party service providers only as necessary for delivery, 
              payment processing, and prescription verification. All partners are required to maintain strict 
              confidentiality and security standards.
            </p>
          </section>

          <section className="p-8 rounded-3xl bg-secondary/30 border border-secondary text-center space-y-4">
            <h3 className="text-xl font-bold">Have questions about your privacy?</h3>
            <p className="text-muted-foreground">Our data protection officer is available to help you.</p>
            <div className="flex justify-center gap-2 font-bold text-primary">
              <Mail className="h-5 w-5" />
              privacy@medistore.com
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
