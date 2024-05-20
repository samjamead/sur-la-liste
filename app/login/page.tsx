import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import SignIn from "./sign-in";
import CreateAccount from "./create-account";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  return (
    <div className="mx-auto w-full max-w-lg py-20">
      <Tabs defaultValue="signin" className="w-full">
        <TabsList className="flex w-full">
          <TabsTrigger className="flex-1" value="signin">
            Sign in
          </TabsTrigger>
          <TabsTrigger className="flex-1" value="createaccount">
            Create account
          </TabsTrigger>
        </TabsList>
        <TabsContent value="signin">
          <SignIn searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="createaccount">
          <CreateAccount searchParams={searchParams} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
