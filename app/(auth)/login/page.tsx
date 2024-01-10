import Logo from "@/components/logo";
import UserAuthForm from "@/components/user-auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <section className="container flex h-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mb-40">
        <div className="flex flex-col space-y-2 text-center">
          <Logo />
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
        </div>
        <UserAuthForm />
      </div>
    </section>
  );
};

export default LoginPage;
