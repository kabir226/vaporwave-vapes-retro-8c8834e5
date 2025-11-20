import { z } from 'zod';

export const authSchema = z.object({
  email: z.string()
    .trim()
    .email({ message: "Adresse email invalide" })
    .max(255, { message: "L'email doit contenir moins de 255 caractères" }),
  password: z.string()
    .min(8, { message: "Le mot de passe doit contenir au moins 8 caractères" })
    .max(100, { message: "Le mot de passe doit contenir moins de 100 caractères" })
});

export type AuthFormData = z.infer<typeof authSchema>;
