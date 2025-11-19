import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { X, Upload, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ImageCropDialog from "./ImageCropDialog";

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  productId?: string;
}

const ImageUpload = ({ images, onImagesChange, productId }: ImageUploadProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropDialogOpen, setCropDialogOpen] = useState(false);
  const [currentImageSrc, setCurrentImageSrc] = useState<string>("");
  const [pendingFile, setPendingFile] = useState<File | null>(null);

  const compressImage = async (file: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let width = img.width;
          let height = img.height;

          // Redimensionner si l'image est trop grande
          const maxDimension = 1200;
          if (width > maxDimension || height > maxDimension) {
            if (width > height) {
              height = (height * maxDimension) / width;
              width = maxDimension;
            } else {
              width = (width * maxDimension) / height;
              height = maxDimension;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(blob);
              } else {
                reject(new Error("Compression failed"));
              }
            },
            "image/jpeg",
            0.85
          );
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });
  };

  const uploadImage = async (blob: Blob, originalFileName: string) => {
    try {
      const timestamp = Date.now();
      const fileName = `${timestamp}-${originalFileName.replace(/[^a-zA-Z0-9.]/g, "-")}`;
      const filePath = `${productId || "temp"}/${fileName}`;

      // Déterminer le content type
      let contentType = "image/jpeg";
      if (blob.type) {
        contentType = blob.type;
      } else if (originalFileName.match(/\.(mp4|webm|ogg|mov)$/i)) {
        contentType = "video/mp4";
      }

      // Upload vers Supabase Storage
      const { error: uploadError, data } = await supabase.storage
        .from("product-images")
        .upload(filePath, blob, {
          contentType,
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Obtenir l'URL publique
      const { data: urlData } = supabase.storage
        .from("product-images")
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error: any) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    
    // Vérifier si c'est une image ou vidéo
    if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
      toast({
        title: "Erreur",
        description: `${file.name} n'est ni une image ni une vidéo`,
        variant: "destructive",
      });
      return;
    }

    // Si c'est une vidéo, upload direct sans recadrage
    if (file.type.startsWith("video/")) {
      setUploading(true);
      try {
        const imageUrl = await uploadImage(file, file.name);
        onImagesChange([...images, imageUrl]);
        toast({
          title: "Succès",
          description: "Vidéo uploadée avec succès",
        });
      } catch (error: any) {
        toast({
          title: "Erreur",
          description: error.message,
          variant: "destructive",
        });
      } finally {
        setUploading(false);
      }
      return;
    }

    // Pour les images, ouvrir le crop dialog
    const reader = new FileReader();
    reader.onload = (e) => {
      setCurrentImageSrc(e.target?.result as string);
      setPendingFile(file);
      setCropDialogOpen(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = async (_croppedImageBlob: Blob) => {
    if (!pendingFile) return;

    setUploading(true);
    try {
      // Option A : on compresse et on sauvegarde toujours l'image originale (non recadrée)
      const compressedOriginal = await compressImage(pendingFile);
      const imageUrl = await uploadImage(compressedOriginal, pendingFile.name);
      onImagesChange([...images, imageUrl]);

      toast({
        title: "Succès",
        description: "Image uploadée avec succès",
      });

      // Reset
      setPendingFile(null);
      setCurrentImageSrc("");
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleRemoveImage = async (imageUrl: string, index: number) => {
    try {
      // Extraire le chemin du fichier depuis l'URL
      const url = new URL(imageUrl);
      const pathParts = url.pathname.split("/product-images/");
      if (pathParts.length > 1) {
        const filePath = pathParts[1];
        await supabase.storage.from("product-images").remove([filePath]);
      }

      const newImages = images.filter((_, i) => i !== index);
      onImagesChange(newImages);

      toast({
        title: "Image supprimée",
      });
    } catch (error: any) {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
          dragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/50"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*"
          onChange={(e) => handleFiles(e.target.files)}
          className="hidden"
        />

        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm text-muted-foreground mb-2">
          Glissez-déposez vos images/vidéos ici ou
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Upload en cours...
            </>
          ) : (
            "Sélectionner des fichiers"
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Images compressées automatiquement, vidéos uploadées en format original
        </p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-4">
          {images.map((imageUrl, index) => {
            const isVideo = imageUrl.match(/\.(mp4|webm|ogg|mov)$/i);
            return (
              <div key={index} className="relative group bg-muted rounded-lg overflow-hidden flex items-center justify-center h-32">
                {isVideo ? (
                  <video
                    src={imageUrl}
                    className="max-h-full max-w-full object-contain"
                    controls
                  />
                ) : (
                  <img
                    src={imageUrl}
                    alt={`Produit ${index + 1}`}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => handleRemoveImage(imageUrl, index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      <ImageCropDialog
        open={cropDialogOpen}
        onOpenChange={setCropDialogOpen}
        imageSrc={currentImageSrc}
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default ImageUpload;
