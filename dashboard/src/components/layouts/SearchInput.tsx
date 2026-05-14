import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { DASHBOARD_CONFIG } from "@/constants/dashboard.constant";

export default function SearchInput() {
  return (
    <div className="w-1/3 relative">
      <Search className="w-5 h-5 absolute top-2.75 left-3.5 text-black/45 cursor-pointer" />
      <Input
        placeholder={DASHBOARD_CONFIG.HEADER_SEARCH}
        className="focus-visible:ring-0 h-auto py-2 pl-11 pr-5 md:text-base rounded-full focus-visible:border-(--primary-color)"
        spellCheck={false}
      />
    </div>
  );
}
