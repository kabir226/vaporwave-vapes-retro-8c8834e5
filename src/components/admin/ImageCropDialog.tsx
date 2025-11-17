import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ZoomIn, ZoomOut, Grid3x3 } from "lucide-react";

interface ImageCropDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageSrc: string;
  onCropComplete: (croppedImage: Blob) => void;
}

interface Area {
  x: number;
  y: number;
  width: number;
  height: number;
}

const ImageCropDialog = ({
  open,
  onOpenChange,
  imageSrc,
  onCropComplete,
}: ImageCropDialogProps) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [showGrid, setShowGrid] = useState(true);

  // Ratio du cadre produit (aspect ratio du ProductCard)
  // Le cadre fait h-32 (128px) et la largeur est flexible, donc on utilise 1:1 par défaut
  const PRODUCT_FRAME_ASPECT = 1;

  const onCropCompleteCallback = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  const createCroppedImage = async (): Promise<Blob> => {
    if (!croppedAreaPixels) {
      throw new Error("No crop area defined");
    }

    const image = new Image();
    image.src = imageSrc;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      throw new Error("No 2d context");
    }

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
          } else {
            reject(new Error("Canvas to Blob conversion failed"));
          }
        },
        "image/jpeg",
        0.85
      );
    });
  };

  const handleCropConfirm = async () => {
    try {
      const croppedImage = await createCroppedImage();
      onCropComplete(croppedImage);
      onOpenChange(false);
    } catch (error) {
      console.error("Error creating cropped image:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            Recadrer l'image
            <Button
              variant={showGrid ? "default" : "outline"}
              size="sm"
              onClick={() => setShowGrid(!showGrid)}
              className="ml-auto"
            >
              <Grid3x3 className="w-4 h-4 mr-2" />
              {showGrid ? "Masquer" : "Afficher"} la grille
            </Button>
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 relative bg-muted">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={PRODUCT_FRAME_ASPECT}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropCompleteCallback}
            showGrid={showGrid}
            style={{
              containerStyle: {
                width: "100%",
                height: "100%",
              },
            }}
          />
        </div>

        <div className="space-y-4 py-4">
          <div className="flex items-center gap-4">
            <ZoomOut className="w-4 h-4 text-muted-foreground" />
            <Slider
              value={[zoom]}
              min={1}
              max={3}
              step={0.1}
              onValueChange={(value) => setZoom(value[0])}
              className="flex-1"
            />
            <ZoomIn className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground w-12 text-right">
              {Math.round(zoom * 100)}%
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Grid3x3 className="w-4 h-4" />
            <p>
              La grille représente les proportions du cadre produit sur votre site
              (format carré 1:1)
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Annuler
          </Button>
          <Button onClick={handleCropConfirm}>Valider le recadrage</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
