"use client";

import { useState, useTransition } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateProfile } from "@/actions/profile.actions";
import { useRouter } from "next/navigation";

export default function UpdateProfileDialog({ profile }: { profile: any }) {
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  function handleSubmit(formData: FormData) {
    startTransition(async () => {
      try {
        const data = {
          name: formData.get("name")?.toString() || "",
          phone: formData.get("phone")?.toString() || null,
          shippingAddress: formData.get("shippingAddress")?.toString() || null,
          image: formData.get("image")?.toString() || null,
        };

        await updateProfile(data); // ✅ correct
        toast.success("Profile updated successfully ✅");
        setOpen(false); // ✅ close modal
        router.refresh(); // ✅ refresh data
      } catch (err: any) {
        console.error(err);
        toast.error("Update failed ❌");
      }
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Update Profile</Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Profile</DialogTitle>
        </DialogHeader>

        <form action={handleSubmit} className="space-y-4">
          <label htmlFor="">Name :</label>
          <Input name="name" defaultValue={profile.name} />
          <label htmlFor="">Phone :</label>
          <Input name="phone" defaultValue={profile.phone || ""} />
          <label htmlFor="">Address :</label>
          <Textarea
            name="shippingAddress"
            defaultValue={profile.shippingAddress || ""}
          />{" "}
          <label htmlFor="">Image Url :</label>
          <Input name="image" defaultValue={profile.image || ""} />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
