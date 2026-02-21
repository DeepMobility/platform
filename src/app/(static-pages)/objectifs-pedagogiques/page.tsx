import courses from "@/lib/courses";
import { getTranslations } from "next-intl/server";

export default async function() {
  const t = await getTranslations('legal')
  const tCourses = await getTranslations('content.courses')

  return (
    <div>
      <h1 className="font-bold text-3xl">{t('coursesTitle')}</h1>

      <ul className="flex flex-col gap-6 mt-8">
        {courses.map(course => (
          <li key={course.value}>
            <h2 className="font-bold text-2xl underline">{tCourses(`${course.value}.label`)}</h2>

            <ul className="flex flex-col gap-6 mt-4">
              {Array.from({ length: course.videoCount }, (_, index) => (
                <li key={index}>
                  <h3 className="font-bold text-xl">{index + 1}/ {tCourses(`${course.value}.videos.${index}.title`)}</h3>

                  <div className="pl-4">
                    <h4 className="font-bold text-lg mt-2">{t('pedagogicalObjectives')}</h4>
                    <ul className="flex flex-col gap-4 mt-1">
                      {Array.from({ length: 4 }, (_, objIndex) => {
                        const title = tCourses.has(`${course.value}.videos.${index}.objectives.${objIndex}.title`)
                          ? tCourses(`${course.value}.videos.${index}.objectives.${objIndex}.title`)
                          : null
                        if (!title) return null
                        return (
                          <li key={objIndex}>
                            <span className="underline">{title}</span>
                            <span> : {tCourses(`${course.value}.videos.${index}.objectives.${objIndex}.description`)}</span>
                          </li>
                        )
                      })}
                    </ul>

                    <h4 className="font-bold text-lg mt-3">{t('targetedSkills')}</h4>
                    <ul className="flex flex-col gap-4 mt-1">
                      {Array.from({ length: 3 }, (_, skillIndex) => {
                        const skill = tCourses.has(`${course.value}.videos.${index}.skills.${skillIndex}`)
                          ? tCourses(`${course.value}.videos.${index}.skills.${skillIndex}`)
                          : null
                        if (!skill) return null
                        return (
                          <li key={skillIndex}>
                            {skill}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  )
}
