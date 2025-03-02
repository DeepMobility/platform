import { useRouter } from 'next/navigation';
import NewPasswordPage from './NewPasswordPage';

export default async function NewPassword({
  searchParams
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const token = (await searchParams).token as string

  return <NewPasswordPage token={token}/>
}