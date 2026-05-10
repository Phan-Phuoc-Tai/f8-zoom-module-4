import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { CATEGORY_CONFIG } from "@/constants/category.constant";

export default function SearchInput() {
  return (
    <div className="w-full relative">
      <Search className="w-5 h-5 absolute top-2.75 left-3.5 text-(--primary-color) cursor-pointer" />
      <Input
        placeholder={CATEGORY_CONFIG.SEARCH_PLACEHOLDER}
        className="focus-visible:ring-0 h-auto py-2 pl-11 pr-5 md:text-base rounded-full text-(--primary-color) border-(--primary-color)/30 focus-visible:border-(--primary-color) placeholder:text-(--primary-color)"
        spellCheck={false}
      />
    </div>
  );
}
