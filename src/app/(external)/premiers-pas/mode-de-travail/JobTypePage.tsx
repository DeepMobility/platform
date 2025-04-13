'use client'

import Form from "next/form"
import { updateMyJobType } from "./actions"
import jobTypes from "@/lib/jobTypes"
import { MdArrowForward } from "react-icons/md"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import AppModal from "@/components/AppModal"
import Image from 'next/image'
import Logo from "@/../public/logo.svg";

export default function JobTypePage({ userJobType }: { userJobType: string | undefined }) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [welcome, setWelcome] = useState(searchParams.get('welcome'))

  const removeWelcome = () => {
    router.replace('/premiers-pas/mode-de-travail');
    setWelcome(null);
  }

  const updateJob = async (formData: FormData) => {
    await updateMyJobType(formData);

    router.push('/premiers-pas/regions-douloureuses')
  }

  return (
    <div>
      <h1 className="font-bold text-xl">Faisons connaissance ! 1/3</h1>

      {welcome && (
        <AppModal closeModal={removeWelcome}>
          <div className="bg-[#A89B93] gap-4 flex flex-col items-center justify-around p-4 w-[600px] md:h-[400px] rounded-3xl m-6 text-center">
            <Image
              src={Logo}
              width={150}
              height={120}
              alt="Logo DeepMobility"
              className="w-[150px] h-[120px]"
            />

            <div className="font-bold text-2xl">
              Bienvenue sur DeepMobility. 
            </div>

            <div className="text-lg">
              Prenons quelques instants pour faire connaissance et <b>définir ensemble votre parcours sur mesure</b>.
            </div>

            <button
              type="button"
              onClick={removeWelcome}
              className='bg-gray-500 text-white py-2 px-6 rounded-2xl'
            >
              Commencer
            </button>
          </div>
        </AppModal>
      )}

      <Form action={updateJob} className="mt-4 flex flex-col gap-6">
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