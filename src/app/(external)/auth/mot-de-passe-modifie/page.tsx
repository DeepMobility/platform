import Link from 'next/link'

export default async function PasswordUpdated() {
  return (
    <div className="flex flex-col">
      <span className=' mx-auto'>
        Votre mot de passe a été mis à jour.
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