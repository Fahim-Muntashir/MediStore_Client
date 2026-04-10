import React from "react";
import { Gavel, CheckCircle2, AlertTriangle, Scale } from "lucide-react";

const TermsPage = () => {
  return (
    <div className="bg-background min-h-screen py-20">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <div className="h-20 w-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Gavel className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl font-black mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">Please read these terms carefully before using MediStore.</p>
        </div>

        <div className="space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              1. Acceptance of Terms
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using MediStore, you agree to comply with and be bound by these Terms of Service. 
              If you do not agree, please refrain from using our services. We reserve the right to update these 
              terms at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Scale className="h-6 w-6 text-primary" />
              2. Prescription Policy
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Medicines classified as prescription-only require a valid prescription from a registered healthcare 
              provider. MediStore will verify all prescriptions before dispensing such medications. Providing 
              fraudulent prescriptions is a violation of law and our terms.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-primary" />
              3. Medical Disclaimer
            </h2>
            <div className="p-6 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
              <strong>DISCLAIMER:</strong> The information provided on MediStore is for educational purposes only 
              and is not intended as a substitute for professional medical advice, diagnosis, or treatment. 
              Always seek the advice of your physician or other qualified health provider.
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold">4. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              MediStore shall not be liable for any indirect, incidental, special, consequential, or punitive 
              damages resulting from your use of the service or any medications purchased through the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
