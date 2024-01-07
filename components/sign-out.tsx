"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

const SignOut = () => {
  return (
    <Button
      onClick={() => {
        signOut({
          callbackUrl: `${window.location.origin}/login`,
        });
      }}
    >
      Logout
    </Button>
  );
};

export default SignOut;
