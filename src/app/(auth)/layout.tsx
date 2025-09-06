import { LoadingPage } from "@/components/common/loading-page";
import { AppSidebar } from "@/components/layout/nav/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <Suspense fallback={<LoadingPage />}>
        <SidebarInset>{children}</SidebarInset>
      </Suspense>
    </SidebarProvider>
  );
}
