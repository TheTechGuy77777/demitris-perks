"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { MobileNav } from "./MobileNav";

export function AppFrame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isCampaignMicrosite = pathname === "/competition-template";

  if (isCampaignMicrosite) return <main id="main" className="flex-1">{children}</main>;

  return <><Header /><main id="main" className="flex-1 pb-[calc(env(safe-area-inset-bottom)+68px)] lg:pb-0">{children}</main><Footer /><MobileNav /></>;
}
