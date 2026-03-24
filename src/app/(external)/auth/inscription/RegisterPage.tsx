'use client'

import Form from 'next/form'
import { useActionState, useState } from 'react'
import { register } from './actions'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function RegisterPage({ birthYearOptions, genderOptions }: {
  birthYearOptions: Array<number>
  genderOptions: Array<{ value: string, label: string }>
}) {
  const t = useTranslations('auth')
  const initialState = { isComplete: false, emailSent: false, errorMessage: "" }

  const [formState, formAction] = useActionState(register, initialState)
  const [showPassword, setShowPassword] = useState(false)

  const [email, setEmail] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

  if (formState?.isComplete && formState?.emailSent) {
    return (
      <div>
        <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
          <Link href="/auth/login" className='flex-1 text-center px-auto py-2 text-gray-700'>{t('login')}</Link>
          <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>{t('register')}</div>
        </div>

        <div className='mt-8 p-6 bg-green-50 border border-green-200 rounded-lg'>
          <h2 className='text-xl font-semibold text-green-800 mb-4'>{t('registerSuccess')}</h2>
          <p className='text-green-700 mb-4'>
            {t('registerEmailSent')}
          </p>
          <p className='text-green-600 text-sm'>
            {t('checkSpam')}
          </p>
        </div>

        <div className='mt-4 text-center'>
          <Link href="/auth/login" className='btn btn-link hover:underline'>
            {t('backToLogin')}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div className='flex justify-between bg-gray-200 p-4 rounded-3xl gap-2'>
        <Link href="/auth/login" className='flex-1 text-center px-auto py-2 text-gray-700'>{t('login')}</Link>
        <div className='flex-1 bg-gray-500 text-center py-2 rounded-2xl text-white'>{t('register')}</div>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t('email')}</label>
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
            <label htmlFor="firstName">{t('firstName')}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="flex-1 flex flex-col gap-2">
            <label htmlFor="lastName">{t('lastName')}</label>
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
            <label htmlFor="birthYear">{t('birthYear')}</label>
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
            <label htmlFor="gender">{t('gender')}</label>
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
          <label htmlFor="password">{t('password')}</label>
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
            <label htmlFor="showPassword">{t('showPassword')}</label>
          </div>
        </div>

        {formState?.errorMessage && (
          <p className='text-red-500'>{t(formState.errorMessage)}</p>
        )}

        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>{t('signUp')}</button>
      </Form>
    </div>
  )
}
