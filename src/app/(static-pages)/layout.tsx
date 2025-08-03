import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

export default async function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[800px] flex flex-col gap-4 sm:mx-auto sm:mt-6">
      <Link
        href="/"
        className="hidden sm:flex hover:underline gap-2 items-center"
      >
        <MdArrowBack />
        <span>Retour</span>
      </Link>

      <div className="flex flex-col gap-4 bg-gray-100 sm:rounded-xl p-6">
        <Link
          href="/"
          className="flex sm:hidden hover:underline gap-2 items-center"
        >
          <MdArrowBack />
          <span>Retour</span>
        </Link>

        {children}
      </div>
    </div>
  )
}