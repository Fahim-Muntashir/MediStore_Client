"use client";

import React, { useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface NMImageUploadProps {
  onImageUpload: (file: File) => void;
  onImageRemove: () => void;
  value?: string;
  className?: string;
  label?: string;
}

export function NMImageUpload({
  onImageUpload,
  onImageRemove,
  value,
  className,
  label = "Upload Image"
}: NMImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    onImageUpload(file);
  };

  const removeImage = () => {
    setPreview(null);
    onImageRemove();
  };

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <label className="text-sm font-bold text-foreground/80">{label}</label>
      </div>
      
      {!preview ? (
        <div 
          className="relative group border-2 border-dashed border-secondary hover:border-primary/50 transition-colors rounded-2xl h-40 flex flex-col items-center justify-center bg-secondary/10 cursor-pointer overflow-hidden"
          onClick={() => document.getElementById('image-upload-input')?.click()}
        >
          <div className="flex flex-col items-center gap-2 text-muted-foreground group-hover:text-primary transition-colors">
            <div className="p-3 rounded-full bg-secondary/30 group-hover:bg-primary/10">
              <Upload className="h-6 w-6" />
            </div>
            <span className="text-sm font-medium">Click to upload or drag & drop</span>
            <span className="text-xs opacity-60">PNG, JPG or WebP (Max 2MB)</span>
          </div>
          <input 
            id="image-upload-input"
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={handleFileChange}
          />
        </div>
      ) : (
        <div className="relative rounded-2xl overflow-hidden border bg-secondary/10 group aspect-video md:aspect-auto md:h-48">
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button 
              variant="destructive" 
              size="icon" 
              className="rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="absolute top-2 left-2 px-2 py-1 rounded-md bg-white/80 backdrop-blur-sm text-[10px] font-bold text-black uppercase tracking-wider">
            Preview
          </div>
        </div>
      )}

      {isUploading && (
        <div className="flex items-center gap-2 text-xs text-primary font-medium animate-pulse">
          <ClockLoader className="h-3 w-3" />
          Processing image...
        </div>
      )}
    </div>
  );
}

function ClockLoader({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
      <div className="absolute inset-0 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  );
}
