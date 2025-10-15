'use client'

import courses from "@/lib/courses";
import formatDuration from "@/lib/durationFormatter";
import exerciseTypes from "@/lib/exerciseTypes";
import painfulBodyParts from "@/lib/painfulBodyParts";
import Form from "next/form";
import Image from 'next/image'
import { useSearchParams, useRouter } from 'next/navigation'
import { createRef, useMemo, useState } from "react";
import { MdOndemandVideo, MdOutlineVideoLibrary, MdArrowForward } from "react-icons/md";
import { PiClock, PiPathFill } from "react-icons/pi";
import { startSession, endSession } from "./actions";
import CourseVideo from "./CourseVideo";
import Link from "next/link";
import AppModal from "@/components/AppModal";
import VideoCourseDone from "@/components/VideoCourseDone";
import badgesList from "@/lib/badgesList";
import Logo from "@/../public/logo.svg";
import { LuChevronLeft, LuChevronRight, LuChevronsUpDown } from "react-icons/lu";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Fires from "./Fires";
import ChallengeWidget from './ChallengeWidget';
import FullScreenModal from "@/components/FullScreenModal";

export default function HomePage({
  name,
  isSurveyDue,
  dailyVideo,
  dailySessionAlreadyDone,
  newSessionQuestion,
  randomTip,
  course,
  courseVideos,
  dailyVideoCourseIndex,
  videos,
  badges,
  dailyActivity,
  yesterdayActivity,
  currentDaysInArow,
  hasReminderConfigured,
  currentChallenge: initialCurrentChallenge,
}: {
  name: string,
  isSurveyDue: boolean,
  dailyVideo: Video,
  dailySessionAlreadyDone: boolean,
  newSessionQuestion: { value: string, beforeLabel: string, afterLabel: string }
  randomTip: { value: string, source: string, highlightedNumber: string }
  course: string,
  courseVideos: Array<Video>,
  dailyVideoCourseIndex: number,
  videos: Array<Video>,
  badges: string[],
  dailyActivity: boolean,
  yesterdayActivity: boolean,
  currentDaysInArow: number,
  hasReminderConfigured: boolean,
  currentChallenge?: Challenge,
}) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const surveyAnswered = searchParams.get('surveyAnswered')

  const [welcome, setWelcome] = useState(searchParams.get('welcome'))

  const [dailySessionDone, setDailySessionDone] = useState(dailySessionAlreadyDone)

  const [dailyActivityDone, setDailyActivityDone] = useState(dailyActivity)

  const [daysInArow, setDaysInARow] = useState(currentDaysInArow)

  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)

  const [newBadge, setNewBadge] = useState<string | null>()

  const [beforeRating, setBeforeRating] = useState<FormDataEntryValue | null>(null)

  const [sessionId, setSessionId] = useState<number | null>(null)

  const [userBadges, setUserBadges] = useState<string[]>(badges)

  const videoRef = createRef<HTMLVideoElement>()

  const [displayAllVideos, setDisplayAllVideos] = useState(false)

  const [displayVideoDescription, setDisplayVideoDescription] = useState(false)
  const [displayNewSession, setDisplayNewSession] = useState(false)
  const [displayVideo, setDisplayVideo] = useState(false)
  const [displayEndSession, setDisplayEndSession] = useState(false)
  const [displayCongrats, setDisplayCongrats] = useState(false)

  const [currentChallenge, setCurrentChallenge] = useState<Challenge | undefined>(initialCurrentChallenge);

  const removeWelcome = () => {
    router.replace('/');
    setWelcome(null);
  }

  const showVideoDescription = function(video: Video) {
    setDisplayVideoDescription(true)
    setSelectedVideo(video)
  }

  const showNewSession = function(video?: Video) {
    if (video) {
      setSelectedVideo(video)
    }
    setDisplayVideoDescription(false)
    setDisplayNewSession(true)
  }

  const startVideoSession = async function(formData: FormData) {
    setBeforeRating(formData.get('beforeRating'))

    playVideo()
  }

  const playVideo = function(video?: Video) {
    if (video) {
      setSelectedVideo(video)
    }
    setDisplayVideoDescription(false)
    setDisplayNewSession(false)
    setDisplayVideo(true)
  }

  const endVideo = async function(videoCompleted = false) {
    const currentTime = videoRef.current?.currentTime || 0
    const videoDuration = videoRef.current?.duration || 1000000

    setDisplayVideo(false)

    if ((videoCompleted || currentTime > videoDuration - 25)) {
      const { session, newBadges, updatedDaysInArow } = await startSession(selectedVideo?.id || 0, newSessionQuestion.value, beforeRating)

      setDailyActivityDone(true)
      setDaysInARow(updatedDaysInArow)

      if (newBadges.length > 0) {
        if (badgesList.includes(newBadges[0])) {
          setNewBadge(newBadges[0])
        }
        setUserBadges([...userBadges, ...newBadges])
      }

      if (beforeRating) {
        setSessionId(session.id)
        setDailySessionDone(true)
        setDisplayEndSession(true)
      } else if (newBadges.length > 0) {
        setDisplayCongrats(true)
      }

      if (currentChallenge) {
        updateChallenge(currentChallenge)
      }
    } else {
      setSelectedVideo(null)
    }

    setBeforeRating(null)
  }

  const endVideoSession = async function(formData: FormData) {
    await endSession(formData, sessionId || 0)

    setDisplayEndSession(false)
    setSelectedVideo(null)
    setDisplayCongrats(true)

    if (currentChallenge) {
      updateChallenge(currentChallenge)
    }
  }

  const closeModal = function() {
    setDisplayVideoDescription(false)
    setDisplayNewSession(false)
    setDisplayEndSession(false)
    setDisplayCongrats(false)
    setNewBadge(null)

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

  const updateChallenge = function(currentChallenge: Challenge) {
    const videoDuration = selectedVideo?.duration || 0;
    const minutesWatched = Math.floor(videoDuration / 60);
    const pointsEarned = Math.max(1, minutesWatched);

    const teamsArray = Object.entries(currentChallenge.progress.teamsInfo).map(([teamId, team]) => ({
      teamId,
      ...team,
      points: team.name === currentChallenge.progress.currentUserTeamInfo.name 
        ? team.points + pointsEarned 
        : team.points
    }));

    teamsArray.sort((a, b) => b.points - a.points);

    const updatedTeamsInfo = Object.fromEntries(
      teamsArray.map((team, index) => [
        team.teamId,
        { ...team, rank: index + 1 }
      ])
    );
    const updatedCurrentUserTeamInfo = {
      ...currentChallenge.progress.currentUserTeamInfo,
      points: currentChallenge.progress.currentUserTeamInfo.points + pointsEarned,
      rank: Object.values(updatedTeamsInfo).find(team => team.name === currentChallenge.progress.currentUserTeamInfo.name)?.rank || 1
    }

    const usersArray = Object.entries(currentChallenge.progress.usersInfo).map(([userId, user]) => ({
      ...user,
      userId,
      points: user.name === currentChallenge.progress.currentUserInfo.name
        ? user.points + pointsEarned 
        : user.points
    }));

    usersArray.sort((a, b) => b.points - a.points);

    const updatedUsersInfo = Object.fromEntries(
      usersArray.map((user, index) => [
        user.userId,
        { ...user, rank: index + 1 }
      ])
    );

    const updatedCurrentUserInfo = {
      ...currentChallenge.progress.currentUserInfo,
      points: currentChallenge.progress.currentUserInfo.points + pointsEarned,
      rank: Object.values(updatedUsersInfo).find(user => user.name === currentChallenge.progress.currentUserInfo.name)?.rank || 1
    }

    const updatedChallenge = {
      ...currentChallenge,
      progress: {
        ...currentChallenge.progress,
        totalPoints: currentChallenge.progress.totalPoints + pointsEarned,
        currentUserInfo: updatedCurrentUserInfo,
        currentUserTeamInfo: updatedCurrentUserTeamInfo,
        teamsInfo: updatedTeamsInfo,
        usersInfo: updatedUsersInfo
      }
    };

    setCurrentChallenge(updatedChallenge);
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

  const getEndSessionIncentive = (videosLeft: number) => {
    if (videosLeft === 0) {
      return "Votre parcours de la semaine est validé. Ancrer cette habitude sur tout le trimestre, recommencez dès demain avec la J1"
    }
    if (videosLeft === 1) {
      return `Votre parcours de la semaine est presque validé, revenez demain pour une semaine complète.`
    }
    return `Poursuivez encore ${videosLeft} jours consécutifs pour réaliser votre parcours complet.`
  }

  return (
    <div>
      <h1 className="text-2xl flex gap-4 flex-wrap">
        <span>Bonjour {name} !</span>
        <div className="flex gap-2">
          {[1,2,3,4,5].map((fire) => (
            <div key={fire} className="relative">
              <Image
                src={`/fire.svg`}
                width={25} height={35}
                className={`w-[25px] h-[35px] ${
                  (
                    (dailySessionDone && (dailyVideoCourseIndex + 1 < fire)) ||
                    (!dailySessionDone && (dailyVideoCourseIndex < fire))
                  ) ? "brightness-[0.7]" : ""
                }`}
                alt="Flamme"
              />
              <div className="bg-transparent absolute bottom-0 right-[6px] text-sm">
                J{fire}
              </div>              
            </div>
          ))}
        </div> 
      </h1>

      {welcome && (
        <AppModal closeModal={removeWelcome} size="md">
          <div className="w-full bg-[#A89B93] gap-4 flex flex-col items-center justify-around p-4 text-center">
            <Image
              src={Logo}
              width={150}
              height={120}
              alt="Logo DeepMobility"
              className="w-[150px] h-[120px]"
            />

            <b className="text-2xl">BRAVO !</b>

            <div className="flex flex-col gap-2">
              <b className="text-xl">Votre parcours sur mesure est maintenant prêt !</b>

              <div className="text-lg">
                Réalisez chaque jour votre routine pour améliorer votre bien-être.
              </div>
            </div>     

            <button
              type="button"
              onClick={removeWelcome}
              className='bg-gray-500 text-white py-2 px-6 rounded-2xl'
            >
              C'est parti !
            </button>
          </div>
        </AppModal>
      )}

      <section className="mt-4 flex gap-8 flex-wrap">
        <div className="order-1 w-full xl:max-w-[800px] shadow-sm p-4 rounded-3xl border flex flex-col gap-2 sm:gap-6">
          <h2 className="text-lg flex gap-2">
            <MdOndemandVideo size="24px" className="my-auto"/>
            <span>Ma routine du jour</span>
          </h2>

          <div className="flex sm:hidden flex-col gap-1 rounded-lg bg-gray-100 p-1">
            <div className="flex gap-4">
              <div className="text-2xl my-auto text-gray-600">
                {randomTip.highlightedNumber}
              </div>
              <div dangerouslySetInnerHTML={{__html: randomTip.value + "*"}} className="text-sm"/>
            </div>
            <div className="text-xs italic">Source: {randomTip.source}</div>
          </div>

          <div className="flex-1 flex flex-wrap gap-4">
            <button type="button"
              onClick={() => !dailySessionDone ? showNewSession(dailyVideo) : playVideo(dailyVideo)}
              className={
                "w-full max-w-[340px] h-[180px] sm:h-[240px] relative " + (dailySessionDone ? "opacity-40" : "")
              }
            >
              <Image
                src={dailyVideo.thumbnailUrl}
                width={270} height={165}
                unoptimized={true}
                className="brightness-50 rounded-xl w-full max-w-[340px] h-[180px] sm:h-[240px] object-cover"
                alt="Image de la video du jour"
              />
              <div className="flex gap-1 bg-white absolute bottom-2 right-2 rounded-md p-1 text-sm">
                <PiClock size="16px" className="my-auto"/>
                <span>{formatDuration(dailyVideo.duration)}</span>
              </div>

              <VideoCourseDone isDone={dailySessionDone} />
            </button>         

            <div className="flex-1 min-w-[270px] flex flex-col justify-between">
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
                className='bg-gray-200 py-2 px-8 rounded-2xl ml-auto flex gap-2 mt-4 sm:mt-2'
                onClick={() => !dailySessionDone ? showNewSession(dailyVideo) : playVideo(dailyVideo)}
              >
                <span>{dailySessionDone ? 'Revoir' : 'Commencer' }</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </div>
          </div>
        </div>

        <div className="order-4 lg:order-2 flex-1 md:min-w-[400px] w-full xl:max-w-[800px] flex flex-col gap-4">
          {isSurveyDue ? (
            <div className="shadow-sm p-4 rounded-3xl border">
                <div className="flex gap-3">
                  <Image
                    src="/questionnaire.png"
                    width={80} height={80}
                    className="w-[80px] h-[80px] grayscale my-auto"
                    alt="Questionnaire"
                  />
                  {!!surveyAnswered ? (
                    <p>
                      Merci d'avoir répondu à notre questionnaire, vos réponses nous aident à toujours
                      enrichir nos vidéos et nous permettent d'améliorer vos parcours.
                    </p>
                  ): (
                    <div>
                      <span>
                        Aidez nous à adapter votre parcours à vos besoins : c'est l'heure de compléter quelques questions sur vous ! 
                      </span>
                      <Link href="/questionnaire"
                        className="bg-gray-200 py-2 justify-center rounded-2xl flex gap-2 mt-2 hover:opacity-70"
                      >
                        <span>Compléter</span>
                        <MdArrowForward size="24px" className="my-auto"/>
                      </Link>
                    </div>
                  )}  
                </div>
            </div>
          ) : (
            <div className="hidden sm:block shadow-sm p-4 rounded-3xl border">
                <div className="flex flex-col gap-2 justify-around h-full">
                  <div className="flex gap-6">
                    <div className="text-5xl my-auto text-gray-600">
                      {randomTip.highlightedNumber}
                    </div>
                    <div dangerouslySetInnerHTML={{__html: randomTip.value + "*"}} />
                  </div>
                  <div className="text-xs italic">Source: {randomTip.source}</div>
                </div>
            </div>
          )}

          {!hasReminderConfigured && (
            <div className="shadow-sm p-4 rounded-3xl border bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
              <div className="flex gap-3 items-center">
                <div className="text-4xl">🔔</div>
                <div className="flex-1">
                  <div className="font-semibold text-gray-800 mb-1">
                    Ne manquez plus vos routines quotidiennes
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Configurez un rappel pour ancrer votre nouvelle habitude bien-être
                  </p>
                  <Link 
                    href="/rappels"
                    className="bg-blue-600 text-white py-2 px-4 rounded-2xl inline-flex gap-2 items-center hover:bg-blue-700 transition-colors text-sm"
                  >
                    <span>Configurer mes rappels</span>
                    <MdArrowForward size={18} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          <div className="flex-1 shadow-sm p-4 rounded-3xl border flex gap-2 flex-col sm:flex-row">
            <Fires dailySessionDone={dailySessionDone} dailyVideoCourseIndex={dailyVideoCourseIndex} />

            <div className="flex justify-around border-t pt-2 sm:border-t-0 sm:pt-0 sm:max-w-[170px] min-w-[150px] sm:flex-wrap sm:border-l sm:pl-2">
              {badgesList.map(badge => (
                <div key={badge.value} className="group">
                  {userBadges.includes(badge.value) ? (
                    <Image
                      src={`/badges/${badge.value}.jpg`}
                      width={70} height={70}
                      className="w-[70px] h-[70px] rounded-t-3xl mx-auto"
                      alt="Badge débloqué"
                    />
                  ): (
                    <Image
                      src={`/badges/${badge.value}-disabled.jpg`}
                      width={70} height={70}
                      className="w-[70px] h-[70px] rounded-t-3xl mx-auto"
                      alt="Badge à débloquer"
                    />
                  )}

                  <div className="hidden group-hover:block absolute bg-white rounded-xl border shadow-sm p-2">
                    {badge.condition}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {currentChallenge && (
          <div className="order-3 lg:order-3 w-full">
            <ChallengeWidget challenge={currentChallenge} />
          </div>
        )}

        <div className="order-2 lg:order-3 shadow-sm p-4 rounded-3xl border w-full">
          <h2 className="text-lg flex gap-2">
            <PiPathFill size="24px" className="my-auto"/>
            <span>Mon parcours sur mesure | {courses.find((c) => c.value === course)?.label}</span>
          </h2>

          <div className="italic mt-1">
            Des routines musculaires conçues spécialement pour vous, à réaliser chaque jour au travail et/ou à la maison et ça pendant tout un trimestre.
          </div>

          <div className="sm:hidden">
            <Swiper initialSlide={dailyVideoCourseIndex} slidesPerView={1}>
              {courseVideos.map((video, index) => (
                <SwiperSlide key={video.id}>
                  <div className="flex items-center justify-center">
                    <div className="w-[16px]">
                      {index !== 0 && (
                        <LuChevronLeft />
                      )} 
                    </div>
                    <CourseVideo video={video} videoIndex={index}
                      dailyVideoCourseIndex={dailyVideoCourseIndex} dailySessionDone={dailySessionDone}
                      onClick={() => showVideoDescription(video)}
                    />
                    <div className="w-[16px]">
                      {index < courseVideos.length - 1 && (
                        <LuChevronRight />
                      )}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div> 

          <div className="hidden sm:flex rounded-3xl gap-2 mt-4 px-4 flex-wrap justify-center">
            {courseVideos.map((video, index) => (
              <CourseVideo video={video} videoIndex={index} key={video.id}
                dailyVideoCourseIndex={dailyVideoCourseIndex} dailySessionDone={dailySessionDone}
                onClick={() => showVideoDescription(video)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 shadow-sm p-4 rounded-3xl border">
        <button
          className="w-full flex items-center justify-between cursor-pointer hover:opacity-7"
          onClick={() => setDisplayAllVideos(!displayAllVideos)}
        >
          <h2 className="text-lg flex gap-2">
            <MdOutlineVideoLibrary size="24px" className="my-auto"/>
            <span>Toutes les routines</span>
          </h2>

          <div className="flex gap-2 text-slate-800 mt-auto">
            <span>Afficher</span>
            <LuChevronsUpDown size="20px" className="my-auto"/>
          </div>
        </button>
        
        {displayAllVideos && (
          <div className="flex flex-col sm:flex-row gap-6 mt-2">
            <div className="sm:w-60 flex-none mt-4">
              <div className="font-bold border-b">Filtrer</div>

              <div className="pl-4">
                <div className="mt-4 flex gap-2">
                  <input type="checkbox" name="allVideoFilter"
                    onChange={toggleAllVideoFilter} checked={allVideoFilter}
                    id="allVideoFilter"
                  />
                  <label htmlFor="allVideoFilter">Toutes les routines</label>
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

            <div className="flex-1 rounded-3xl flex content-start gap-2 p-4 flex-wrap justify-center md:justify-normal">
              {filteredVideos.map((video) => (
                <button type="button"
                  key={video.id}
                  onClick={() => showVideoDescription(video)}
                  className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2 mb-auto"
                >
                  <Image
                    src={video.thumbnailUrl}
                    width={180} height={100}
                    unoptimized={true}
                    className="brightness-50 rounded-xl w-[180px] sm:w-[160px] h-[115px] sm:h-[100px]"
                    alt="Image de la video du jour"
                  />
                  <div className="w-[160px] whitespace-nowrap overflow-hidden text-ellipsis">
                    {video.name}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {displayVideoDescription && (
        <AppModal closeModal={closeModal}>
          <div className="w-full flex flex-col">
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              unoptimized={true}
              width={700} height={200}
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
                className='bg-gray-200 py-2 px-8 rounded-2xl ml-auto flex gap-2 mt-4 sm:mt-auto'
                onClick={() => selectedVideo?.id === dailyVideo.id && !dailySessionDone ? showNewSession() : playVideo()}
              >
                <span>{selectedVideo?.id === dailyVideo.id && !dailySessionDone ? 'Démarrer': 'Lancer la vidéo'}</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </div>
          </div>
        </AppModal>
      )}

      {displayNewSession && (
        <AppModal closeModal={closeModal}>
          <div className="w-full flex flex-col">
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              unoptimized={true}
              width={700} height={200}
              className="w-full h-[200px] rounded-t-3xl object-cover"
              alt="Image de la video du jour"
            />
            <Form action={startVideoSession} className="flex flex-col justify-between h-full p-4">
              <div>{newSessionQuestion.beforeLabel}</div>
              <div className="mt-4 mx-auto">
                <datalist id="values" className="flex justify-between w-[250px] sm:w-[400px]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </datalist>
                
                <input
                  type="range" name="beforeRating" min="1" max="5" list="values"
                  className="w-[250px] sm:w-[400px] m-0 p-0 accent-gray-500"
                />
              </div>
              <button type="submit" className='bg-gray-200 py-2 px-8 rounded-2xl mt-4 ml-auto flex gap-2'>
                <span>Lancer la vidéo</span>
                <MdArrowForward size="24px" className="my-auto"/>
              </button>
            </Form>
          </div>
        </AppModal>
      )}

      {displayVideo && (
        <FullScreenModal closeModal={() => endVideo()}>
          <video
            ref={videoRef}
            width="1200px" height="800px"
            src={selectedVideo?.url}
            autoPlay
            controls controlsList="nodownload"
            onEnded={() => endVideo(true)}
            className="mx-auto"
          />
        </FullScreenModal>
      )}

      {displayEndSession && (
        <AppModal closeModal={closeModal}>
          <div className="w-full flex flex-col">
            <Image
              src={selectedVideo?.thumbnailUrl || ''}
              width={700} height={200}
              unoptimized={true}
              className="w-full h-[200px] rounded-t-3xl object-cover"
              alt="Image de la video du jour"
            />
            <Form action={endVideoSession} className="flex flex-col justify-between h-full p-4">
              <div>{newSessionQuestion.afterLabel}</div>
              <div className="mt-4 mx-auto">
                <datalist id="values" className="flex justify-between w-[250px] sm:w-[400px]">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </datalist>
                
                <input
                  type="range" name="afterRating" min="1" max="5" list="values"
                  className="w-[250px] sm:w-[400px] m-0 p-0 accent-gray-500"
                />
              </div>
              <button type="submit" className='bg-gray-200 py-2 px-8 rounded-2xl mt-4 sm:mt-auto ml-auto flex gap-2'>
                Terminer
              </button>
            </Form>
          </div>
        </AppModal>
      )}

      {displayCongrats && (
        <AppModal closeModal={closeModal} globalClose={true}>
          <div className="w-full flex flex-col text-center gap-2 px-4 py-8 items-center justify-around">
            <div className="text-3xl font-bold">
              {(newBadge ? "Nouveau badge débloqué !" : "Routine journalière terminée !")}
            </div>
            {newBadge ? (
              <Image
                src={`/badges/${newBadge}-new.jpg`}
                width={400} height={150}
                unoptimized={true}
                className="aspect-3/1 w-full max-w-[500px]"
                alt="Badge débloqué"
              />
            ): (
              <div className="flex gap-2">
                {[1,2,3,4,5].map((fire) => (
                  <div key={fire} className="relative">
                    <Image
                      src={`/fire.svg`}
                      width={50} height={70}
                      className={`w-[50px] h-[70px] ${dailyVideoCourseIndex + 1 < fire ? "brightness-[0.7]" : ""}`}
                      alt="Flamme"
                    />
                    {dailyVideoCourseIndex + 1 >= fire && (
                      <div className="bg-transparent absolute bottom-[3px] right-[14px] text-lg font-bold">
                        J{fire}
                      </div>
                    )} 
                  </div>
                ))}
              </div> 
              // <Image
              //   src={`/congrats.svg`}
              //   width={400} height={150}
              //   unoptimized={true}
              //   className="aspect-3/1 w-full max-w-[500px]"
              //   alt="Bravo"
              // />
            )}
            <div className="text-xl">
              {(newBadge
                ? badgesList.find(badge => badge.value === newBadge)?.congrats
                : getEndSessionIncentive(5 - dailyVideoCourseIndex - 1)
              )}
            </div>
          </div>
        </AppModal>
      )}
    </div>
  )
}
