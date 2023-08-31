"use client";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import Image from "next/image";
import { UserMenuProps } from "@/types/types";

const UserMenu = ({ name, image }: UserMenuProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="md:hidden">
        {/* ON MOBILE DEVICE */}
        <div className="z-10 relative">
          {open ? (
            <FaTimes size={20} onClick={() => setOpen(false)} />
          ) : (
            <FaBars className="ml-3" size={20} onClick={() => setOpen(true)} />
          )}
        </div>
        {open && (
          <div className="absolute top-[5px] dark:bg-[#222] bg-gray-200 rounded-sm shadow-md w-1/2 max-w-[150px] min-h-[260px] flex justify-end items-end pr-5 flex-col z-1 right-0">
            <Image
              src={image!}
              width={40}
              height={40}
              className="rounded-full"
              alt="Profile Pic"
            />
            <p className="mb-4 mt-1 text-lg font-bold">Hi ! {name}</p>
            <Link
              href="/home"
              className="text-base uppercase underline mb-4 underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/profile"
              className="text-base uppercase underline mb-4 underline-offset-4"
              onClick={() => setOpen(false)}
            >
              Profile
            </Link>
            <button
              className="text-base uppercase underline mb-4 underline-offset-4"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {/* ON LARGE SCREEN */}
      <div className="hidden md:flex items-center">
        <Link
          href="/home"
          className="text-base rounded  px-3 py-1 ml-3 border border-purple-600 text-purple-600 hover:shadow-md hover:bg-purple-600 hover:text-white hover:border-transparent transition-colors duration-300"
        >
          Home
        </Link>
        <Link
          href="/profile"
          className="text-base rounded px-3 py-1 ml-2 border border-purple-600 text-purple-600 hover:shadow-md hover:bg-purple-600 hover:text-white hover:border-transparent transition-colors duration-300"
        >
          Profile
        </Link>
        <button
          className="text-base rounded px-3 py-1 mx-2 border border-purple-600 text-purple-600 hover:shadow-md hover:bg-purple-600 hover:text-white hover:border-transparent transition-colors duration-300"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
        <Image
          src={image!}
          width={40}
          height={40}
          className="rounded-full"
          alt="Profile Pic"
        />
      </div>
    </div>
  );
};

export default UserMenu;
