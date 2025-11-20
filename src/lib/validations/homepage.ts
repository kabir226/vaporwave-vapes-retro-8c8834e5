import { z } from 'zod';

// URL validation schema
const urlSchema = z.string()
  .trim()
  .refine((val) => {
    if (!val) return true; // Optional field
    try {
      // Check if it's a relative URL (starts with /)
      if (val.startsWith('/')) return true;
      // Check if it's a valid absolute URL
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, { message: "URL invalide. Doit être une URL absolue (https://...) ou relative (/...)" });

export const homepageSettingsSchema = z.object({
  section_name: z.string()
    .trim()
    .min(1, { message: "Le nom de la section est requis" })
    .max(100, { message: "Le nom de la section doit contenir moins de 100 caractères" }),
  title: z.string()
    .max(200, { message: "Le titre doit contenir moins de 200 caractères" })
    .optional(),
  subtitle: z.string()
    .max(200, { message: "Le sous-titre doit contenir moins de 200 caractères" })
    .optional(),
  description: z.string()
    .max(5000, { message: "La description doit contenir moins de 5000 caractères" })
    .optional(),
  button_text: z.string()
    .max(100, { message: "Le texte du bouton doit contenir moins de 100 caractères" })
    .optional(),
  button_link: urlSchema.optional(),
  image_url: urlSchema.optional(),
  video_url: urlSchema.optional(),
  display_order: z.number()
    .int({ message: "L'ordre d'affichage doit être un nombre entier" })
    .nonnegative({ message: "L'ordre d'affichage ne peut pas être négatif" })
    .optional(),
});

// Schema for carousel items with button links
export const carouselItemSchema = z.object({
  image_url: urlSchema,
  buttons: z.array(z.object({
    text: z.string().max(100, { message: "Le texte du bouton doit contenir moins de 100 caractères" }),
    link: urlSchema,
    color: z.string().regex(/^#[0-9A-F]{6}$/i, { message: "Couleur invalide. Format: #RRGGBB" }),
  })),
});

export type HomepageSettingsFormData = z.infer<typeof homepageSettingsSchema>;
export type CarouselItemFormData = z.infer<typeof carouselItemSchema>;
