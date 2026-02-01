import { fetchSingleMedicineDetails } from "@/actions/medicine.actions";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const { data, error } = await fetchSingleMedicineDetails(id);

  if (error || !data) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load medicine.
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      <Card className="overflow-hidden">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div className="relative w-full h-[350px] rounded-lg overflow-hidden border">
            <Image
              src={data.image}
              alt={data.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Details Section */}
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{data.name}</h1>

            <div className="flex items-center gap-3">
              <span className="text-2xl font-semibold text-green-600">
                ৳{data.price}
              </span>
              <Badge variant={data.stock > 0 ? "default" : "destructive"}>
                {data.stock > 0 ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>

            <p className="text-muted-foreground">{data.description}</p>

            <Separator />

            <div className="space-y-2 text-sm">
              <p>
                <span className="font-medium">Manufacturer:</span>{" "}
                {data.manufacturer}
              </p>
              <p>
                <span className="font-medium">Seller:</span> {data.seller?.name}
              </p>
              <p>
                <span className="font-medium">Categories:</span>{" "}
                {data.categories?.map((c: any) => c.name).join(", ")}
              </p>
            </div>

            <Separator />

            {/* Buttons */}
            <div className="flex gap-3 pt-2">
              <Button size="lg" className="w-full">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
