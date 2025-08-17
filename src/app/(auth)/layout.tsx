import { AppSidebar } from "@/components/layout/nav/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function Main({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const token = (await cookies()).get("token")?.value;
  console.log("Token from cookies:", token);
  if (!token) {
    redirect("/login");
  }
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}
