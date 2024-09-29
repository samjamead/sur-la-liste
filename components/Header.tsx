import Link from 'next/link';
import AuthButton from './auth-button';
import { Terminal } from 'lucide-react';

export default function Header() {
  return (
    <div>
      <nav className='mx-auto flex max-w-2xl items-end justify-between gap-8 border-b py-5'>
        <h2 className='font-medium flex items-center gap-2'>
          <Terminal className='h-5 w-5' />
          <Link href='/'>Sur La Liste</Link>
        </h2>
        <AuthButton />
      </nav>
    </div>
  );
}
