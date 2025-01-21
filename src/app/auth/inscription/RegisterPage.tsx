'use client'

import Form from 'next/form'
import { useActionState } from 'react'
import { register } from './actions'

export default function RegisterPage({ birthYearOptions, genderOptions }: {
  birthYearOptions: Array<number>
  genderOptions: Array<{ value: string, label: string }>
}) {
  const initialErrorState = { message: "" }

  const [formState, formAction] = useActionState(register, initialErrorState)

  return (
    <div className="flex h-screen">
      <Form action={formAction} className="flex flex-col w-[300px] m-auto gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Email</label>
          <input type="text" name="email" className="border-black border-2" required/>
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Prénom</label>
            <input type="text" name="firstName" className="border-black border-2"/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="name">Nom</label>
            <input type="text" name="lastName" className="border-black border-2"/>
          </div>
        </div>

        <div>
          <div className="flex flex-col gap-2">
            <label htmlFor="birthYear">Année de naissance</label>
            <select name="birthYear">
              <option value=""></option>
              {birthYearOptions.map((year) => (
               <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
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
          <input type="password" name="password" className="border-black border-2" required/>
        </div>

        <button type="submit">Ajouter</button>

        {formState?.message && (
          <p className='text-red-500'>{formState.message}</p>
        )}
      </Form>
    </div>
  )
}