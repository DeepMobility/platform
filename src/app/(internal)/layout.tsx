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
    <div>
      <nav className="fixed top-0 w-full h-[50px] bg-white shadow-lg flex justify-between items-center px-4">
        <Link href="/">
          <Image
            src={Logo}
            width={139}
            height={69}
            alt="Logo DeepMobility"
            className="h-8 w-auto"
          />
        </Link>
        <Link href="/logout" prefetch={false}><AiOutlineLogout size="25px"/></Link>
      </nav>

      <div className=" mt-12 min-h-[calc(100vh-50px)] max-w-[1366px] bg-white m-auto p-6">
        {children}
      </div>
    </div>
  );
}
