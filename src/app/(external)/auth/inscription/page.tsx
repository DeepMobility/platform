import RegisterPage from './RegisterPage';

export default async function Register() {
  const birthYearOptions = []

  for (let i = 1950; i<= 2010; i++) {
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
    label: 'Ne préfère pas dire',
  }]

  return <RegisterPage
    birthYearOptions={birthYearOptions.reverse()}
    genderOptions={genderOptions}
  />
}