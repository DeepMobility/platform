'use client'

import Form from "next/form"
import { newPassword } from "./actions"

export default function NewPasswordPage({ token }: { token: string }) {
  const submitPassword = async function(formData: FormData) {
    return newPassword(formData, token)
  }

  return (
    <div className="flex flex-col">
      <Form action={submitPassword} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="newPassword">Nouveau mot de passe</label>
          <input type="password" name="newPassword"/>
        </div>
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>Sauvegarder</button>
      </Form>
    </div>
  )
}