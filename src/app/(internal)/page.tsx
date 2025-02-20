import { get } from '@/lib/httpMethods';
import HomePage from './HomePage';
import tips from '@/lib/tips';
import sessionQuestions from '@/lib/sessionQuestions';

export default async function Home() {
  const { name, jobType, videos }: {
    name: string,
    jobType: string,
    videos: Array<Video>
  } = await get('get-my-dashboard')

  const course = jobType === 'remote' ? 'sitting' : jobType;

  const courseVideos = videos
  .filter((video) => video.course === course)
  .sort((v1, v2) => v1.coursePosition - v2.coursePosition)

  const randomTip = tips[Math.floor(Math.random() * tips.length)]

  const newSessionQuestion = sessionQuestions[Math.floor(Math.random() * sessionQuestions.length)]

  return <HomePage
    name={name}
    dailyVideo={courseVideos[0]}
    newSessionQuestion={newSessionQuestion}
    randomTip={randomTip}
    course={course}
    courseVideos={courseVideos}
    videos={videos}
  />
}