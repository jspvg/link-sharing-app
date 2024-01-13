import { z } from 'zod';

export const baseLoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(25),
});

const Platform = z.object({
  id: z.string(),
  name: z.string(),
  logo_gray: z.string(),
  logo_white: z.string(),
  color: z.string(),
});

export const PlatformFormSchema = z.object({
  platform: Platform,
  url: z.string().url(),
});
