import { getTranslations } from "next-intl/server";

export default async function() {
  const t = await getTranslations('legal')

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{t('privacyTitle')}</h1>

      <h2 className="font-bold text-xl">{t('privacySubtitle')}</h2>

      <p>
        {t('privacyContent')}
      </p>
    </div>
  )
}
