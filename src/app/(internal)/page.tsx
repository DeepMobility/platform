import { get } from '@/lib/httpMethods';
import HomePage from './HomePage';
import tips from '@/lib/tips';
import sessionQuestions from '@/lib/sessionQuestions';

export default async function Home() {
  const { name, dailyVideo, dailySessionDone, weeklySessionsCount, course, courseVideos, videos }: {
    name: string,
    dailyVideo: Video,
    dailySessionDone: boolean,
    weeklySessionsCount: number,
    course: string,
    courseVideos: Video[],
    videos: Video[]
  } = await get('get-my-dashboard')

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  const newSessionQuestion = sessionQuestions[Math.floor(Math.random() * sessionQuestions.length)]

  const dailyVideoCourseIndex = courseVideos.findIndex((video) => video.id === dailyVideo.id)

  return <HomePage
    name={name}
    dailyVideo={dailyVideo}
    dailySessionAlreadyDone={dailySessionDone}
    weeklySessionsCount={weeklySessionsCount}
    newSessionQuestion={newSessionQuestion}
    randomTip={randomTip}
    course={course}
    courseVideos={courseVideos}
    dailyVideoCourseIndex={dailyVideoCourseIndex}
    videos={videos}
  />
}