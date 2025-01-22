
"use client";
import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export const dynamic = 'force-static'
import { useAuth } from "../../../../utils/context/AuthContext";

import { useRouter } from "next/navigation";

export default function StudioPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) return <div>Loading...</div>;

  if (!user) {
    router.push("/login");
    return null;
  }
  // const allowedEmails = ["admin@example.com", "editor@example.com"];
  // if (!allowedEmails.includes(user.email)) {
  //   return <div>Access Denied</div>;
  // }

  return <NextStudio config={config} />
}
