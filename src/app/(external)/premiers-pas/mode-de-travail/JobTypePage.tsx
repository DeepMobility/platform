'use client'

import Form from "next/form"
import { updateMyJobType } from "./actions"
import jobTypes from "@/lib/jobTypes"
import { MdArrowForward } from "react-icons/md"

export default function JobTypePage({ userJobType }: { userJobType: string | undefined }) {
  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 1/3</h1>

      <Form action={updateMyJobType} className="mt-4 flex flex-col gap-6">
        <p>1. Quelle est votre activité principale au travail ?</p>

        <div className="flex flex-col gap-4">
          {jobTypes.map((jobType) => (
            <div className="flex gap-2" key={jobType.value}>
              <input type="radio" name="jobType" id={jobType.value} value={jobType.value} required
                defaultChecked={userJobType === jobType.value}
              />
              <label htmlFor={jobType.value}>{jobType.label}</label>
            </div>
          ))}
        </div>
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2 ml-auto'>
          <span>Question suivante</span>
          <MdArrowForward size="24px"/>
        </button>
      </Form>
    </div>
  )
}