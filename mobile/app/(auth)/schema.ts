import { z } from 'zod';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' }),
  pwd: z.string().min(1, { message: 'Must enter a valid password.' }),
});

export type SignInSchema = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    role: z.string().refine((v) => ['Rider', 'Entrepreneur', 'Farmer'].includes(v), {
      message: 'Must select role.',
    }),
    email: z.string().email({ message: 'Must enter a valid email.' }),
    firstName: z.string().min(2, { message: 'Must enter first name.' }),
    lastName: z.string().min(2, { message: 'Must enter last name.' }),
    address: z.string().min(2, { message: 'Must enter address.' }),
    mobileNum: z.string().regex(/^\+63\d{10}$/, {
      message: 'Mobile number must be in the format +631234567890.',
    }),
    pwd: z.string().min(1, { message: 'Must enter a valid password.' }),
    confirmPwd: z.string(),
  })
  .superRefine(({ pwd, confirmPwd }, ctx) => {
    if (pwd !== confirmPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must confirm password.',
        path: ['confirmPwd'],
      });
    }
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;

export const forgotPwdSchema = z.object({
  email: z.string().email({ message: 'Must enter a valid email.' }),
});

export type ForgotPwdSchema = z.infer<typeof forgotPwdSchema>;
