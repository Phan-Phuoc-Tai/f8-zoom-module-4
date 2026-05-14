"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from "next/image";
import avatar from "../../../public/images/users/avatar_default.svg";
import { ChevronDownCircleIcon } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useEffect } from "react";
import { Spinner } from "../ui/spinner";
import Link from "next/link";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth.action";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { useRouter } from "next/navigation";
import { CONFIG } from "@/constants/config.constant";

export default function AdminProfile() {
  const { user, isLoading, isAuthenticated, refetchUser, logout } =
    useAuthStore();
  const router = useRouter();
  useEffect(() => {
    refetchUser?.();
  }, []);
  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="flex gap-3 items-center cursor-pointer">
              <Image src={avatar} alt="avatar" width={32} height={32} />
              <div>
                <h2 className="text-sm font-semibold">{user?.username}</h2>
                <p className="text-xs  text-black/80">{user?.role}</p>
              </div>
              <ChevronDownCircleIcon className="w-4 h-4 text-black/50" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem className="justify-center text-base cursor-pointer">
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem
                className="justify-center text-base text-red-500! focus:bg-red-100 cursor-pointer"
                onClick={() => {
                  toast.promise(() => logoutAction(), {
                    success: () => {
                      router.push(CONFIG.LOGIN());
                      logout?.();
                      return AUTH_CONFIG.LOGOUT_ACTION.SUCCESS;
                    },
                    loading: AUTH_CONFIG.LOGOUT_ACTION.LOADING,
                  });
                }}
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <Link href={"/auth/login"}>Đăng nhập</Link>
      )}
    </>
  );
}
