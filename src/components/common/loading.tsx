import { cn } from "@/lib/utils";
import { ClockLoader } from "react-spinners";

function Loading({ className, size }: { className?: string; size?: number }) {
  return (
    <main className={cn("flex  justify-center items-center ", className)}>
      <ClockLoader
        size={size ?? 40}
        speedMultiplier={2}
        loading={true}
        color="white"
      />
    </main>
  );
}

export default Loading;
