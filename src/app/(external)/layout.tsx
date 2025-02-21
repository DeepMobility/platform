import Welcome1 from "../../../public/welcome1.jpeg"
import Logo from "../../../public/logo.svg"
import Image from 'next/image'
import { unauthenticatedGet } from "@/lib/httpMethods";
import { headers } from "next/headers";

export default async function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers()
  
  const { logoUrl: accountLogo }: { logoUrl: string } = await unauthenticatedGet(`get-account-logo-url/${headersList.get('host')}`)

  return (
    <div className="flex max-w-[1366px] m-auto">
      <div className="flex-1">
        <Image className="m-auto p-16 rounded-[100px]"
          src={Welcome1}
          width={565}
          height={804}
          alt="Photo exemple de la méthode DeepMobility"
        />
      </div>
        
      <div className="flex-1 h-screen p-24 flex flex-col gap-8">
        <div className="flex gap-8 mx-auto">
          <Image
            src={accountLogo}
            width={139}
            height={69}
            alt="Logo Client"
          />

          <span className="my-auto">X</span>

          <Image
            src={Logo}
            width={139}
            height={69}
            alt="Logo DeepMobility"
          />
        </div>

        <div className="bg-gray-100 rounded-3xl p-6">
          {children}
        </div>
      </div>
    </div>
  );
}
