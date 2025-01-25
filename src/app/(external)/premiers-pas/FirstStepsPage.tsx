'use client'

import Form from "next/form"
import { updateUserJobType } from "./actions"
import jobTypes from "@/lib/jobTypes"

export default function FirstStepsPage() {
  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance !</h1>

      <Form action={updateUserJobType} className="mt-8 flex flex-col gap-6">
        <p>Quel est votre type de job ?</p>

        {jobTypes.map((jobType) => (
          <div className="flex gap-2" key={jobType.value}>
            <input type="radio" name="jobType" id={jobType.value} value={jobType.value} required/>
            <label htmlFor={jobType.value}>{jobType.label}</label>
          </div>
        ))}
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl'>Accéder aux vidéos</button>
      </Form>
    </div>
  )
}