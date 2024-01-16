import { Icons } from "@/components/icons";
import Logo from "@/components/logo";
import UserAuthForm from "@/components/user-auth-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

const LoginPage = () => {
  return (
    <section className="flex h-screen flex-col items-center justify-center">
      <div className="px-2 mx-auto flex w-full max-w-[400px] flex-col justify-center gap-4 mb-52 ">
        <div className="flex flex-col space-y-2 text-center">
          <Icons.logo className="mx-auto h-7 w-7" />
          <h2 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h2>
          <p className="text-muted-foreground text-sm">
            Your rave journey continues! Sign in to manage, store, and relive
            your past raves. Your unique collection of memories is just a login
            away.
          </p>
        </div>
        <UserAuthForm />
      </div>
    </section>
  );
};

export default LoginPage;
