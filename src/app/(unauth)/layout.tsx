import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Readonly<AuthLayoutProps>) {
  return (
    <main className={"w-full flex flex-col overflow-y-auto"}>
      <div className="flex-1">{children}</div>
    </main>
  );
}
