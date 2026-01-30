import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    review:
      "MediStore has been a lifesaver! I ordered my monthly medications and they arrived the next day. The packaging was secure and the products were 100% genuine.",
    avatar: "PS",
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    location: "Delhi",
    rating: 5,
    review:
      "Excellent service and competitive prices. I've been ordering vitamins and supplements for my family for over a year now. Highly recommended!",
    avatar: "RK",
  },
  {
    id: 3,
    name: "Anita Desai",
    location: "Bangalore",
    rating: 5,
    review:
      "The customer support team is incredibly helpful. They guided me through the entire process and even helped me find alternatives when a product was out of stock.",
    avatar: "AD",
  },
  {
    id: 4,
    name: "Mohammed Ali",
    location: "Hyderabad",
    rating: 4,
    review:
      "Fast delivery and genuine products. The app is easy to use and I love the regular discounts they offer. Will definitely continue using MediStore.",
    avatar: "MA",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating
              ? "fill-amber-400 text-amber-400"
              : "fill-muted text-muted"
          }`}
        />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-card py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl text-balance">
            What Our Customers Say
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground text-pretty">
            Join thousands of satisfied customers who trust MediStore for their
            healthcare needs
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="relative overflow-hidden border-border/50 transition-shadow duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <Quote className="absolute right-4 top-4 h-8 w-8 text-primary/10" />
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <StarRating rating={testimonial.rating} />
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {testimonial.review}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">50,000+</p>
            <p className="text-sm text-muted-foreground">Happy Customers</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <p className="text-3xl font-bold text-primary">4.8/5</p>
            <p className="text-sm text-muted-foreground">Average Rating</p>
          </div>
          <div className="h-12 w-px bg-border" />
          <div>
            <p className="text-3xl font-bold text-primary">98%</p>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
          </div>
        </div>
      </div>
    </section>
  );
}
