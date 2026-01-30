import { CategoriesSection } from "@/components/modules/homepage/category-section";
import { HeroSection } from "@/components/modules/homepage/hero";
import { TestimonialsSection } from "@/components/modules/homepage/testimonials";
import { WhyChooseSection } from "@/components/modules/homepage/WhyChooseSection";

export default async function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <CategoriesSection />
      <WhyChooseSection />
      <TestimonialsSection />
    </div>
  );
}
