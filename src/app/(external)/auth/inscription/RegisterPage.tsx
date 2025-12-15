'use client'

import Form from 'next/form'
import { useActionState, useEffect, useState } from 'react'
import { register } from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage({ birthYearOptions, genderOptions }: {
  birthYearOptions: Array<number>
  genderOptions: Array<{ value: string, label: string }>
}) {
  const initialState = { isComplete: false, emailSent: false, errorMessage: "" }

  const [formState, formAction] = useActionState(register, initialState)
  const [showPassword, setShowPassword] = useState(false)
  
  // États pour conserver les valeurs du formulaire
  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

  // Si l'email a été envoyé, afficher le message de confirmation
  if (formState?.isComplete && formState?.emailSent) {
    return (
      <div>
        <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
          <Link href="/auth/login" className='flex-1 text-center px-auto py-2 text-gray-700'>Connexion</Link>
          <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>Inscription</div>
        </div>

        <div className='mt-8 p-6 bg-green-50 border border-green-200 rounded-lg'>
          <h2 className='text-xl font-semibold text-green-800 mb-4'>Inscription réussie !</h2>
          <p className='text-green-700 mb-4'>
            Un email de confirmation vous a été envoyé. Veuillez cliquer sur le lien dans l'email pour accéder à la plateforme.
          </p>
          <p className='text-green-600 text-sm'>
            Si vous ne recevez pas l'email dans les prochaines minutes, vérifiez votre dossier spam.
          </p>
        </div>

        <div className='mt-4 text-center'>
          <Link href="/auth/login" className='btn btn-link hover:underline'>
            Retour à la connexion
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
        <Link href="/auth/login" className='flex-1 text-center px-auto py-2 text-gray-700'>Connexion</Link>
        <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>Inscription</div>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email"
            name="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className='flex gap-4 flex-wrap'>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="firstName">Prénom</label>
            <input 
              type="text" 
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="lastName">Nom</label>
            <input 
              type="text" 
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>

        <div className='flex gap-4 flex-wrap'>
          <div className="flex-1 flex flex-col gap-2 min-w-[170px]">
            <label htmlFor="birthYear">Année de naissance</label>
            <select 
              id="birthYear"
              name="birthYear"
              value={birthYear}
              onChange={(e) => setBirthYear(e.target.value)}
            >
              <option value=""></option>
              {birthYearOptions.map((year) => (
               <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-[170px]">
            <label htmlFor="gender">Genre</label>
            <select 
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value=""></option>
              {genderOptions.map((option) => (
               <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mot de passe</label>
          <input 
            type={showPassword ? "text" : "password"} 
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className='flex gap-2'>
            <input 
              id="showPassword" 
              type="checkbox" 
              checked={showPassword}
              onChange={() => setShowPassword(!showPassword)} 
            />
            <label htmlFor="showPassword">Afficher le mot de passe</label>
          </div>
        </div>

        {formState?.errorMessage && (
          <p className='text-red-500'>{formState.errorMessage}</p>
        )}

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>S'inscrire</button>
      </Form>
    </div>
  )
}