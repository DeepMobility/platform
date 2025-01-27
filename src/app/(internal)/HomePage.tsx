'use client'

import courses from "@/lib/courses";
import { useState } from "react";
import { MdOndemandVideo, MdOutlineVideoLibrary, MdArrowForward } from "react-icons/md";
import { PiPathFill } from "react-icons/pi";

function VideoPlayer({ url, close }: {
  url: string | null,
  close: any
}) {
  if (!url) {
    return null;
  }

  const fullUrl = `${url}?autoplay=true&mute=false`

  return (
    <div className="absolute inset-0 w-full h-full p-24 bg-gray-400/60" onClick={close}>
      <iframe width="100%" height="100%"
        src={fullUrl}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen={true} className="relative rounded-3xl" referrerPolicy="unsafe-url">
      </iframe>
    </div>
  )
}

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
    <div className="mt-16">
      <h1 className="text-2xl">Bonjour {name} !</h1>

      <section className="mt-4 w-1/2 shadow-lg p-4 rounded-3xl border">
        <h2 className="text-lg flex gap-2">
          <MdOndemandVideo size="24px" className="my-auto"/>
          <span>Vidéo du jour</span>
        </h2>

        <div className="flex gap-4 mt-6">
          <div className="h-[200px] w-[360px] bg-gray-700 rounded-3xl"></div>

          <div className="flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold">{dailyVideo.name}</h3>
              <p className="mt-2">{dailyVideo.description}</p>
            </div>

            <button
              className='bg-gray-200 hover:bg-gray-200/70 py-2 px-8 rounded-2xl mr-auto flex gap-2'
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
            <div
              key={video.id}
              onClick={() => displayVideo(video.url)}
              className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2"
            >
              <div className="font-bold">Jour {index}</div>
              <div className="h-[120px] w-[220px] bg-gray-700 rounded-3xl"></div>
              <div>{video.name}</div>
            </div>
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
            <div
              key={video.id}
              onClick={() => displayVideo(video.url)}
              className="flex flex-col gap-2 items-center cursor-pointer hover:bg-gray-200 rounded-3xl p-2"
            >
              <div className="h-[100px] w-[160px] bg-gray-700 rounded-3xl"></div>
              <div>{video.name}</div>
            </div>
          ))}
        </div>
      </section>

      <VideoPlayer url={playVideoUrl} close={closeVideo}/>
    </div>
  )
}