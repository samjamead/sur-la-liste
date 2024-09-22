import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/login');
  }

  return (
    <div className='w-full max-w-2xl mx-auto flex flex-col gap-8 py-16'>
      <h2 className='text-xl font-bold'>Todo: </h2>
      {children}
    </div>
  );
}
