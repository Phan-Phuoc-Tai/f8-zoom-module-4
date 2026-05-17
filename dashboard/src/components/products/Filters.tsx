"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/hooks/common/useDebounce";
import { PRODUCT_CONFIG } from "@/constants/product.constant";

export default function Filters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounceValue = useDebounce(value);
  const params = new URLSearchParams(searchParams.toString());
  const handleChangeSelectValue = (value: string) => {
    if (value === "all") {
      params.delete("status");
    } else {
      params.set("status", value);
    }
    router.replace(`${pathname}?${params.toString()}`);
  };
  useEffect(() => {
    const currentQuery = params.get("q") ?? "";
    if (debounceValue === currentQuery) {
      return;
    }
    if (debounceValue) {
      params.set("q", debounceValue);
    } else {
      params.delete("q");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, [debounceValue]);

  return (
    <div className="flex">
      <Select defaultValue="all" onValueChange={handleChangeSelectValue}>
        <SelectTrigger className="w-45 data-[size=default]:h-10.5 focus-visible:ring-0 text-(--primary-color) border-(--primary-color)/30 focus-visible:border-(--primary-color) data-placeholder:text-(--primary-color) rounded-l-lg rounded-r-none border-r-0">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">Tất cả</SelectItem>
            <SelectItem value="true">Đang bán</SelectItem>
            <SelectItem value="false">Ngừng bán</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <div className="w-full relative">
        <Search className="w-5 h-5 absolute top-2.75 left-3.5 text-(--primary-color) cursor-pointer" />
        <Input
          placeholder={PRODUCT_CONFIG.SEARCH_PLACEHOLDER}
          className="focus-visible:ring-0 h-auto py-2 pl-11 pr-5 md:text-base rounded-l-none rounded-r-lg text-(--primary-color)  border-(--primary-color)/30 focus-visible:border-(--primary-color) placeholder:text-(--primary-color)"
          spellCheck={false}
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </div>
    </div>
  );
}
