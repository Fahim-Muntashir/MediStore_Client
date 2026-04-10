"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search, Trash2, Edit2, LayoutGrid, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { getAllCategories, createCategoryAction, updateCategoryAction, deleteCategoryAction } from "@/actions/admin.action";
import { NMImageUpload } from "@/components/ui/nm-image-upload";

export const CategoryManagement = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);

  // Form states (Add)
  const [newCatName, setNewCatName] = useState("");
  const [newCatImage, setNewCatImage] = useState<File | null>(null);

  // Edit Form states
  const [editOpen, setEditOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [editCatName, setEditCatName] = useState("");
  const [editCatImage, setEditCatImage] = useState<File | null>(null);

  const loadCategories = async () => {
    setIsLoading(true);
    const { data } = await getAllCategories();
    if (data) setCategories(data);
    setIsLoading(false);
  };

  const handleCreateCategory = async () => {
    if (!newCatName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsCreating(true);
    const toastId = toast.loading("Creating category...");

    try {
      const formData = new FormData();
      formData.append("name", newCatName);
      if (newCatImage) {
        formData.append("image", newCatImage);
      }

      const { error } = await createCategoryAction(formData);

      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.success("Category created successfully!", { id: toastId });
        setNewCatName("");
        setNewCatImage(null);
        setOpen(false);
        loadCategories();
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsCreating(false);
    }
  };

  const handleUpdateCategory = async () => {
    if (!editCatName.trim()) {
      toast.error("Category name is required");
      return;
    }

    setIsCreating(true);
    const toastId = toast.loading("Updating category...");

    try {
      const formData = new FormData();
      formData.append("name", editCatName);
      if (editCatImage) {
        formData.append("image", editCatImage);
      }

      const { error } = await updateCategoryAction(editingCategory.id, formData);

      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.success("Category updated successfully!", { id: toastId });
        setEditOpen(false);
        setEditingCategory(null);
        setEditCatName("");
        setEditCatImage(null);
        loadCategories();
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsCreating(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    const toastId = toast.loading("Deleting category...");
    try {
      const { error } = await deleteCategoryAction(id);
      if (error) {
        toast.error(error.message, { id: toastId });
      } else {
        toast.success("Category deleted!", { id: toastId });
        loadCategories();
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const openEdit = (cat: any) => {
    setEditingCategory(cat);
    setEditCatName(cat.name);
    setEditOpen(true);
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black mb-2 tracking-tight">Category <span className="text-primary italic">Management</span></h1>
          <p className="text-muted-foreground">Manage and organize your medicine categories.</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2 rounded-xl h-12 px-6 shadow-lg transition-transform hover:scale-105 active:scale-95">
              <Plus className="h-5 w-5" />
              Add New Category
            </Button>
          </DialogTrigger>
          <DialogContent className="rounded-3xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Create Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="cat-name" className="text-sm font-bold opacity-70">Category Name</Label>
                <Input
                  id="cat-name"
                  value={newCatName}
                  onChange={(e) => setNewCatName(e.target.value)}
                  placeholder="e.g. Wellness"
                  className="h-12 rounded-xl border-secondary/50 focus:ring-primary/20"
                />
              </div>

              <NMImageUpload
                label="Category Icon/Image"
                onImageUpload={(file) => setNewCatImage(file)}
                onImageRemove={() => setNewCatImage(null)}
              />

              <Button
                className="w-full h-12 rounded-xl font-bold transition-all hover:scale-[1.02]"
                onClick={handleCreateCategory}
                disabled={isCreating}
              >
                {isCreating ? "Creating..." : "Create Category"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent className="rounded-3xl sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black">Edit Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-cat-name" className="text-sm font-bold opacity-70">Category Name</Label>
                <Input
                  id="edit-cat-name"
                  value={editCatName}
                  onChange={(e) => setEditCatName(e.target.value)}
                  className="h-12 rounded-xl border-secondary/50 focus:ring-primary/20"
                />
              </div>

              <NMImageUpload
                label="Update Icon/Image"
                value={editingCategory?.image}
                onImageUpload={(file) => setEditCatImage(file)}
                onImageRemove={() => setEditCatImage(null)}
              />

              <Button
                className="w-full h-12 rounded-xl font-bold transition-all hover:scale-[1.02]"
                onClick={handleUpdateCategory}
                disabled={isCreating}
              >
                {isCreating ? "Updating..." : "Save Changes"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4 bg-secondary/30 p-4 rounded-2xl border border-secondary/50 shadow-inner">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-10 bg-background border-none rounded-xl"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-xl"><LayoutGrid className="h-4 w-4" /></Button>
        </div>
      </div>

      <Card className="rounded-3xl border-none shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary/20 hover:bg-secondary/20 border-none">
              <TableHead className="font-black px-6">ID</TableHead>
              <TableHead className="font-black">Category Name</TableHead>
              <TableHead className="font-black">Status</TableHead>
              <TableHead className="font-black text-right px-6">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={i} className="animate-pulse">
                  <TableCell colSpan={4} className="h-16 px-6"><div className="h-4 bg-secondary rounded-full w-full" /></TableCell>
                </TableRow>
              ))
            ) : filteredCategories.length > 0 ? (
              filteredCategories.map((cat, i) => (
                <TableRow key={cat.id} className="hover:bg-secondary/10 border-b border-secondary/50 transition-colors">
                  <TableCell className="px-6 font-mono text-xs text-muted-foreground">#{cat.id.slice(0, 8)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden border">
                        {cat.image ? (
                          <img src={cat.image} alt={cat.name} className="h-full w-full object-cover" />
                        ) : (
                          <LayoutGrid className="h-5 w-5 text-primary" />
                        )}
                      </div>
                      <span className="font-bold">{cat.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-emerald-100/80 text-emerald-700 hover:bg-emerald-100 gap-1 rounded-full px-3 py-1 border border-emerald-200">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex justify-end gap-1">
                      <Button onClick={() => openEdit(cat)} variant="ghost" size="icon" className="rounded-xl hover:bg-primary/10 hover:text-primary transition-all active:scale-90"><Edit2 className="h-4 w-4" /></Button>
                      <Button onClick={() => handleDeleteCategory(cat.id)} variant="ghost" size="icon" className="rounded-xl hover:bg-destructive/10 hover:text-destructive transition-all active:scale-90"><Trash2 className="h-4 w-4" /></Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">No categories found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
