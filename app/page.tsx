"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Index = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("./home");
  });

  return (
    <>
      <Link href="/home">Click to see the Home page.</Link>
    </>
  );
};

export default Index;
