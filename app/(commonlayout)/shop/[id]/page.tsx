import { fetchSingleMedicineDetails, fetchAllMedicines } from "@/actions/medicine.actions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Star, 
  ShoppingCart, 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Pill,
  CheckCircle2,
  Info
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductGridSection } from "@/components/modules/homepage/ProductGridSection";

export default async function MedicinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await fetchSingleMedicineDetails(id);
  const { data: relatedData } = await fetchAllMedicines({ category: data?.categories?.[0]?.name });
  const relatedMedicines = Array.isArray(relatedData) ? relatedData.filter((m: any) => m.id !== id).slice(0, 4) : [];

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="bg-destructive/10 p-6 rounded-full inline-block">
            <Info className="h-10 w-10 text-destructive" />
          </div>
          <h2 className="text-2xl font-bold">Medicine Not Found</h2>
          <p className="text-muted-foreground">The product you are looking for does not exist or has been removed.</p>
          <Button asChild><Link href="/shop">Back to Shop</Link></Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Breadcrumbs */}
      <div className="border-b bg-secondary/10">
        <div className="container mx-auto px-4 py-4 flex items-center gap-2 text-sm text-muted-foreground">
          <span>Home</span> / <span>Shop</span> / <span className="text-foreground font-medium">{data.name}</span>
        </div>
      </div>

      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Images */}
          <div className="lg:col-span-7 space-y-6">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border bg-secondary/30 group">
              <Image
                src={data.image}
                alt={data.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
              <div className="absolute top-4 right-4 flex flex-col gap-2">
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg backdrop-blur-md bg-white/80">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="secondary" className="rounded-full shadow-lg backdrop-blur-md bg-white/80">
                  <Share2 className="h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Thumbnails (Simulated) */}
            <div className="grid grid-cols-4 gap-4">
              {[data.image, data.image, data.image, data.image].map((img, i) => (
                <div key={i} className={`relative aspect-square rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${i === 0 ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"}`}>
                  <Image src={img} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>

            <Tabs defaultValue="description" className="w-full pt-8">
              <TabsList className="bg-secondary/50 p-1 rounded-xl h-12 w-full justify-start gap-4 px-4 overflow-x-auto">
                <TabsTrigger value="description" className="rounded-lg px-6 font-bold">Description</TabsTrigger>
                <TabsTrigger value="dosage" className="rounded-lg px-6 font-bold">Dosage & Use</TabsTrigger>
                <TabsTrigger value="side-effects" className="rounded-lg px-6 font-bold">Side Effects</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-lg px-6 font-bold">Reviews (4)</TabsTrigger>
              </TabsList>
              
              <div className="pt-6">
                <TabsContent value="description" className="space-y-4">
                  <h3 className="text-xl font-bold">Product Information</h3>
                  <p className="text-muted-foreground leading-relaxed">{data.description}</p>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="p-4 rounded-2xl bg-secondary/30">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Manufacturer</p>
                      <p className="font-bold">{data.manufacturer}</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-secondary/30">
                      <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1">Category</p>
                      <p className="font-bold">{data.categories?.[0]?.name || "N/A"}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="dosage" className="space-y-4">
                  <h3 className="text-xl font-bold">Dosage Guidelines</h3>
                  <ul className="space-y-3">
                    {[
                      "Take one tablet daily with water.",
                      "Best taken after meals for maximum absorption.",
                      "Do not exceed the recommended daily dose.",
                      "Consult your physician if symptoms persist."
                    ].map((step, i) => (
                      <li key={i} className="flex gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                        <span className="text-muted-foreground">{step}</span>
                      </li>
                    ))}
                  </ul>
                </TabsContent>

                <TabsContent value="reviews" className="space-y-8">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl font-black">4.8</div>
                      <div>
                        <div className="flex text-amber-500">
                          {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                        </div>
                        <p className="text-sm text-muted-foreground">Based on 124 reviews</p>
                      </div>
                    </div>
                    <Button variant="outline">Write a Review</Button>
                  </div>
                  
                  <Separator />
                  
                  {/* Sample Review */}
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-3">
                        <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center font-bold">JS</div>
                        <div>
                          <p className="font-bold">John Smith</p>
                          <div className="flex text-amber-500">
                            {[1,2,3,4,5].map(s => <Star key={s} className="h-3 w-3 fill-current" />)}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">2 days ago</span>
                    </div>
                    <p className="text-muted-foreground">Very effective medicine. I started feeling better within a few hours. Fast delivery as well!</p>
                  </div>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Column: Order Card */}
          <div className="lg:col-span-5">
            <div className="sticky top-24 space-y-6">
              <Card className="rounded-[2rem] border-2 shadow-xl overflow-hidden">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex text-amber-500">
                        {[1,2,3,4,5].map(s => <Star key={s} className="h-4 w-4 fill-current" />)}
                      </div>
                      <span className="text-sm font-bold">(4.8 / 5)</span>
                    </div>
                    <h1 className="text-3xl font-black mb-2">{data.name}</h1>
                    <p className="text-sm text-muted-foreground">By {data.manufacturer}</p>
                  </div>

                  <div className="flex items-baseline gap-3 mb-8">
                    <span className="text-4xl font-black text-primary">${data.price.toFixed(2)}</span>
                    <span className="text-lg text-muted-foreground line-through">${(data.price * 1.5).toFixed(2)}</span>
                    <Badge variant="outline" className="ml-auto bg-primary/10 text-primary border-primary/20 rounded-full px-3">SAVE 33%</Badge>
                  </div>

                  <div className="p-4 rounded-2xl bg-secondary/30 border border-secondary mb-8">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Availability</span>
                      <Badge variant={data.stock > 0 ? "default" : "destructive"} className="rounded-full">
                        {data.stock > 0 ? `${data.stock} In Stock` : "Out of Stock"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Order in the next 3h 24m for same day delivery</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <Button size="lg" className="h-14 rounded-2xl font-bold text-lg spotlight shadow-lg group">
                      <ShoppingCart className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                      Add to Cart
                    </Button>
                    <Button size="lg" variant="outline" className="h-14 rounded-2xl font-bold bg-secondary/10 border-none hover:bg-secondary/30">
                      Order via Phone
                    </Button>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Truck className="h-5 w-5 text-primary" />
                      <span>Fast & Safe Doorstep Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <ShieldCheck className="h-5 w-5 text-primary" />
                      <span>100% Genuine Pharmacy Products</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <RotateCcw className="h-5 w-5 text-primary" />
                      <span>7 Days Reliable Return Policy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card className="rounded-2xl border bg-secondary/20 p-6 flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-bold">Sold By</p>
                  <p className="font-bold text-lg">{data.seller?.name || "MediStore Verified"}</p>
                </div>
                <Button variant="ghost" size="icon" className="ml-auto rounded-full">
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </Card>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedMedicines.length > 0 && (
          <div className="mt-24 border-t pt-24">
            <ProductGridSection 
              title="Related Medicines" 
              subtitle="You might also be interested in these products."
              products={relatedMedicines}
              className="py-0"
            />
          </div>
        )}
      </main>
    </div>
  );
}

import { ChevronRight, User } from "lucide-react";
import Link from "next/link";
