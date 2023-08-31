"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

const WelcomePage = () => {
  const session = useSession();

  if (session.status === "authenticated") redirect("/home");

  return (
    <div className="w-full h-[calc(100vh-4rem)] flex justify-center items-center flex-col">
      <h1 className="lg:text-6xl text-4xl md:text-5xl uppercase text-center shadow-md p-3 font-extralight">
        Welcome to <span className="text-yellow-500">Blog</span> Mania!
      </h1>
      <p className="text-center text-sm p-4 mt-3 w-full md:w-3/4 md:text-lg">{`Feel free to explore, read, and engage with a diverse range of topics, from travel and tech to fashion and food there's something here for everyone. And if you're ready to make your mark, hit that 'Sign in' button and start shaping your corner of the blogosphere.`}</p>
    </div>
  );
};

export default WelcomePage;
