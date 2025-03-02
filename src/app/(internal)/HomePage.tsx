'use client'

import courses from "@/lib/courses";
import formatDuration from "@/lib/durationFormatter";
import exerciseTypes from "@/lib/exerciseTypes";
import painfulBodyParts from "@/lib/painfulBodyParts";
import Form from "next/form";
import Image from 'next/image'

import { useMemo, useState } from "react";
import { MdOndemandVideo, MdOutlineVideoLibrary, MdArrowForward } from "react-icons/md";
import { PiClock, PiPathFill } from "react-icons/pi";
import { startSession, endSession } from "./actions";
import { FaCheck } from "react-icons/fa";
import incentiveSentences from "@/lib/incentiveSentences";
import CourseVideo from "./CourseVideo";

export default function HomePage({
  name,
  dailyVideo,
  dailySessionAlreadyDone,
  weeklySessionsCount,
  newSessionQuestion,
  randomTip,
  course,
  courseVideos,
  dailyVideoCourseIndex,
  videos
}: {
  name: string,
  dailyVideo: Video,
  dailySessionAlreadyDone: boolean,
  weeklySessionsCount: number,
  newSessionQuestion: { value: string, beforeLabel: string, afterLabel: string }
  randomTip: { value: string, source: string, highlightedNumber: string }
  course: string,
  courseVideos: Array<Video>,
  dailyVideoCourseIndex: number,
  videos: Array<Video>
}) {
  const [dailySessionDone, setDailySessionDone] = useState(dailySessionAlreadyDone)

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const [sessionId, setSessionId] = useState<number | null>(null)

  const [displayVideoDescription, setDisplayVideoDescription] = useState(false)
  const [displayNewSession, setDisplayNewSession] = useState(false)
  const [displayVideo, setDisplayVideo] = useState(false)
  const [displayEndSession, setDisplayEndSession] = useState(false)
  const [displayCongrats, setDisplayCongrats] = useState(false)

  const showVideoDescription = function(video: Video) {
    setDisplayVideoDescription(true)
    setSelectedVideo(video)
  }

  const showNewSession = function() {
    setDisplayVideoDescription(false)
    setDisplayNewSession(true)
  }

  const startVideoSession = async function(formData: FormData) {
    const session = await startSession(formData, selectedVideo?.id || 0, newSessionQuestion.value)

    setSessionId(session.id)
    setDailySessionDone(true)

    playVideo()
  }

  const playVideo = function() {
    setDisplayVideoDescription(false)
    setDisplayNewSession(false)
    setDisplayVideo(true)
  }

  const endVideo = function() {
    setDisplayVideo(false)

    if (sessionId) {
      setDisplayEndSession(true)
    } else {
      setSelectedVideo(null)
    }
  }

  const endVideoSession = async function(formData: FormData) {
    await endSession(formData, sessionId || 0)

    setDisplayEndSession(false)
    setSelectedVideo(null)
    setDisplayCongrats(true)
  }

  const closeModal = function() {
    setDisplayVideoDescription(false)
    setDisplayNewSession(false)
    setDisplayVideo(false)
    setDisplayEndSession(false)
    setDisplayCongrats(false)

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
        <div className="basis-[60%] shadow-lg p-4 rounded-3xl border">
          <h2 className="text-lg flex gap-2">
            <MdOndemandVideo size="24px" className="my-auto"/>
            <span>Vidéo du jour</span>
            {dailySessionDone && (<FaCheck size="24px" className="my-auto text-green-600 ml-auto"/>)}
          </h2>

          <div className="flex gap-4 mt-6">
            <div className="basis-1/2 relative">
              <Image
                src={dailyVideo.thumbnailUrl}
                width={320} height={200}
                className="brightness-50 rounded-xl w-[360px] h-[240px] object-cover"
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

        <div className="basis-[40%] flex flex-col gap-4">
          <div className="flex-1 shadow-lg p-4 rounded-3xl border flex flex-col gap-2 justify-around">
            <div className="flex gap-6">
              <div className="text-5xl my-auto text-gray-600">
                {randomTip.highlightedNumber}
              </div>
              <div dangerouslySetInnerHTML={{__html: randomTip.value + "*"}} />
            </div>
            <div className="text-sm italic">Source: {randomTip.source}</div>
          </div>

          <div className="flex-1 shadow-lg p-4 rounded-3xl border flex flex-col justify-around">
            <div className="mx-auto">DeepMobility 5 jours distincts dans la semaine</div>
            <div className="flex justify-around">
              {[1,2,3,4,5].map((number) => (
                <span
                  key={number}
                  className={
                    "border-2 rounded-full p-3 w-12 h-12 text-center font-bold "
                    + (number <= weeklySessionsCount ? "text-green-600 border-green-600" : "")
                  }
                >
                  {number}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 shadow-lg p-4 bg-gray-200 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <PiPathFill size="24px" className="my-auto"/>
          <span>Mon parcours | {courses.find((c) => c.value === course)?.label}</span>
        </h2>

        <div className="mt-6 bg-gray-100 rounded-3xl flex gap-4 p-4">
          {courseVideos.map((video, index) => (
            <CourseVideo video={video} videoIndex={index} key={video.id}
              dailyVideoCourseIndex={dailyVideoCourseIndex} dailySessionDone={dailySessionDone}
              onClick={() => showVideoDescription(video)}
            />
          ))}
        </div>
      </section>

      <section className="mt-8 shadow-lg p-4 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <MdOutlineVideoLibrary size="24px" className="my-auto"/>
          <span>Toutes les vidéos</span>
        </h2>

        <div className="flex gap-6">
          <div className="w-60 flex-none mt-4">
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

          <div className="flex-1 rounded-3xl flex content-start gap-2 p-4 flex-wrap">
            {filteredVideos.map((video) => (
              <button type="button"
                key={video.id}
                onClick={() => showVideoDescription(video)}
                className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2 mb-auto"
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
        <div className="fixed inset-0 w-full h-full p-24 bg-gray-400/60 z-20" onClick={closeModal}>
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
                  <span className="my-auto">{formatDuration(selectedVideo?.duration || 0)}</span>
                </div>
              </div>
              <p className="mt-4">
                {selectedVideo?.description}
              </p>
              <div className="flex mt-auto gap-8">
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedVideo?.bodyParts.map((bodyPart) => (
                    <span key={bodyPart} className="bg-gray-200 text-xs rounded-md px-2 mb-auto">
                      {painfulBodyParts.find(painfulBodyPart => painfulBodyPart.value === bodyPart)?.label}
                    </span>
                  ))}
                  {selectedVideo?.exerciseTypes.map((type) => (
                    <span key={type} className="bg-gray-200 text-xs rounded-md px-2 mb-auto">
                      {exerciseTypes.find(exerciseType => exerciseType.value === type)?.label}
                    </span>
                  ))}
                </div>
                <button type="button"
                  className='flex-none bg-gray-200 py-2 px-8 rounded-2xl ml-auto flex gap-2 my-auto'
                  onClick={() => selectedVideo?.id === dailyVideo.id && !dailySessionDone ? showNewSession() : playVideo()}
                >
                  <span>{selectedVideo?.id === dailyVideo.id && !dailySessionDone ? 'Démarrer': 'Lancer la vidéo'}</span>
                  <MdArrowForward size="24px" className="my-auto"/>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {displayNewSession && (
        <div className="fixed inset-0 w-full h-full p-24 bg-gray-400/60 z-20" onClick={closeModal}>
          <div className="bg-white flex flex-col w-[700px] h-[400px] rounded-3xl mx-auto mt-20" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              width={700} height={500}
              className="w-full h-[200px] rounded-t-3xl object-cover"
              alt="Image de la video du jour"
            />
            <Form action={startVideoSession} className="flex flex-col h-full p-4">
              <div>{newSessionQuestion.beforeLabel}</div>
              <div className="flex justify-around mt-4">
                {[1,2,3,4,5].map((rating) => (
                  <div className="flex flex-col gap-2" key={rating}>
                    <label htmlFor={"rating" + rating}>{rating}</label>
                    <input type="radio" name="beforeRating" id={"rating" + rating} value={rating}/>
                  </div>
                ))}
              </div>
              <button type="submit" className='bg-gray-200 py-2 px-8 rounded-2xl mt-auto ml-auto flex gap-2'>
                <span>Lancer la vidéo</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </Form>
          </div>
        </div>
      )}

      {displayVideo && (
        <div className="fixed inset-0 w-full h-full p-24 bg-gray-400/60 z-20" onClick={closeModal}>
          <video
            width="1200px" height="800px"
            src="https://streamable.com/l/a40td5/mp4.mp4"
            autoPlay
            controls controlsList="nodownload"
            onEnded={endVideo}
            className="mx-auto"
          />
        </div>
      )}

      {displayEndSession && (
        <div className="fixed inset-0 w-full h-full p-24 bg-gray-400/60 z-20" onClick={closeModal}>
          <div className="bg-white flex flex-col w-[700px] h-[400px] rounded-3xl mx-auto mt-20" onClick={(e) => e.stopPropagation()}>
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              width={700} height={500}
              className="w-full h-[200px] rounded-t-3xl object-cover"
              alt="Image de la video du jour"
            />
            <Form action={endVideoSession} className="flex flex-col h-full p-4">
              <div>{newSessionQuestion.afterLabel}</div>
              <div className="flex justify-around mt-4">
                {[1,2,3,4,5].map((rating) => (
                  <div className="flex flex-col gap-2" key={rating}>
                    <label htmlFor={"rating" + rating}>{rating}</label>
                    <input type="radio" name="afterRating" id={"rating" + rating} value={rating}/>
                  </div>
                ))}
              </div>
              <button type="submit" className='bg-gray-200 py-2 px-8 rounded-2xl mt-auto ml-auto flex gap-2'>
                Terminer
              </button>
            </Form>
          </div>
        </div>
      )}

      {displayCongrats && (
        <div className="fixed inset-0 w-full h-full p-24 bg-gray-200/80 content-center z-20" onClick={closeModal}>
          <div className="flex flex-col gap-12 m-auto text-center">
            <div className="text-3xl font-bold">Session journalière terminée !</div>
            <div className="text-xl">
              {incentiveSentences[Math.floor(Math.random() * incentiveSentences.length)]}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}