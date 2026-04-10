"use client";

import React, { useState, useEffect } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Eye, Trash2, ShieldCheck, AlertCircle, Star } from "lucide-react";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { toggleMedicineFeatured } from "@/actions/medicine.actions";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const AllMedicinesTable = ({ medicines: initialMedicines }: { medicines: any[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState(initialMedicines);

  // Sync state if props change
  useEffect(() => {
    setMedicines(initialMedicines);
  }, [initialMedicines]);

  const filtered = medicines.filter(m => 
    m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    m.category?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;
    const toastId = toast.loading(newStatus ? "Adding to featured..." : "Removing from featured...");
    
    try {
      const { error } = await toggleMedicineFeatured(id, newStatus);
      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        setMedicines(prev => prev.map(m => m.id === id ? { ...m, isFeatured: newStatus } : m));
        toast.success(newStatus ? "Featured successfully!" : "Removed from featured", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input 
          placeholder="Search all medicines by name or category..." 
          className="pl-10 h-12 rounded-2xl bg-secondary/30 border-none"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="rounded-3xl border overflow-hidden bg-card shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/10 hover:bg-secondary/10 border-none">
              <TableHead className="px-6 font-black">Medicine</TableHead>
              <TableHead className="font-black">Category</TableHead>
              <TableHead className="font-black">Price</TableHead>
              <TableHead className="font-black">Stock</TableHead>
              <TableHead className="font-black">Seller</TableHead>
              <TableHead className="text-right px-6 font-black">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length > 0 ? (
              filtered.map((m) => (
                <TableRow key={m.id} className="hover:bg-secondary/5 border-b border-secondary/20 transition-colors">
                  <TableCell className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg relative overflow-hidden bg-secondary shadow-sm">
                        {m.image && <Image src={m.image} alt="" fill className="object-cover" />}
                      </div>
                      <div>
                        <p className="font-bold text-sm tracking-tight">{m.name}</p>
                        <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{m.manufacturer}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="rounded-full bg-background/50">{m.category?.name || "Uncategorized"}</Badge>
                  </TableCell>
                  <TableCell className="font-bold text-primary">${m.price.toFixed(2)}</TableCell>
                  <TableCell>
                    {m.stock > 10 ? (
                      <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 rounded-full border-emerald-200">{m.stock} in stock</Badge>
                    ) : (
                      <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 rounded-full border-amber-200">{m.stock} low stock</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-xs font-medium">
                    <span className="bg-primary/5 text-primary px-2 py-1 rounded-md">{m.seller?.name || "System"}</span>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-1">
                       <Button 
                         onClick={() => handleToggleFeatured(m.id, m.isFeatured)}
                         variant="ghost" 
                         size="icon" 
                         className={cn(
                           "rounded-xl transition-all",
                           m.isFeatured ? "text-yellow-500 bg-yellow-50" : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
                         )}
                         title={m.isFeatured ? "Unfeature" : "Feature"}
                       >
                         <Star className={cn("h-4 w-4", m.isFeatured && "fill-current")} />
                       </Button>
                       <Button variant="ghost" size="icon" className="rounded-xl transition-all hover:bg-primary/10"><Eye className="h-4 w-4" /></Button>
                       <Button variant="ghost" size="icon" className="rounded-xl text-destructive transition-all hover:bg-destructive/10"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">No medicines match your search.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
