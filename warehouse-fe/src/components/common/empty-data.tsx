import { cn } from "@/lib/utils";
import { FileText } from "lucide-react";
import { useTranslations } from "next-intl";

type EmptyDataProps = { className?: string; title?: string };

export const EmptyData = ({ className, title }: EmptyDataProps) => {
  const t = useTranslations("common");
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center space-y-4 text-center py-12",
        className
      )}
    >
      <div className="">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center animate-float">
          <FileText className="h-8 w-8 text-blue-500" />
        </div>
      </div>

      <div className="space-y-2 ">
        <h3 className="text-lg font-medium ">{t("empty-data")}</h3>
        <p className="text-sm ">{title || t("table.table-empty-message")}</p>
      </div>
    </div>
  );
};
