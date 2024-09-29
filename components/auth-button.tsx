import { createClient } from '@/utils/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    'use server';

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect('/login');
  };

  return user ? (
    <div className='flex items-center text-sm gap-4'>
      Hey, {user.email}!
      <form action={signOut}>
        <button className='py-1 px-3 rounded-md no-underline bg-blue-800 hover:bg-btn-background-hover'>
          Logout
        </button>
      </form>
    </div>
  ) : (
    <Link
      href='/login'
      className='py-2 px-3 flex rounded-md no-underline bg-blue-800 hover:bg-btn-background-hover'
    >
      Login
    </Link>
  );
}
