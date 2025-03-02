import { cookies } from "next/headers"
import OtherThematicInterestPage from "./OtherThematicInterestPage"

export default async function OtherThematicInterest() {
  const cookieStore = await cookies()

  const userOtherThematicInterest = cookieStore.get('userOtherThematicInterest')?.value
  
  return <OtherThematicInterestPage userOtherThematicInterest={userOtherThematicInterest} />
}