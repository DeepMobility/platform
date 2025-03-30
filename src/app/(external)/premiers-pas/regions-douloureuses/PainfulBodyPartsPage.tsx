'use client'

import Form from "next/form"
import { updateMyPainfulBodyPart } from "./actions"
import { MdArrowForward } from "react-icons/md"
import painfulBodyParts from "@/lib/painfulBodyParts"
import { useRouter } from 'next/navigation'

export default function PainfulBodyPartPages({ userPainfulBodyParts }: { userPainfulBodyParts: string[] }) {
  const router = useRouter()

  const updateBodyParts = async (formData: FormData) => {
    await updateMyPainfulBodyPart(formData);

    router.push('/premiers-pas/autre-interets')
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 2/3</h1>

      <Form action={updateBodyParts} className="mt-4 flex flex-col gap-6">
        <p>2. Quelles parties de votre corps vous semblent les plus tendues ou inconfortables en ce moment ?</p>

        <div className="grid grid-cols-2 gap-2">
          {painfulBodyParts.map((bodyPart) => (
            <div className="flex gap-2" key={bodyPart.value}>
              <input type="checkbox" name="bodyParts" id={bodyPart.value} value={bodyPart.value}
                defaultChecked={userPainfulBodyParts.includes(bodyPart.value)}
              />
              <label htmlFor={bodyPart.value}>{bodyPart.label}</label>
            </div>
          ))}
        </div>

        <div className="flex gap-8 ml-auto">
          <button type="button" className='p-2 text-gray-500 rounded-2xl'
            onClick={() => router.push('/premiers-pas/mode-de-travail')}
          >
            Retour
          </button>

          <button type="submit" className='bg-gray-500 text-white p-2 rounded-2xl flex gap-2'>
            <span>Question suivante</span>
            <MdArrowForward size="24px" className="my-auto"/>
          </button>
        </div>
      </Form>
    </div>
  )
}