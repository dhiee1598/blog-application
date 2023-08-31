import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import UserMenu from "./UserMenu";
import ButtonDarkLight from "./ButtonDarkLight";
import ButtonSignin from "./ButtonSignin";

const Navbar = async () => {
  const session = await getServerSession(authOptions);

  const formatName = session?.user.name
    ?.slice(0, session.user.name.indexOf(" ") + 1)
    .toString();

  return (
    <div className="w-full min-w-[300px] h-16 flex px-3 justify-between items-center shadow-xl">
      <Link href="/home">
        <h1 className="font-bold uppercase md:text-2xl">
          {`<`} Blog <span className="text-purple-800">Mania</span> {` / >`}
        </h1>
      </Link>
      <div className="flex items-center">
        <ButtonDarkLight />
        {session ? (
          <UserMenu
            image={session.user.image || "/default-img.png"}
            name={formatName}
          />
        ) : (
          <>
            <ButtonSignin />
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
