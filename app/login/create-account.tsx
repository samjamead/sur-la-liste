import { headers } from "next/headers";
import { SubmitButton } from "./submit-button";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function CreateAccount({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/login?message=Check email to continue sign in process");
  };

  return (
    <form className="flex w-full flex-col justify-center gap-2 rounded-md border p-8 text-foreground animate-in">
      <p className="mb-6">
        <span className="pr-2 text-xl">👋</span> Welcome to Sur La Liste!
      </p>
      <label className="text-md" htmlFor="email">
        Email
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        name="email"
        placeholder="you@example.com"
        required
      />
      <label className="text-md" htmlFor="password">
        Password
      </label>
      <input
        className="mb-6 rounded-md border bg-inherit px-4 py-2"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />
      <SubmitButton
        formAction={signUp}
        className="mb-2 rounded-md bg-sky-900 px-4 py-2 text-foreground shadow-lg"
        pendingText="Creating account..."
      >
        Create account
      </SubmitButton>
      {searchParams?.message && (
        <p className="mt-4 bg-foreground/10 p-4 text-center text-foreground">
          {searchParams.message}
        </p>
      )}
    </form>
  );
}
