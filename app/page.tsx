import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Index() {
  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-12 py-20 lg:py-32'>
      <div className='flex flex-col gap-2'>
        <h2 className='text-center font-bold text-lg'>Sur La Liste</h2>
        <p className='text-center'>A very simple todo list</p>
      </div>

      <Link
        className='mx-auto text-sm pl-6 pr-5 py-2 flex justify-between bg-blue-700 hover:bg-blue-800 rounded-md items-center gap-3 max-w-fit transition-colors'
        href='/todo'
      >
        <span>View your todos</span> <ArrowRight className='h-4 w-4' />
      </Link>
    </div>
  );
}
