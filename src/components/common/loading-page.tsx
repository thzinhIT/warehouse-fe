import React from "react";
import { Icons } from "./icons";

export function LoadingPage() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Icons.Loading width={40} height={40} />
    </div>
  );
}

export function LoadingBtn() {
  return (
    <div className=" flex items-center justify-center  z-50">
      <Icons.Loading width={6} height={6} className="text-white" />
    </div>
  );
}

export function LoadingNormal({ size }: { readonly size?: number }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Icons.Loading size={size} />
    </div>
  );
}
