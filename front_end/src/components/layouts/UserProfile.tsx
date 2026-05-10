"use client";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import { Spinner } from "../ui/spinner";
import { useEffect } from "react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { logoutAction } from "@/actions/auth.action";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { useRouter } from "next/navigation";

export default function UserProfile() {
  const { user, isLoading, isAuthenticated, refetchUser, logout } =
    useAuthStore();
  const router = useRouter();
  useEffect(() => {
    refetchUser?.();
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Spinner />
        </>
      ) : isAuthenticated ? (
        <>
          <li>Chào: {user?.username}</li>
          <Button
            variant={"outline"}
            onClick={() => {
              toast.promise(() => logoutAction(), {
                success: () => {
                  router.push("/auth/login");
                  logout?.();
                  return AUTH_CONFIG.LOGOUT_ACTION.SUCCESS;
                },
                loading: AUTH_CONFIG.LOGOUT_ACTION.LOADING,
              });
            }}
          >
            {AUTH_CONFIG.LOGOUT_BUTTON}
          </Button>
        </>
      ) : (
        <li>
          <Link href={"/auth/login"}>Đăng nhập</Link>
        </li>
      )}
    </>
  );
}
