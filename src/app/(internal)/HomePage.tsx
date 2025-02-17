'use client'

import courses from "@/lib/courses";
import formatDuration from "@/lib/durationFormatter";
import exerciseTypes from "@/lib/exerciseTypes";
import painfulBodyParts from "@/lib/painfulBodyParts";
import Image from 'next/image'

import { useMemo, useState } from "react";
import { MdOndemandVideo, MdOutlineVideoLibrary, MdArrowForward } from "react-icons/md";
import { PiClock, PiPathFill } from "react-icons/pi";

export default function HomePage({ name, dailyVideo, randomTip, course, courseVideos, videos }: {
  name: string,
  dailyVideo: Video,
  randomTip: { value: string, source: string }
  course: string,
  courseVideos: Array<Video>,
  videos: Array<Video>
}) {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const [displayVideoDescription, setDisplayVideoDescription] = useState(false)
  const [displayVideo, setDisplayVideo] = useState(false)

  const showVideoDescription = function(video: Video) {
    setDisplayVideoDescription(true)
    setSelectedVideo(video)
  }

  const playVideo = function() {
    setDisplayVideoDescription(false)
    setDisplayVideo(true)
  }

  const closeVideo = function() {
    setDisplayVideoDescription(false)
    setDisplayVideo(false)
    setSelectedVideo(null)
  }

  const [allVideoFilter, setAllVideoFilter] = useState<boolean>(false)
  const [bodyPartFilters, setBodyPartFilters] = useState<string[]>([])
  const [exerciseTypeFilters, setExerciseTypeFilters] = useState<string[]>([])

  const toggleAllVideoFilter = function(e: React.ChangeEvent<HTMLInputElement >) {
    if (e.target.checked) {
      setBodyPartFilters([])
      setExerciseTypeFilters([])
    }

    setAllVideoFilter(e.target.checked)
  }

  const updateBodyPartFilters = function(e: React.ChangeEvent<HTMLInputElement >) {
    if (e.target.checked) {
      setBodyPartFilters(bodyPartFilters.concat([e.target.value]))
    } else {
      setBodyPartFilters(bodyPartFilters.filter((bodyPart) => bodyPart !== e.target.value))
    }
    setAllVideoFilter(false)
  }

  const updateExerciseTypeFilters = function(e: React.ChangeEvent<HTMLInputElement >) {
    if (e.target.checked) {
      setExerciseTypeFilters(exerciseTypeFilters.concat([e.target.value]))
    } else {
      setExerciseTypeFilters(exerciseTypeFilters.filter((type) => type !== e.target.value))
    }
    setAllVideoFilter(false)
  }

  const filteredVideos = useMemo(
    () => {
      let filteredVideos = videos

      if (bodyPartFilters.length) {
        filteredVideos = filteredVideos.filter(
          video => bodyPartFilters.some(bodyPart => video.bodyParts.includes(bodyPart))
        )
      }

      if (exerciseTypeFilters.length) {
        filteredVideos = filteredVideos.filter(
          video => exerciseTypeFilters.some(type => video.exerciseTypes.includes(type))
        )
      }

      return filteredVideos
    },
    [bodyPartFilters, exerciseTypeFilters]
  );
  
  return (
    <div>
      <h1 className="text-2xl">Bonjour {name} !</h1>

      <section className="mt-4 flex gap-8">
        <div className="flex-1 shadow-lg p-4 rounded-3xl border">
          <h2 className="text-lg flex gap-2">
            <MdOndemandVideo size="24px" className="my-auto"/>
            <span>Vidéo du jour</span>
          </h2>

          <div className="flex gap-4 mt-6">
            <div className="basis-1/2 relative">
              <Image
                src={dailyVideo.thumbnailUrl}
                width={320} height={200}
                className="brightness-50 rounded-xl w-[320px] h-[200px]"
                alt="Image de la video du jour"
              />
              <div className="flex gap-1 bg-white absolute bottom-2 right-2 rounded-md p-1 text-sm">
                <PiClock size="16px" className="my-auto"/>
                <span>{formatDuration(dailyVideo.duration)}</span>
              </div>
            </div>         

            <div className="basis-1/2 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-bold">{dailyVideo.name}</h3>
                <p className="mt-2">{dailyVideo.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {dailyVideo.bodyParts.map((bodyPart) => (
                    <span key={bodyPart} className="bg-gray-200 text-xs rounded-md px-2">
                      {painfulBodyParts.find(painfulBodyPart => painfulBodyPart.value === bodyPart)?.label}
                    </span>
                  ))}
                  {dailyVideo.exerciseTypes.map((type) => (
                    <span key={type} className="bg-gray-200 text-xs rounded-md px-2">
                      {exerciseTypes.find(exerciseType => exerciseType.value === type)?.label}
                    </span>
                  ))}
                </div>
              </div>

              <button type="button"
                className='bg-gray-200 py-2 px-8 rounded-2xl mr-auto flex gap-2'
                onClick={() => showVideoDescription(dailyVideo)}
              >
                <span>Commencer</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 shadow-lg p-4 rounded-3xl border content-center">
          <div dangerouslySetInnerHTML={{__html: randomTip.value + "*"}} />
          <div className="text-sm italic mt-2">*Source: {randomTip.source}</div>
        </div>
      </section>

      <section className="mt-8 shadow-lg p-4 bg-gray-200 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <PiPathFill size="24px" className="my-auto"/>
          <span>Mon parcours | {courses.find((c) => c.value === course)?.label}</span>
        </h2>

        <div className="mt-6 bg-gray-100 rounded-3xl flex gap-4 p-4">
          {courseVideos.map((video, index) => (
            <button type="button"
              key={video.id}
              onClick={() => showVideoDescription(video)}
              className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2"
            >
              <div className="font-bold">Jour {index + 1}</div>
              <Image
                src={video.thumbnailUrl}
                width={320} height={200}
                className="brightness-50 rounded-xl w-[240px] h-[150px]"
                alt="Image de la video du jour"
              />
              <div>{video.name}</div>
            </button>
          ))}
        </div>
      </section>

      <section className="mt-8 shadow-lg p-4 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <MdOutlineVideoLibrary size="24px" className="my-auto"/>
          <span>Toutes les vidéos</span>
        </h2>

        <div className="flex gap-4">
          <div className="basis-1/4 mt-4">
            <div className="font-bold border-b">Filtrer</div>

            <div className="pl-4">
              <div className="mt-4 flex gap-2">
                <input type="checkbox" name="allVideoFilter"
                  onChange={toggleAllVideoFilter} checked={allVideoFilter}
                  id="allVideoFilter"
                />
                <label htmlFor="allVideoFilter">Toutes les vidéos</label>
              </div>

              <div className="mt-4">
                <div className="font-bold">Parties du corps</div>
                <div className="flex flex-col mt-1">
                  {painfulBodyParts.map((bodyPart) => (
                    <div key={bodyPart.value} className="flex gap-2">
                      <input type="checkbox" name="bodyPartFilters"
                        onChange={updateBodyPartFilters} value={bodyPart.value}
                        checked={bodyPartFilters.includes(bodyPart.value)}
                        id={bodyPart.value}
                      />
                      <label htmlFor={bodyPart.value}>{bodyPart.label}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <div className="font-bold">Types d'exercice</div>
                <div className="flex flex-col mt-1">
                  {exerciseTypes.map((type) => (
                    <div key={type.value} className="flex gap-2">
                      <input type="checkbox" name="exerciseTypeFilters"
                        onChange={updateExerciseTypeFilters} value={type.value}
                        checked={exerciseTypeFilters.includes(type.value)}
                        id={type.value}
                      />
                      <label htmlFor={type.value}>{type.label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="basis-3/4 rounded-3xl flex gap-4 p-4">
            {filteredVideos.map((video) => (
              <button type="button"
                key={video.id}
                onClick={() => showVideoDescription(video)}
                className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2"
              >
                <Image
                  src={video.thumbnailUrl}
                  width={320} height={200}
                  className="brightness-50 rounded-xl w-[160px] h-[100px]"
                  alt="Image de la video du jour"
                />
                <div>{video.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {displayVideoDescription && (
        <div className="absolute inset-0 w-full h-full p-24 bg-gray-400/60" onClick={closeVideo}>
          <div className="bg-white flex flex-col w-[700px] h-[400px] rounded-3xl mx-auto mt-20" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              width={700} height={500}
              className="w-full h-[200px] rounded-t-3xl object-cover"
              alt="Image de la video du jour"
            />
            <div className="flex flex-col h-full p-4">
              <div className="flex gap-8">
                <span className="text-lg font-bold">{selectedVideo?.name}</span>
                <div className="flex gap-1">
                  <PiClock size="16px" className="my-auto"/>
                  <span>{formatDuration(selectedVideo?.duration || 0)}</span>
                </div>
              </div>
              <p className="mt-4">
                {selectedVideo?.description}
              </p>
              <button type="button"
                className='bg-gray-200 py-2 px-8 rounded-2xl mt-auto ml-auto flex gap-2'
                onClick={() => playVideo()}
              >
                <span>Démarrer</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </div>
          </div>
        </div>
      )}

      {displayVideo && (
        <div className="absolute inset-0 w-full h-full p-24 bg-gray-400/60" onClick={closeVideo}>
          <iframe width="100%" height="100%"
            src={`${selectedVideo?.url}?autoplay=true&mute=false&logo=false`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true} className="relative rounded-3xl" referrerPolicy="unsafe-url">
          </iframe>
        </div>
      )}
    </div>
  )
}