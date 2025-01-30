'use client'

import Form from "next/form"
import { updateMyOtherThematicInterest } from "./actions"
import otherThematicInterests from "@/lib/otherThematicInterests"

export default function OtherThematicInterestPage() {
  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 3/3</h1>

      <Form action={updateMyOtherThematicInterest} className="mt-4 flex flex-col gap-6">
        <p>3. Quelles thématiques vous intéressent pour explorer d’autres routines à l’avenir ?</p>

        <div className="flex flex-col gap-4">
          {otherThematicInterests.map((thematic) => (
            <div className="flex gap-2" key={thematic.value}>
              <input type="radio" name="thematic" id={thematic.value} value={thematic.value} required/>
              <label htmlFor={thematic.value}>{thematic.label}</label>
            </div>
          ))}
        </div>
        
        <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl ml-auto'>Terminer</button>
      </Form>
    </div>
  )
}