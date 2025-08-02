import { BarChart3 } from "lucide-react";

const EmptyDataChart = () => {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex flex-col items-center gap-6 text-center max-w-sm">
        {/* Animated Chart Icon */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 animate-pulse" />
          <div className="relative rounded-full bg-gradient-to-br from-blue-50 to-purple-50 p-6 shadow-lg">
            <BarChart3 className="h-12 w-12 text-blue-500" />
            <div className="absolute -top-1 -right-1">
              <div className="h-4 w-4 rounded-full bg-orange-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-3">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">
              No Data Available
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We could not find any visitor data for the selected time period.
              Try adjusting your date range or check back later.
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -z-10 inset-0 bg-gradient-to-br from-blue-50/20 to-purple-50/20 rounded-lg" />
      </div>
    </div>
  );
};

export default EmptyDataChart;
