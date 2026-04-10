import { Logo, LogoImage, LogoText } from "@/components/logo";
import Link from "next/link";
import { Facebook, Instagram, Pill, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";

interface MenuItem {
  title: string;
  links: {
    text: string;
    url: string;
  }[];
}

interface Footer2Props {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  className?: string;
  tagline?: string;
  menuItems?: MenuItem[];
  copyright?: string;
  bottomLinks?: {
    text: string;
    url: string;
  }[];
}

const Footer2 = ({
  logo = {
    src: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/block-1.svg",
    alt: "blocks for shadcn/ui",
    title: "Shadcnblocks.com",
    url: "https://www.shadcnblocks.com",
  },
  className,
  tagline = "Your Trusted Online Pharmacy - Delivering Health to Your Doorstep.",
  menuItems = [
    {
      title: "Shop",
      links: [
        { text: "All Medicines", url: "/shop" },
        { text: "Prescriptions", url: "/shop?type=prescription" },
        { text: "Wellness", url: "/shop?category=wellness" },
        { text: "Personal Care", url: "/shop?category=personal-care" },
      ],
    },
    {
      title: "Company",
      links: [
        { text: "About Us", url: "/about" },
        { text: "Contact", url: "/contact" },
        { text: "Our Blog", url: "/blog" },
        { text: "Careers", url: "/about" },
      ],
    },
    {
      title: "Support",
      links: [
        { text: "Help Center", url: "/contact" },
        { text: "Shipping Info", url: "/contact" },
        { text: "Returns", url: "/contact" },
        { text: "FAQs", url: "/contact" },
      ],
    },
    {
      title: "Contact Info",
      links: [
        { text: "support@medistore.com", url: "mailto:support@medistore.com" },
        { text: "+1 (555) 123-4567", url: "tel:+15551234567" },
        { text: "123 Health Ave, NY", url: "https://maps.google.com" },
      ],
    },
  ],
  copyright = `© ${new Date().getFullYear()} MediStore Inc. All rights reserved.`,
  bottomLinks = [
    { text: "Terms of Service", url: "/terms" },
    { text: "Privacy Policy", url: "/privacy" },
    { text: "Cookies", url: "/privacy" },
  ],
}: Footer2Props) => {
  return (
    <section className={cn("py-32 px-10", className)}>
      <div className="container mx-auto">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <Link href="/" className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                    <Pill className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <span className="text-xl font-bold text-foreground">
                    MediStore
                  </span>
                </Link>
              </div>
              <p className="mt-4 font-bold">{tagline}</p>
            </div>
            {menuItems.map((section, sectionIdx) => (
              <div key={sectionIdx}>
                <h3 className="mb-4 font-bold">{section.title}</h3>
                <ul className="space-y-4 text-muted-foreground">
                  {section.links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="font-medium hover:text-primary"
                    >
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t pt-8 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, linkIdx) => (
                <li key={linkIdx} className="underline hover:text-primary">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 flex justify-center gap-6">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook className="h-6 w-6" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram className="h-6 w-6" />
            </a>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer2 };
