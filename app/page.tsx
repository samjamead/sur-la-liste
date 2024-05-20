import { Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function Index() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-8 py-20">
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Sur La Liste</AlertTitle>
        <AlertDescription>Coming soon to a localhost near you</AlertDescription>
      </Alert>
    </div>
  );
}
