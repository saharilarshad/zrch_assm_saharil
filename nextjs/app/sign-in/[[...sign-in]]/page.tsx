"use client";

import Loading from "@/components/ui/loading/Loading";
import { SignIn } from "@clerk/nextjs";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const {user } = useUser();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!isClient) {
    return null;
  }

  // console.log(user);

  return (
    <div className="flex items-center justify-center m-auto h-screen ">
      <Suspense fallback={<Loading />}>
      <SignIn />
      </Suspense>
    </div>
  );
}
