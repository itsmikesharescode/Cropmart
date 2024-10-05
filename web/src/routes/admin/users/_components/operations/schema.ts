import { z } from 'zod';

const roles = ['Rider', 'Farmer', 'Entrepreneur'];

export const createUserSchema = z
  .object({
    role: z.string().refine((v) => roles.includes(v), {
      message: 'Must select a role.'
    }),
    email: z.string().email({ message: 'Must enter a valid email.' }),
    fName: z.string().min(1, { message: 'Must enter a first name.' }),
    lName: z.string().min(1, { message: 'Must enter a last name.' }),
    address: z.string().min(1, { message: 'Must enter an address.' }),
    mobileNum: z.string().min(1, { message: 'Must enter a mobile number.' }),
    pwd: z.string().min(1, { message: 'Must enter a strong password.' }),
    confirmPwd: z.string()
  })
  .superRefine(({ pwd, confirmPwd }, ctx) => {
    if (pwd !== confirmPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must confirm password.',
        path: ['confirmPwd']
      });
    }
  });

export type CreateUserSchema = typeof createUserSchema;

// for update user info
const mobileNumberRegex = /^\+\d{11,14}$/;

export const updateUserInfoSchema = z.object({
  userId: z.string(),
  newFname: z.string().min(1, { message: 'Must enter a new first name.' }),
  newLname: z.string().min(1, { message: 'Must enter a new last name.' }),
  newAddress: z.string().min(1, { message: 'Must enter a new address.' }),
  newMobileNum: z.string().regex(mobileNumberRegex, {
    message: 'Must enter a valid mobile number in international format, e.g., +639123458272.'
  })
});

export type UpdateUserInfoSchema = typeof updateUserInfoSchema;

// for update user email
export const updateUserEmailSchema = z.object({
  userId: z.string(),
  newEmail: z.string().email({ message: 'Must enter a valid email.' })
});

export type UpdateUserEmailSchema = typeof updateUserEmailSchema;

// for update user password
export const updateUserPwdSchema = z
  .object({
    newPwd: z.string().min(8, { message: 'Must choose a strong password' }),
    confirmNewPwd: z.string()
  })
  .superRefine(({ newPwd, confirmNewPwd }, ctx) => {
    if (newPwd !== confirmNewPwd) {
      ctx.addIssue({
        code: 'custom',
        message: 'Must confirm password.',
        path: ['confirmNewPwd']
      });
    }
  });

export const UpdateUserPwdSchema = typeof updateUserPwdSchema;
