'use client'

import Form from 'next/form'
import { login } from './actions'

export default function LoginPage() {
  return (
    <div className="flex h-screen">
      <Form action={login} className="flex flex-col w-[300px] m-auto gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">Email</label>
          <input type="text" name="email" className="border-black border-2"/>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="password">Mot de passe</label>
          <input type="password" name="password" className="border-black border-2"/>
        </div>
        
        <button type="submit">Login</button>
      </Form>
    </div>
  )
}