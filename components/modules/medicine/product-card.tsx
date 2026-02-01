import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  description: string;
  manufacturer: string;
  sellerId: string;
  createdAt: string;
  updatedAt: string;
  categories: string[];
}

export function ProductCard({ product }: { product: Product }) {
  const inStock = product.stock > 0;

  return (
    <Card className="w-full max-w-sm overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden bg-gray-100">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle className="line-clamp-2">{product.name}</CardTitle>
            <CardDescription>{product.manufacturer}</CardDescription>
          </div>
          <Badge variant={inStock ? "default" : "destructive"}>
            {inStock ? "In Stock" : "Out of Stock"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 line-clamp-2">
          {product.description}
        </p>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Price
            </p>
            <p className="text-2xl font-bold text-green-600">
              ${product.price.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">
              Stock
            </p>
            <p className="text-2xl font-bold">
              {product.stock.toLocaleString()}
            </p>
          </div>
        </div>
        <div className="pt-2">
          <Link
            href={`/shop/${product.id}`}
            className="border-b-4 border-green-400
"
          >
            View Details
          </Link>
        </div>
        <div className="pt-2">
          <p className="text-xs text-gray-400">
            Last updated: {new Date(product.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
