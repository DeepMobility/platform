import Link from 'next/link'

export default async function TokenSent() {
  return (
    <div className="flex flex-col">
      <span>
        Un email pour modifier votre mot de passe vous a été envoyé à l'adresse renseignée.
      </span>

      <Link
        href="/auth/login"
        className='mt-4 mx-auto underline'
      >
        Retour au login
      </Link>
    </div>
  )
}