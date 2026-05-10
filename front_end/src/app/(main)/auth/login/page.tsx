import LoginForm from "@/components/auth/LoginForm";
import { AUTH_CONFIG } from "@/constants/auth.constant";

export default function LoginPage() {
  return (
    <div className="max-w-300 mx-auto py-10 ">
      <h1 className="text-3xl text-center">{AUTH_CONFIG.LOGIN_TITLE}</h1>
      <LoginForm />
    </div>
  );
}
