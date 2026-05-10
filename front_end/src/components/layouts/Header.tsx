import { CONFIG } from "@/constants/config.constant";
import Link from "next/link";
import UserProfile from "./UserProfile";

export default function Header() {
  return (
    <header className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Logo</h1>
      <ul className="flex gap-3">
        {CONFIG.NAVIGATION.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>{item.text}</Link>
          </li>
        ))}
        <UserProfile />
      </ul>
    </header>
  );
}
