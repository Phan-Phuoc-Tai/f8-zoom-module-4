"use client";
import { CONFIG } from "@/constants/config.constant";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const SIDE_BAR = CONFIG.SIDE_BAR;
  const pathname = usePathname();
  const className = (href: string): string => {
    const isActive = pathname === href;
    return isActive
      ? "text-(--secondary-color) font-semibold text-sm text-white py-4 text-center bg-(--primary-color) rounded-md"
      : "text-(--secondary-color) font-semibold text-sm py-4 text-center hover:bg-(--primary-color)/20 rounded-md";
  };
  return (
    <ul className="px-6 flex flex-col gap-3">
      {SIDE_BAR.map((item, index) => (
        <Link href={item.HREF} key={index}>
          <li className={className(item.HREF)}>{item.TEXT}</li>
        </Link>
      ))}
    </ul>
  );
}
