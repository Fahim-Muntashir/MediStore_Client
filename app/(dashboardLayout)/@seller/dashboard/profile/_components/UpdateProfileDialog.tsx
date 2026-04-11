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
import { NMImageUpload } from "@/components/ui/nm-image-upload";
import { uploadService } from "@/services/upload.service";

export default function UpdateProfileDialog({ profile }: { profile: any }) {
  const [open, setOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(profile.image || "");
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
          <div>
            <label className="text-sm font-medium mb-1 inline-block">Name :</label>
            <Input name="name" defaultValue={profile.name} required />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 inline-block">Phone :</label>
            <Input name="phone" defaultValue={profile.phone || ""} />
          </div>
          
          <div>
            <label className="text-sm font-medium mb-1 inline-block">Address :</label>
            <Textarea
              name="shippingAddress"
              defaultValue={profile.shippingAddress || ""}
            />
          </div>

          <NMImageUpload
            label="Profile Image"
            value={imageUrl}
            onImageUpload={async (file) => {
              const toastId = toast.loading("Uploading profile image...");
              const res = await uploadService.uploadImage(file);
              if (res.data) {
                setImageUrl(res.data);
                toast.success("Image uploaded successfully", { id: toastId });
              } else {
                toast.error(res.error?.message || "Upload failed", { id: toastId });
              }
            }}
            onImageRemove={() => setImageUrl("")}
          />
          <input type="hidden" name="image" value={imageUrl} />

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
