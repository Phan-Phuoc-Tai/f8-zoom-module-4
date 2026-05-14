import LoginForm from "@/components/auth/LoginForm";
import { AUTH_CONFIG } from "@/constants/auth.constant";
import { Toaster } from "sonner";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-400/10">
      <div className="w-215 rounded-xl h-105 shadow-2xl flex items-center overflow-hidden bg-white">
        <div className="h-full bg-(--primary-color) w-[45%] text-white p-12 rounded-xl">
          <h2 className="text-[32px] mt-1 mb-8">{AUTH_CONFIG.WELCOME.TITLE}</h2>
          <p className="text-base mt-2">{AUTH_CONFIG.WELCOME.SUB_TITLE}</p>
        </div>
        <div className=" h-full w-[55%] p-12">
          <h1 className="text-3xl text-center">{AUTH_CONFIG.LOGIN_TITLE}</h1>
          <LoginForm />
        </div>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
}
