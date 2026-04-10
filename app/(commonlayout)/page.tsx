import { CategoriesSection } from "@/components/modules/homepage/category-section";
import { HeroSection } from "@/components/modules/homepage/hero";
import { TestimonialsSection } from "@/components/modules/homepage/testimonials";
import { WhyChooseSection } from "@/components/modules/homepage/WhyChooseSection";
import { StatisticsSection } from "@/components/modules/homepage/StatisticsSection";
import { FAQSection } from "@/components/modules/homepage/FAQSection";
import { NewsletterSection } from "@/components/modules/homepage/NewsletterSection";
import { BlogPreviewSection } from "@/components/modules/homepage/BlogPreviewSection";
import { OffersSection } from "@/components/modules/homepage/OffersSection";
import { ProductGridSection } from "@/components/modules/homepage/ProductGridSection";
import { medicineService } from "@/services/medicine.service";

export default async function Home() {
  const { data: allMedicines } = await medicineService.getAllMedicines();
  const { data: featuredData } = await medicineService.getFeaturedMedicines();
  const { data: popularData } = await medicineService.getPopularMedicines();
  
  // Safely handle potential error or empty data
  const medicines = Array.isArray(allMedicines) ? allMedicines : [];
  const featuredMedicines = Array.isArray(featuredData) ? featuredData : [];
  const popularMedicines = Array.isArray(popularData) ? popularData : [];

  return (
    <div className="flex flex-col gap-0">
      <HeroSection />
      
      <div className="space-y-0">
        <CategoriesSection />
        
        <ProductGridSection 
          title="Featured Medicines" 
          subtitle="Handpicked essential medicines for your daily needs."
          products={featuredMedicines} 
          className="bg-secondary/20"
        />

        <WhyChooseSection />

        <ProductGridSection 
          title="Popular Products" 
          subtitle="Top selling products trusted by our customers."
          products={popularMedicines} 
        />

        <OffersSection />
        
        <StatisticsSection />
        
        <TestimonialsSection />
        
        <BlogPreviewSection />
        
        <FAQSection />
        
        <NewsletterSection />
      </div>
    </div>
  );
}
