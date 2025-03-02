import { cookies } from "next/headers"
import PainfulBodyPartsPage from "./PainfulBodyPartsPage"

export default async function PainfulBodyPart() {
  const cookieStore = await cookies()

  const userPainfulBodyParts = JSON.parse(cookieStore.get('userPainfulBodyParts')?.value || '[]')

  return <PainfulBodyPartsPage userPainfulBodyParts={userPainfulBodyParts}/>
}