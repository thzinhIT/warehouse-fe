import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type TCardReportProps = {
  title: string;
  icon?: ReactNode;
  value?: number;
  className?: string;
  grow?: number;
};
const CardReport = (props: TCardReportProps) => {
  const { title, icon, value, className, grow } = props;
  return (
    <div className={cn("border rounded-md ", className)}>
      <div className="flex items-center justify-between px-2 border-b">
        {icon && <>{icon}</>}
        <div className="flex flex-col items-center">
          <span className="font-semibold text-gray-600">{title}</span>
          <span>{value ?? "--"}</span>
        </div>
      </div>
      <div className="text-center text-gray-600">grow</div>
    </div>
  );
};

export default CardReport;

interface ElegantCardProps {
  readonly className?: string;
  readonly icon?: ReactNode;
  readonly title: string;
  readonly value?: string | number;
  readonly trend?: "up" | "down" | "neutral";
  readonly subtitle?: string;
}

export function ElegantCard({
  className,
  icon,
  title,
  value,
  trend = "neutral",
  subtitle = "Growth",
}: ElegantCardProps) {
  const trendColors = {
    up: "text-emerald-600 bg-emerald-50",
    down: "text-rose-600 bg-rose-50",
    neutral: "text-slate-600 bg-slate-50",
  };

  const trendIcons = {
    up: "↗",
    down: "↘",
    neutral: "→",
  };

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-slate-200/50 hover:-translate-y-0.5",
        className
      )}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 to-transparent opacity-60" />

      <div className="relative flex items-center justify-between p-6 border-b border-slate-300">
        {icon && (
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-slate-100 to-slate-200/80 text-slate-700 shadow-sm">
            {icon}
          </div>
        )}

        <div className="flex flex-col items-end text-right">
          <span className="text-sm font-semibold text-slate-600 tracking-wide text-nowrap ">
            {title}
          </span>
          <span className="text-2xl font-bold text-blue-500 mt-1">
            {value ?? "--"}
          </span>
        </div>
      </div>

      <div className="relative p-1">
        <div
          className={cn(
            "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors"
          )}
        >
          {/* <span className="text-lg leading-none">{trendIcons[trend]}</span>
          <span className="capitalize">{subtitle}</span> */}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-slate-400 to-slate-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
    </div>
  );
}
