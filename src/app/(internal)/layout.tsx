import Link from "next/link";
import Image from 'next/image'
import Logo from "@/../public/logo.svg"
import { headers } from "next/headers";
import { unauthenticatedGet } from "@/lib/httpMethods";
import { FiExternalLink, FiLogOut } from "react-icons/fi";
import MobileMenu from "@/components/MobileMenu";

export default async function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers()
  
  const { logoUrl: accountLogo }: { logoUrl: string } = await unauthenticatedGet(`get-account-logo-url/${headersList.get('host')}`)

  return (
    <div>
      <nav className="md:fixed top-0 w-full h-[50px] bg-white shadow-sm flex justify-between items-center px-4 z-10">
        <Link href="/" className="flex gap-2">
          <Image
            src={accountLogo || "/logo.svg"}
            width={139}
            height={69}
            alt="Logo Client"
            className="h-8 w-auto"
          />

          <span className="my-auto text-sm">X</span>

          <Image
            src={Logo}
            width={139}
            height={69}
            alt="Logo DeepMobility"
            className="h-8 w-auto"
          />
        </Link>
        
        <div className="hidden sm:flex gap-6">
          <Link
            href="/rappels"
            className="text-gray-400 hover:underline hover:text-gray-500"
          >
            Rappels
          </Link>
          <Link
            href="/faq"
            className="text-gray-400 hover:underline hover:text-gray-500"
          >
            FAQ
          </Link>
          <Link href="/logout" prefetch={false} className="text-gray-300 hover:text-gray-500">
            <FiLogOut size="25px"/>
          </Link>
        </div>

        <MobileMenu />
      </nav>

      <div className="md:mt-12 min-h-[calc(100vh-50px)] max-w-[1366px] bg-white m-auto p-6">
        {children}
      </div>

      <div className="border-t justify-center p-4">
        <div className="flex gap-4 justify-self-center flex-wrap">
          <Link
            href="/objectifs-pedagogiques"
            className="text-gray-500 hover:underline flex gap-2"
          >
            <span>Objectifs pédagogiques</span>
            <span className="my-auto"><FiExternalLink /></span>
          </Link>
          <Link
            href="/mentions-legales"
            className="text-gray-500 hover:underline flex gap-2"
          >
            <span>Mentions légales</span>
            <span className="my-auto"><FiExternalLink /></span>
          </Link>
          <Link
            href="/politique-de-confidentialite"
            className="text-gray-500 hover:underline flex gap-2"
          >
            <span>Politique de confidentialité</span>
            <span className="my-auto"><FiExternalLink /></span>
          </Link>
        </div>
      </div>
    </div>
  );
}
