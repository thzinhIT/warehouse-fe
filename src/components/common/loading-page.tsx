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
    <div className="fixed inset-0 flex items-center justify-center bg-white/70 z-50">
      <Icons.Loading width={5} height={5} />
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
