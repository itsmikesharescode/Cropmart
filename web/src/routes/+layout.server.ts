import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({
  locals: { safeGetSession, supabaseAdmin },
  cookies
}) => {
  const { session } = await safeGetSession();

  /*  const { data, error } = await supabaseAdmin.auth.admin.updateUserById(
    '8e2b0b08-9706-42f0-b482-dc9ab902e551',
    {
      email: 'farmmart@admin.com'
    }
  );

  console.log(data, error?.message); */

  return {
    session,
    cookies: cookies.getAll()
  };
};
