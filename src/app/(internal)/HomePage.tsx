'use client'

import courses from "@/lib/courses";
import durationFormatter from "@/lib/durationFormatter";
import Image from 'next/image'

import { useState } from "react";
import { MdOndemandVideo, MdOutlineVideoLibrary, MdArrowForward } from "react-icons/md";
import { PiClock, PiPathFill } from "react-icons/pi";

export default function HomePage({ name, dailyVideo, course, courseVideos, videos }: {
  name: string,
  dailyVideo: Video,
  course: string,
  courseVideos: Array<Video>,
  videos: Array<Video>
}) {
  const [playVideoUrl, setPlayVideoUrl] = useState<string | null>(null);

  const displayVideo = function(url: string) {
    setPlayVideoUrl(url)
  }

  const closeVideo = function() {
    setPlayVideoUrl(null)
  }

  return (
    <div>
      <h1 className="text-2xl">Bonjour {name} !</h1>

      <section className="mt-4 w-1/2 shadow-lg p-4 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <MdOndemandVideo size="24px" className="my-auto"/>
          <span>Vidéo du jour</span>
        </h2>

        <div className="flex gap-4 mt-6">
          <div className="flex-1 relative">
            <Image
              src={dailyVideo.thumbnailUrl}
              width={320} height={200}
              className="brightness-50 rounded-xl w-[320px] h-[200px]"
              alt="Image de la video du jour"
            />
            <div className="flex gap-1 bg-white absolute bottom-2 right-2 rounded-md p-1 text-sm">
              <PiClock size="16px" className="my-auto"/>
              <span>{durationFormatter(dailyVideo.duration)}</span>
            </div>
          </div>         

          <div className="flex-1 flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">{dailyVideo.name}</h3>
              <p className="mt-2">{dailyVideo.description}</p>
            </div>

            <button type="button"
              className='bg-gray-200 py-2 px-8 rounded-2xl mr-auto flex gap-2'
              onClick={() => displayVideo(dailyVideo.url)}
            >
              <span>Commencer</span>
              <MdArrowForward size="24px" className="my-auto"/>
            </button>
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
            <button type="button"
              key={video.id}
              onClick={() => displayVideo(video.url)}
              className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2"
            >
              <div className="font-bold">Jour {index}</div>
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

        <div className="rounded-3xl flex gap-4 p-4">
          {videos.map((video, index) => (
            <button type="button"
              key={video.id}
              onClick={() => displayVideo(video.url)}
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
      </section>

      {playVideoUrl && (
        <div className="absolute inset-0 w-full h-full p-24 bg-gray-400/60" onClick={closeVideo}>
          <iframe width="100%" height="100%"
            src={`${playVideoUrl}?autoplay=true&mute=false&logo=false`}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true} className="relative rounded-3xl" referrerPolicy="unsafe-url">
          </iframe>
        </div>
      )}
    </div>
  )
}