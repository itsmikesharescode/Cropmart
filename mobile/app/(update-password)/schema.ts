import { z } from 'zod';

export const verifySchema = z.object({
  code: z.string().min(1, { message: 'Must enter a valid code.' })
});

export type VerifySchema = z.infer<typeof verifySchema>;

export const updatePwdSchema = z
  .object({
    newPwd: z.string().min(8, { message: 'Must enter strong password.' }),
    confirmNewPwd: z.string()
  })
  .superRefine(({ newPwd, confirmNewPwd }, ctx) => {
    if (newPwd !== confirmNewPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must confirm your new password.',
        path: ['confirmNewPwd']
      });
    }
  });

export type UpdatePwdSchema = z.infer<typeof updatePwdSchema>;
