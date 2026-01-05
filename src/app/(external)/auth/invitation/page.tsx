import { redirect } from 'next/navigation';
import InvitationPage from './InvitationPage';
import { unauthenticatedPost } from '@/lib/httpMethods';

export default async function Invitation({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const params = await searchParams;
  const token = params.token;

  if (!token) {
    redirect('/auth/login');
  }

  // Validate the invitation token
  const validation = await unauthenticatedPost('validate-invitation', { token });

  if (validation.statusCode === 401 || !validation.email) {
    redirect('/auth/login?error=invalid-invitation');
  }

  const birthYearOptions = []
  for (let i = 1930; i<= 2015; i++) {
    birthYearOptions.push(i)
  }

  const genderOptions = [{
    value: 'woman',
    label: 'Femme',
  }, {
    value: 'man',
    label: 'Homme',
  }, {
    value: 'other',
    label: 'Autre',
  }, {
    value: 'secret',
    label: 'Ne sait pas',
  }]

  return (
    <InvitationPage
      token={token}
      email={validation.email}
      birthYearOptions={birthYearOptions.reverse()}
      genderOptions={genderOptions}
    />
  )
}

