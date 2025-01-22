import Link from "next/link";
import Image from 'next/image'
import Logo from "../../../public/logo.svg"
import { AiOutlineLogout } from 'react-icons/ai';

export default function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="bg-gray-100">
        <nav className="fixed top-0 w-full h-[50px] bg-white flex justify-between items-center px-4">
          <Link href="/">
            <Image
              src={Logo}
              width={139}
              height={69}
              alt="Logo DeepMobility"
              className="h-8"
            />
          </Link>
          <Link href="/logout"><AiOutlineLogout size="25px"/></Link>
        </nav>

        <div className="mt-12 h-[calc(100vh-50px)] max-w-[1366px] m-auto">
          {children}
        </div>
    </div>
  );
}
