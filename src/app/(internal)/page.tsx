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
    courseStartIndex,
    videos,
    badges,
    dailyActivity,
    yesterdayActivity,
    daysInArow,
    hasReminderConfigured,
    currentChallenge
  }: {
    name: string,
    isSurveyDue: boolean,
    dailyVideo: Video,
    dailySessionDone: boolean,
    course: string,
    courseVideos: Video[],
    courseStartIndex: number,
    videos: Video[],
    badges: string[],
    dailyActivity: boolean,
    yesterdayActivity: boolean,
    daysInArow: number,
    hasReminderConfigured: boolean,
    currentChallenge: Challenge,
  } = await get('get-my-dashboard')

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  const newSessionQuestion = sessionQuestions[Math.floor(Math.random() * sessionQuestions.length)]

  const orderedCourseVideos = courseVideos.slice(courseStartIndex).concat(courseVideos.slice(0, courseStartIndex))

  const dailyVideoCourseIndex = orderedCourseVideos.findIndex((video) => video.id === dailyVideo.id)

  return <HomePage
    name={name}
    isSurveyDue={isSurveyDue}
    dailyVideo={dailyVideo}
    dailySessionAlreadyDone={dailySessionDone}
    newSessionQuestion={newSessionQuestion}
    randomTip={randomTip}
    course={course}
    courseVideos={orderedCourseVideos}
    dailyVideoCourseIndex={dailyVideoCourseIndex}
    videos={videos}
    badges={badges}
    dailyActivity={dailyActivity}
    yesterdayActivity={yesterdayActivity}
    currentDaysInArow={daysInArow}
    hasReminderConfigured={hasReminderConfigured}
    currentChallenge={currentChallenge}
  />
}