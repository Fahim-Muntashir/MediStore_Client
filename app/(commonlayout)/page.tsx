import { CategoriesSection } from "@/components/modules/homepage/category-section";
import { HeroSection } from "@/components/modules/homepage/hero";
import { WhyChooseSection } from "@/components/modules/homepage/WhyChooseSection";

export default async function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <CategoriesSection />
      <WhyChooseSection />
    </div>
  );
}
