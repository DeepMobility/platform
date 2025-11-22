import AutologinPage from './AutologinPage';

export default async function Autologin({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const params = await searchParams;
  const token = params.token || '';

  return <AutologinPage token={token} />;
}

