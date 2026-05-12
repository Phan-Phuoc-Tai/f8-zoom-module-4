"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { CATEGORY_CONFIG } from "@/constants/category.constant";

import { ChangeEvent, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/common/useDebounce";

export default function SearchInput() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounceValue = useDebounce(value);
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (debounceValue) {
      params.set("q", debounceValue);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`); // Giảm việc tạo nhiều lịch sử trên trình duyệt
  }, [debounceValue]);

  return (
    <div className="w-full relative">
      <Search className="w-5 h-5 absolute top-2.75 left-3.5 text-(--primary-color) cursor-pointer" />
      <Input
        placeholder={CATEGORY_CONFIG.SEARCH_PLACEHOLDER}
        className="focus-visible:ring-0 h-auto py-2 pl-11 pr-5 md:text-base rounded-full text-(--primary-color) border-(--primary-color)/30 focus-visible:border-(--primary-color) placeholder:text-(--primary-color)"
        spellCheck={false}
        onChange={(e) => setValue(e.target.value)}
        value={value}
      />
    </div>
  );
}
