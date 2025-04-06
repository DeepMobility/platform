import { useMemo } from "react"
import Image from 'next/image'

export default function({
  dailyActivity,
  yesterdayActivity,
  daysInARow,
}: {
  dailyActivity: boolean,
  yesterdayActivity: boolean,
  daysInARow: number,
}) {
  const daysInARowIncitation = useMemo(() => {
    if (!dailyActivity && !yesterdayActivity) {
      return {
        title: "Lancez une vidéo dès aujourd'hui !",
        incitation: "Faites une première session aujourd’hui pour allumer la flamme du changement. Chaque mouvement compte."
      }
    }

    if (dailyActivity) {
      if (daysInARow === 1) {
        return {
          title: "Série de 1 jour !",
          incitation: "Bravo, première flamme allumée ! C’est le début d’une belle routine. Continuez à prendre soin de vous."
        }
      } else {
        return {
          title: `Série de ${daysInARow} jours !`,
          incitation: `${daysInARow} jours de suite, c’est une vraie victoire ! Vous êtes en train d’ancrer une habitude positive et durable.`
        }
      }
    }

    if (yesterdayActivity) {
      if (daysInARow === 1) {
        return {
          title: "Série de 1 jour !",
          incitation: "Lancez une vidéo aujourd'hui pour continuer dans votre lancée et créer une nouvelle habitude."
        }
      } else {
        return {
          title: `Série de ${daysInARow} jours !`,
          incitation: "Continuez votre nouvelle habitude en lancant une vidéo aujourd'hui, la régularité est la clef."
        }
      }
    }
  }, [dailyActivity, daysInARow])

  return (
    <div className="flex flex-col gap-2 justify-around">
      <div className="flex gap-4 items-center">
        <Image
          src={`/fire.svg`}
          width={35} height={50}
          className={`w-[35px] h-[50px] ${!dailyActivity ? "brightness-90" : ""}`}
          alt="Série flamme"
        />
        <div className="font-semibold">
          {daysInARowIncitation?.title}
        </div>
      </div>
      <div className="font-light">
        {daysInARowIncitation?.incitation}
      </div>
    </div>
  )
}