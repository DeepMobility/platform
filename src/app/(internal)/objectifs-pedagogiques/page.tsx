import courses from "@/lib/courses";


export default function Objectives() {
  return (
    <div className="max-w-[800px] mx-auto">
      <h1 className="font-bold text-3xl">Contenu des parcours</h1>

      <ul className="flex flex-col gap-6 mt-8">
        {courses.map(course => (
          <li key={course.value}>
            <h2 className="font-bold text-2xl underline">{course.label}</h2>

            <ul className="flex flex-col gap-6 mt-4">
              {course.videos?.map((video, index) => (
                <li key={video.title}>
                  <h3 className="font-bold text-xl">{index + 1}/ {video.title}</h3>

                  <div className="pl-4">
                    <h4 className="font-bold text-lg mt-2">Objectifs pédagogiques</h4>
                    <ul className="flex flex-col gap-4 mt-1">
                      {video.objectives.map(objective => (
                        <li key={objective.title}>
                          <span className="underline">{objective.title}</span>
                          <span> : {objective.description}</span>
                        </li>
                      ))}
                    </ul>

                    <h4 className="font-bold text-lg mt-3">Compétences visées</h4>
                    <ul className="flex flex-col gap-4 mt-1">
                      {video.skills.map((skill, index) => (
                        <li key={"skill" + index}>
                          {skill}
                        </li>
                      ))}
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