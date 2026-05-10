import RegisterForm from "@/components/auth/RegisterForm";
import { AUTH_CONFIG } from "@/constants/auth.constant";

export default function RegisterPage() {
  return (
    <div className="max-w-300 mx-auto py-10 ">
      <h1 className="text-3xl text-center">{AUTH_CONFIG.REGISTER_TITLE}</h1>
      <RegisterForm />
    </div>
  );
}
