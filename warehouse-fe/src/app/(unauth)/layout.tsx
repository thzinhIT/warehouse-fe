import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cookies } from "next/headers";
import React from "react";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default async function AuthLayout({
  children,
}: Readonly<AuthLayoutProps>) {
  const cookieStore = cookies();
  const preferredLanguage = (await cookieStore).get("preferredLanguage");
  const locale = preferredLanguage?.value ?? "vi";
  const handleChangeLanguage = async (lang: string) => {
    "use server";
    (await cookies()).set("preferredLanguage", lang);
  };
  return (
    <main className={"w-full flex flex-col overflow-y-auto"}>
      {/* <div>
        {" "}
        <Select onValueChange={handleChangeLanguage} defaultValue={locale}>
          <SelectTrigger className="max-w-80">
            <SelectValue placeholder={"select-language"} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="vi">việt</SelectItem>
              <SelectItem value="en">anh</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div> */}
      <div className="flex-1">{children}</div>
    </main>
  );
}
