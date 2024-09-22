import { SubmitButton } from './submit-button';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function SignIn({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signIn = async (formData: FormData) => {
    'use server';

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.log(error.message);
      return redirect(
        `/login?message=Could not authenticate user: ${error.message}`,
      );
    }

    return redirect('/todo');
  };

  return (
    <form className='flex w-full flex-col justify-center gap-2 rounded-md border p-8 text-foreground animate-in'>
      {searchParams?.message && (
        <p className='mb-4 rounded-md bg-foreground/10 p-4 text-center text-foreground'>
          {searchParams.message}
        </p>
      )}
      <label className='text-md' htmlFor='email'>
        Email
      </label>
      <input
        className='mb-6 rounded-md border bg-inherit px-4 py-2'
        name='email'
        placeholder='you@example.com'
        required
      />
      <label className='text-md' htmlFor='password'>
        Password
      </label>
      <input
        className='mb-6 rounded-md border bg-inherit px-4 py-2'
        type='password'
        name='password'
        placeholder='••••••••'
        required
      />
      <SubmitButton
        formAction={signIn}
        className='mb-2 rounded-md bg-sky-900 px-4 py-2 text-foreground'
        pendingText='Signing In...'
      >
        Sign In
      </SubmitButton>
    </form>
  );
}
