export default async function ConnectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="max-w-[800px] sm:mx-auto sm:mt-6 bg-gray-100 sm:rounded-xl p-6">
      {children}
    </div>
  )
}