'use client'

import Form from "next/form"
import { updateMyOtherThematicInterests } from "./actions"
import otherThematicInterests from "@/lib/otherThematicInterests"
import { useRouter } from "next/navigation"

export default function OtherThematicInterestsPage({ userOtherThematicInterests }: {
  userOtherThematicInterests: string[]
}) {
  const router = useRouter()

  const updateThematics = async (formData: FormData) => {
    await updateMyOtherThematicInterests(formData);

    router.push('/')
  }
  
  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 3/3</h1>

      <Form action={updateThematics} className="mt-4 flex flex-col gap-6">
        <p>3. Quelles thématiques vous intéressent pour explorer d’autres routines à l’avenir ?</p>

        <div className="flex flex-col gap-4">
          {otherThematicInterests.map((thematic) => (
            <div className="flex gap-2" key={thematic.value}>
              <input type="checkbox" name="thematics" id={thematic.value} value={thematic.value}
                defaultChecked={userOtherThematicInterests.includes(thematic.value)}
              />
              <label htmlFor={thematic.value}>{thematic.label}</label>
            </div>
          ))}
        </div>

        <div className="flex gap-8 ml-auto">
          <button type="button" className='p-2 text-gray-500 rounded-2xl'
            onClick={() => router.push('/premiers-pas/regions-douloureuses')}
          >
            Retour
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl ml-auto'>Terminer</button>
        </div>
        
      </Form>
    </div>
  )
}