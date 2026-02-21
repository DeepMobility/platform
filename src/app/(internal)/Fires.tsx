import Image from 'next/image'
import { useMemo, useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'

export default function Fires({
  dailySessionDone,
  dailyVideoCourseIndex,
}: {
  dailySessionDone: boolean,
  dailyVideoCourseIndex: number,
}) {
  const t = useTranslations('home')
  const [randomIndex, setRandomIndex] = useState(0)

  const newIncentiveKeys = ['newIncentive1', 'newIncentive2', 'newIncentive3', 'newIncentive4'] as const

  useEffect(() => {
    setRandomIndex(Math.floor(Math.random() * newIncentiveKeys.length))
  }, [])

  const incentive = useMemo(() => {
    if (dailySessionDone) {
      if (dailyVideoCourseIndex === 0) {
        return t('doneIncentive1')
      } else if (dailyVideoCourseIndex === 1) {
        return t('doneIncentive2')
      } else if (dailyVideoCourseIndex === 2) {
        return t('doneIncentive3')
      } else if (dailyVideoCourseIndex === 3) {
        return t('doneIncentive4')
      } else if (dailyVideoCourseIndex === 4) {
        return t('doneIncentive5')
      }
    }

    if (dailyVideoCourseIndex === 0) {
      return t(newIncentiveKeys[randomIndex])
    } else {
      return t('continueForDays', { days: 5 - dailyVideoCourseIndex })
    }
  }, [dailySessionDone, dailyVideoCourseIndex, randomIndex, t])

  return (
    <div className="flex-1 flex flex-col gap-2 justify-around">
      <div className="flex gap-4 items-center">
        <Image
          src={`/fire.svg`}
          width={35} height={50}
          className={`w-[35px] h-[50px] ${!dailySessionDone ? "brightness-[0.7]" : ""}`}
          alt={t('flameSeriesAlt')}
        />
        <div className="font-semibold">
          {t('routineCount', { current: dailySessionDone ? dailyVideoCourseIndex + 1 : dailyVideoCourseIndex })}
        </div>
      </div>
      <div className="font-light">
        {incentive}
      </div>
    </div>
  )
}
