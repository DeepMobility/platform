import { getTranslations } from "next-intl/server";

export default async function() {
  const t = await getTranslations('legal')

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-3xl">{t('mentionsLegalesTitle')}</h1>

      <p>
        {t('mentionsLegalesHosting')}
      </p>

      <div>
        <div className="flex gap-2">
          <span className="font-bold">{t('denomination')}</span>
          <span>{t('denominationValue')}</span>
        </div>
        <div className="flex gap-2">
          <span className="font-bold">{t('addressLabel')}</span>
          <span>{t('addressValue')}</span>
        </div>
      </div>
    </div>
  )
}
