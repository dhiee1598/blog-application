"use client";

import { signIn } from "next-auth/react";

const ButtonSignin = () => {
  return (
    <button
      className="text-base rounded px-3 py-1 mx-2 border border-purple-600 text-purple-600 hover:shadow-md hover:bg-purple-600 hover:text-white hover:border-transparent transition-colors duration-300"
      onClick={() => signIn("google", { callbackUrl: "/api/auth/signin" })}
    >
      Login
    </button>
  );
};

export default ButtonSignin;
