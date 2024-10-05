import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { zod } from 'sveltekit-superforms/adapters';
import {
  createUserSchema,
  updateUserEmailSchema,
  updateUserInfoSchema,
  updateUserPwdSchema
} from './_components/operations/schema';

export const load: PageServerLoad = async () => {
  return {
    createUserForm: await superValidate(zod(createUserSchema)),
    updateUserInfoForm: await superValidate(zod(updateUserInfoSchema)),
    updateUserEmailForm: await superValidate(zod(updateUserEmailSchema)),
    updateUserPwdForm: await superValidate(zod(updateUserPwdSchema))
  };
};
