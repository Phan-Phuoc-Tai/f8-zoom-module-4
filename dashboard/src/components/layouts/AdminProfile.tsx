"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import avatar from "../../../public/images/users/avatar.png";
import { ChevronDownCircleIcon } from "lucide-react";

export default function AdminProfile() {
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex gap-3 items-center cursor-pointer">
            <Image src={avatar} alt="avatar" width={40} height={40} />
            <div>
              <h2 className="text-sm font-semibold">Phước Tài</h2>
              <p className="text-xs  text-black/80">Admin</p>
            </div>
            <ChevronDownCircleIcon className="w-4 h-4 text-black/50" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem className="justify-center text-base cursor-pointer">
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-center text-base text-red-500! focus:bg-red-100 cursor-pointer">
              Logout
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
