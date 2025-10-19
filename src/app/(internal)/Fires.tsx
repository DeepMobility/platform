import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react'

const newIncentives = [
  "Commencez votre parcours sur mesure DeepMobility.",
  "C'est le bon moment pour commencer. Une routine suffit pour lancer votre progression.",
  "Vous n'avez pas encore bougé cette semaine. Lancez-vous, il suffit de 6 minutes pour faire la différence.",
  "Tout commence ici. Lancez votre parcours sur mesure DeepMobility avec une première routine simple et efficace.",
]

export default function({
  dailySessionDone,
  dailyVideoCourseIndex,
}: {
  dailySessionDone: boolean,
  dailyVideoCourseIndex: number,
}) {
  const [randomIndex, setRandomIndex] = useState(0)
  
  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * newIncentives.length))
  }, [])

  const incentive = useMemo(() => {
    if (dailySessionDone) {
      if (dailyVideoCourseIndex === 0) {
        return "Bravo, première routine validée ! Plus que 4 cette semaine. Ce cycle revient chaque semaine pendant le trimestre."
      } else if (dailyVideoCourseIndex === 1) {
        return "Bien joué ! 2 sur 5. Encore 3 routines cette semaine pour valider votre cycle hebdo."
      } else if (dailyVideoCourseIndex === 2) {
        return "Vous tenez le rythme ! 2 routines restantes pour finaliser la semaine. Même objectif la semaine prochaine."
      } else if (dailyVideoCourseIndex === 3) {
        return "Dernier effort ! Une routine et votre parcours hebdo est validé. Recommencez ce cycle chaque semaine."
      } else if (dailyVideoCourseIndex === 4) {
        return "Parcours terminé pour cette semaine. Répétez-le chaque semaine pour ancrer votre routine sur tout le trimestre."
      }
    }

    if (dailyVideoCourseIndex === 0) {
      return newIncentives[randomIndex]
    } else {
      return `Poursuivez encore ${5 - dailyVideoCourseIndex} jours consécutifs pour réaliser votre parcours complet.`
    }
  }, [dailySessionDone, dailyVideoCourseIndex, randomIndex])

  return (
    <div className="flex-1 flex flex-col gap-2 justify-around">
      <div className="flex gap-4 items-center">
        <Image
          src={`/fire.svg`}
          width={35} height={50}
          className={`w-[35px] h-[50px] ${!dailySessionDone ? "brightness-[0.7]" : ""}`}
          alt="Série flamme"
        />
        <div className="font-semibold">
          Routine {dailySessionDone ? dailyVideoCourseIndex + 1 : dailyVideoCourseIndex} / 5
        </div>
      </div>
      <div className="font-light">
        {incentive}
      </div>
    </div>
  )
}