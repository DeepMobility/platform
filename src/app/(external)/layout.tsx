import Logo from "../../../public/logo.svg"
import Image from 'next/image'
import { unauthenticatedGet } from "@/lib/httpMethods";
import { headers } from "next/headers";
import ClientLogo from "@/components/ClientLogo";

export default async function ConnectedLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const headersList = await headers()

  const { logoUrl: accountLogo }: { logoUrl: string } = await unauthenticatedGet(`get-account-logo-url/${headersList.get('host')}`)

  return (
    <div className="max-w-[600px] mx-auto min-h-screen flex flex-col gap-2 md:gap-8 justify-center p-4">
      <div className="flex gap-4 md:gap-8 mx-auto">
        <ClientLogo logoUrl={accountLogo}/>

        <span className="my-auto">X</span>

        <Image
          src={Logo}
          width={139}
          height={69}
          alt="Logo DeepMobility"
        />
      </div>

      <div className="bg-gray-100 rounded-3xl p-4 md:p-6">
        {children}
      </div>
    </div>
  );
}
