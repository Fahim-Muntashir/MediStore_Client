import type { LucideIcon } from "lucide-react";
import {
  Thermometer,
  Stethoscope,
  Pill,
  Droplets,
  HeartPulse,
  Baby,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  name: string;
  description: string;
  icon: LucideIcon;
}

const categories: Category[] = [
  {
    name: "Fever & Pain",
    description: "Pain relievers, fever reducers, headache relief",
    icon: Thermometer,
  },
  {
    name: "Cold & Cough",
    description: "Cough syrups, lozenges, decongestants",
    icon: Stethoscope,
  },
  {
    name: "Vitamins & Supplements",
    description: "Multivitamins, minerals, herbal supplements",
    icon: Pill,
  },
  {
    name: "Skin Care",
    description: "Ointments, creams, antiseptic solutions",
    icon: Droplets,
  },
  {
    name: "Heart & Blood Pressure",
    description: "Cardiovascular health, BP monitors",
    icon: HeartPulse,
  },
  {
    name: "Baby Care",
    description: "Baby medicines, vitamins, health products",
    icon: Baby,
  },
];

export function CategoriesSection() {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            Browse by Category
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Find the right medicines for your needs. Browse our wide selection
            of verified healthcare products.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Card
                key={category.name}
                className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-primary/50 bg-card"
              >
                <CardContent className="p-6">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-secondary transition-colors group-hover:bg-primary">
                    <Icon className="h-7 w-7 text-primary transition-colors group-hover:text-primary-foreground" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-card-foreground">
                    {category.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
