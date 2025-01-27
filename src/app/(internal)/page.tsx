import { get } from '@/lib/httpMethods';
import HomePage from './HomePage';

export default async function Home() {
  const { name, jobType, videos }: {
    name: string,
    jobType: string,
    videos: Array<Video>
  } = await get('get-my-dashboard')

  const course = jobType === 'move' ? 'mobility' : 'pain';

  const courseVideos = videos
  .filter((video) => video.course === course)
  .sort((v1, v2) => v1.coursePosition - v2.coursePosition)

  return <HomePage
    name={name}
    dailyVideo={courseVideos[0]}
    course={course}
    courseVideos={courseVideos}
    videos={videos}
  />
}