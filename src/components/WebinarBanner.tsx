'use client'

import { useTranslations, useFormatter } from 'next-intl'

interface WebinarBannerProps {
  webinar: {
    id: string
    title: string
    scheduledAt: string
    teamsLink: string
    registrationLink: string | null
    status: 'upcoming' | 'ongoing' | 'soon'
  }
}

export default function WebinarBanner({ webinar }: WebinarBannerProps) {
  const t = useTranslations('webinar')
  const format = useFormatter()
  const scheduledDate = new Date(webinar.scheduledAt)

  const formatDate = (date: Date) => {
    return format.dateTime(date, { day: '2-digit', month: '2-digit' })
  }

  const formatTime = (date: Date) => {
    return format.dateTime(date, { hour: '2-digit', minute: '2-digit' }).replace(':', 'h')
  }

  // Webinar is ongoing or starting soon - show join button
  if (webinar.status === 'ongoing' || webinar.status === 'soon') {
    return (
      <div className="w-full bg-deepmobility-100 border border-deepmobility-200 rounded-3xl p-4 flex flex-col items-center gap-2">
        <div className="text-deepmobility-700 font-medium text-center">
          🟢 🎬 {t('ongoing')}
        </div>
        <a
          href={webinar.teamsLink}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-deepmobility-500 hover:bg-deepmobility-600 text-white py-2 px-6 rounded-xl transition-colors font-medium"
        >
          {t('joinWebinar')}
        </a>
      </div>
    )
  }

  // Webinar is upcoming
  if (webinar.registrationLink) {
    // Has registration link - show registration CTA
    return (
      <div className="w-full bg-deepmobility-50 border border-deepmobility-200 rounded-3xl p-4 flex items-center justify-center">
        <div className="text-deepmobility-700 text-center">
          <span dangerouslySetInnerHTML={{ __html: '🎬 ' + t.markup('upcomingWithRegistration', { title: webinar.title, date: formatDate(scheduledDate), time: formatTime(scheduledDate), strong: (chunks) => `<strong>${chunks}</strong>` }) }} />
          <a
            href={webinar.registrationLink}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-fit mx-auto mt-2 font-semibold bg-deepmobility-700 text-white py-1 px-5 rounded-2xl hover:bg-deepmobility-600 transition-colors text-sm"
          >
            {t('registerWebinar')}
          </a>
        </div>
      </div>
    )
  }

  // No registration link - just announce the webinar
  return (
    <div className="w-full bg-deepmobility-50 border border-deepmobility-200 rounded-3xl p-4 flex items-center justify-center">
      <div className="text-deepmobility-700 text-center"
        dangerouslySetInnerHTML={{ __html: '🎬 ' + t.markup('upcoming', { title: webinar.title, date: formatDate(scheduledDate), time: formatTime(scheduledDate), strong: (chunks) => `<strong>${chunks}</strong>` }) }}
      />
    </div>
  )
}
