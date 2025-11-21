import { z } from 'zod';

export const pricingTierSchema = z.object({
  quantity: z.number().int().min(1, "La quantité doit être au moins 1"),
  price: z.number().min(0, "Le prix doit être positif"),
  label: z.string().optional(),
});

export const productSchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(200, { message: "Le nom doit contenir moins de 200 caractères" }),
  description: z.string()
    .max(5000, { message: "La description doit contenir moins de 5000 caractères" })
    .optional(),
  price: z.number()
    .positive({ message: "Le prix doit être positif" })
    .finite({ message: "Le prix doit être un nombre valide" }),
  stock: z.number()
    .int({ message: "Le stock doit être un nombre entier" })
    .nonnegative({ message: "Le stock ne peut pas être négatif" })
    .optional(),
  slug: z.string()
    .trim()
    .min(1, { message: "Le slug est requis" })
    .max(200, { message: "Le slug doit contenir moins de 200 caractères" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets" }),
  category_id: z.string().uuid().optional().nullable(),
  currency_code: z.string().min(3).max(3).optional(),
  strength: z.enum(['light', 'medium', 'strong', 'extra_strong']).optional().nullable(),
  specifications: z.string().max(5000).optional().nullable(),
  ingredients: z.string().max(5000).optional().nullable(),
  usage_instructions: z.string().max(5000).optional().nullable(),
  pricing_tiers: z.array(pricingTierSchema).optional().nullable(),
});

export const categorySchema = z.object({
  name: z.string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(100, { message: "Le nom doit contenir moins de 100 caractères" }),
  description: z.string()
    .max(1000, { message: "La description doit contenir moins de 1000 caractères" })
    .optional(),
  slug: z.string()
    .trim()
    .min(1, { message: "Le slug est requis" })
    .max(100, { message: "Le slug doit contenir moins de 100 caractères" })
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: "Le slug doit contenir uniquement des lettres minuscules, chiffres et tirets" }),
  display_order: z.number()
    .int({ message: "L'ordre d'affichage doit être un nombre entier" })
    .nonnegative({ message: "L'ordre d'affichage ne peut pas être négatif" })
    .optional(),
});

export const currencySchema = z.object({
  code: z.string()
    .trim()
    .length(3, { message: "Le code devise doit contenir 3 caractères" })
    .toUpperCase(),
  name: z.string()
    .trim()
    .min(1, { message: "Le nom est requis" })
    .max(100, { message: "Le nom doit contenir moins de 100 caractères" }),
  symbol: z.string()
    .trim()
    .min(1, { message: "Le symbole est requis" })
    .max(10, { message: "Le symbole doit contenir moins de 10 caractères" }),
  exchange_rate: z.number()
    .positive({ message: "Le taux de change doit être positif" })
    .finite({ message: "Le taux de change doit être un nombre valide" }),
});

export type PricingTier = z.infer<typeof pricingTierSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
export type CategoryFormData = z.infer<typeof categorySchema>;
export type CurrencyFormData = z.infer<typeof currencySchema>;
