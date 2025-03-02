'use client'

import Form from 'next/form'
import { useActionState, useEffect } from 'react'
import { register } from './actions'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage({ birthYearOptions, genderOptions }: {
  birthYearOptions: Array<number>
  genderOptions: Array<{ value: string, label: string }>
}) {
  const router = useRouter()

  const initialState = { isComplete: false, errorMessage: "" }

  const [formState, formAction] = useActionState(register, initialState)

  useEffect(() => {
    if (formState?.isComplete) {
      router.push('/')
    }
  }, [formState])

  return (
    <div>
      <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
        <Link href="/auth/login" className='flex-1 text-center px-auto py-2 text-gray-700'>Connexion</Link>
        <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>Inscription</div>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" required/>
        </div>

        <div className='flex gap-4'>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="name">Prénom</label>
            <input type="text" name="firstName" />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="name">Nom</label>
            <input type="text" name="lastName" />
          </div>
        </div>

        <div className='flex gap-4'>
          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="birthYear">Année de naissance</label>
            <select name="birthYear">
              <option value=""></option>
              {birthYearOptions.map((year) => (
               <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="gender">Genre</label>
            <select name="gender">
              <option value=""></option>
              {genderOptions.map((gender) => (
               <option key={gender.value} value={gender.value}>{gender.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" required/>
        </div>

        {formState?.errorMessage && (
          <p className='text-red-500'>{formState.errorMessage}</p>
        )}

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>S'inscrire</button>
      </Form>
    </div>
  )
}