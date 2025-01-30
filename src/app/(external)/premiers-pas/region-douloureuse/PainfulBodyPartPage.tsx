'use client'

import Form from "next/form"
import { updateMyPainfulBodyPart } from "./actions"
import { MdArrowForward } from "react-icons/md"
import painfulBodyParts from "@/lib/painfulBodyParts"

export default function PainfulBodyPartPage() {
  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 2/3</h1>

      <Form action={updateMyPainfulBodyPart} className="mt-4 flex flex-col gap-6">
        <p>2. Quelle partie de votre corps vous semble la plus tendue ou inconfortable en ce moment ?</p>

        <div className="flex flex-col gap-4">
          {painfulBodyParts.map((bodyPart) => (
            <div className="flex gap-2" key={bodyPart.value}>
              <input type="radio" name="bodyPart" id={bodyPart.value} value={bodyPart.value} required/>
              <label htmlFor={bodyPart.value}>{bodyPart.label}</label>
            </div>
          ))}
        </div>
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2 ml-auto'>
          <span>Question suivante</span>
          <MdArrowForward size="24px" className="my-auto"/>
        </button>
      </Form>
    </div>
  )
}