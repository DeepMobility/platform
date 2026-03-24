'use client'

import Form from 'next/form'
import { useActionState, useState } from 'react'
import { completeInvitation } from './actions'
import { useTranslations } from 'next-intl'

export default function InvitationPage({
  token,
  email,
  birthYearOptions,
  genderOptions
}: {
  token: string
  email: string
  birthYearOptions: Array<number>
  genderOptions: Array<{ value: string, label: string }>
}) {
  const t = useTranslations('auth')
  const initialState = { isComplete: false, redirectUrl: "", errorMessage: "" }
  const [formState, formAction] = useActionState(completeInvitation, initialState)
  const [showPassword, setShowPassword] = useState(false)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [birthYear, setBirthYear] = useState('')
  const [gender, setGender] = useState('')
  const [password, setPassword] = useState('')

  if (formState?.isComplete && formState.redirectUrl) {
    window.location.href = formState.redirectUrl;
    return (
      <div className='flex flex-col gap-4 text-center'>
        <p className='text-lg'>{t('registrationConfirmed')}</p>
      </div>
    );
  }

  return (
    <div className='flex flex-col'>
      <div className='bg-gray-200 p-4 rounded-3xl text-center'>
        <div className='bg-gray-500 text-center py-2 rounded-2xl text-white'>{t('completeRegistration')}</div>
      </div>

      <Form action={formAction} className="mt-8 flex flex-col gap-6">
        <input type="hidden" name="token" value={token} />

        <div className="flex flex-col gap-2">
          <label htmlFor="email">{t('email')}</label>
          <input
            type="text"
            id="email"
            value={email}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
          <p className="text-sm text-gray-600">{t('emailCannotBeModified')}</p>
        </div>

        <div className='flex gap-4 flex-wrap'>
          <div className="flex-1 flex flex-col gap-2 min-w-[170px]">
            <label htmlFor="firstName">{t('firstName')}</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="flex-1 flex flex-col gap-2 min-w-[170px]">
            <label htmlFor="lastName">{t('lastName')}</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
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
              required
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
              required
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

        <button
          type="submit"
          className='bg-gray-500 text-white p-2 rounded-2xl hover:bg-gray-600 transition-colors'
        >
          {t('validateRegistration')}
        </button>
      </Form>
    </div>
  )
}
