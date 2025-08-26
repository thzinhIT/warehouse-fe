import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";

const SidebarHeader = ({ title }: { title?: string }) => {
  return (
    <header className="flex border-b bg-background  h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 h-4 w-[1px] bg-accent"
        />
        {title && <p className="text-lg font-semibold"> {title}</p>}
      </div>
    </header>
  );
};

export default SidebarHeader;
