"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const profile = localStorage.getItem("calorifyx_profile");

    if (!profile) {
      router.replace("/login");
    }
  }, [router]);

  return <div>Dashboard</div>;
}
