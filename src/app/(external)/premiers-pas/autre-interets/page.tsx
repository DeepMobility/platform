import { cookies } from "next/headers"
import OtherThematicInterestsPage from "./OtherThematicInterestsPage"

export default async function() {
  const cookieStore = await cookies()

  const userOtherThematicInterests = JSON.parse(cookieStore.get('userOtherThematicInterests')?.value || '[]')
  
  return <OtherThematicInterestsPage userOtherThematicInterests={userOtherThematicInterests} />
}