import { Shield, Clock, BadgeCheck, Headphones } from "lucide-react";

const features = [
  {
    icon: BadgeCheck,
    title: "Verified Sellers Only",
    description:
      "We only partner with licensed and verified pharmacies to ensure authenticity of all medicines.",
  },
  {
    icon: Clock,
    title: "Fast Delivery",
    description:
      "Get your medicines delivered within 24-48 hours. Express delivery available for urgent needs.",
  },
  {
    icon: Shield,
    title: "100% Genuine Products",
    description:
      "All products are sourced directly from manufacturers with proper quality certifications.",
  },
  {
    icon: Headphones,
    title: "24/7 Customer Support",
    description:
      "Our healthcare experts are available round the clock to assist with your queries.",
  },
];

export function WhyChooseSection() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Why Choose MediStore?
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            We are committed to providing you with the best healthcare
            experience with quality medicines and reliable service.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="group text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-lg transition-transform group-hover:scale-110">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
