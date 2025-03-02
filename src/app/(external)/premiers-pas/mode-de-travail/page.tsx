import { cookies } from "next/headers"
import JobTypePage from "./JobTypePage"

export default async function JobType() {
  const cookieStore = await cookies()

  const userJobType = cookieStore.get('userJobType')?.value

  return <JobTypePage userJobType={userJobType}/>
}