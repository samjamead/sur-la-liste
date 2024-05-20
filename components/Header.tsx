import Link from "next/link";
import AuthButton from "./auth-button";

export default function Header() {
  return (
    <div>
      <nav className="mx-auto flex max-w-2xl items-center justify-between gap-8 border-b py-3">
        <h2 className="font-medium">
          <Link href="/">Sur La Liste</Link>
        </h2>
        <AuthButton />
      </nav>
    </div>
  );
}
