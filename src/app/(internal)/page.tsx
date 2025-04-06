import { get } from '@/lib/httpMethods';
import HomePage from './HomePage';
import tips from '@/lib/tips';
import sessionQuestions from '@/lib/sessionQuestions';

export default async function Home() {
  const {
    name,
    isSurveyDue,
    dailyVideo,
    dailySessionDone,
    course,
    courseVideos,
    videos,
    badges,
    dailyActivity,
    yesterdayActivity,
    daysInArow
  }: {
    name: string,
    isSurveyDue: boolean,
    dailyVideo: Video,
    dailySessionDone: boolean,
    course: string,
    courseVideos: Video[],
    videos: Video[],
    badges: string[],
    dailyActivity: boolean,
    yesterdayActivity: boolean,
    daysInArow: number,
  } = await get('get-my-dashboard')

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  const newSessionQuestion = sessionQuestions[Math.floor(Math.random() * sessionQuestions.length)]

  const dailyVideoCourseIndex = courseVideos.findIndex((video) => video.id === dailyVideo.id)

  return <HomePage
    name={name}
    isSurveyDue={isSurveyDue}
    dailyVideo={dailyVideo}
    dailySessionAlreadyDone={dailySessionDone}
    newSessionQuestion={newSessionQuestion}
    randomTip={randomTip}
    course={course}
    courseVideos={courseVideos}
    dailyVideoCourseIndex={dailyVideoCourseIndex}
    videos={videos}
    badges={badges}
    dailyActivity={dailyActivity}
    yesterdayActivity={yesterdayActivity}
    currentDaysInArow={daysInArow}
  />
}