import { z } from 'zod';

const AlphabeticString = z
  .string()
  .refine((value) => value === '' || /^[a-zA-Z\sčćšđžČĆŠĐŽ]+$/.test(value), {
    message: 'Input must only contain alphabetic characters',
  });

const EmailString = z
  .string()
  .refine((value) => value === '' || /.+@.+\..+/.test(value), {
    message: 'Invalid email format',
  })
  .optional();

export const FormSchema = z.object({
  fname: AlphabeticString.optional(),
  lname: AlphabeticString.optional(),
  email: EmailString,
});
