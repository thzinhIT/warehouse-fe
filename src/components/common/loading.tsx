import { cn } from "@/lib/utils";
import { ClockLoader } from "react-spinners";

function Loading({ className }: { className?: string }) {
  return (
    <main className={cn("flex  justify-center items-center ", className)}>
      <ClockLoader size={40} speedMultiplier={2} loading={true} />
    </main>
  );
}

export default Loading;
