import { z } from 'zod';

export const emptyPlatform = {
  platform_id: '',
  name: '',
  logo_gray: '',
  logo_white: '',
  color: '',
  url: '',
};

const PlatformSchema = z.object({
  platform_id: z.string(),
  name: z.string(),
  logo_gray: z.string(),
  logo_white: z.string(),
  color: z.string(),
});

export const FormSchema = z.object({
  selectedPlatform: PlatformSchema,
  platformUrl: z.string().url(),
});
