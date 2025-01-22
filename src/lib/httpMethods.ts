import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const apiUrl = (process.env.API_URL || 'http://localhost:3000/platform')

async function get(route: string) {
  return makeRequest('GET', route)
}

function unauthenticatedPost(route: string, payload: unknown) {
  return makeRequest('POST', route, false, payload)
}

async function post(route: string, payload: unknown) {
  return makeRequest('POST', route, true, payload)
}

async function makeRequest(method: string, route: string, withAuthentication: boolean = true, payload: unknown = {}) {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  }

  if (withAuthentication) {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')

    headers.Authorization = 'Bearer ' + jwt?.value
  }

  const params: RequestInit = {
    method,
    headers,
  }

  if (method === 'POST') {
    params.body = JSON.stringify(payload)
  }

  const response = await fetch(`${apiUrl}/${route}`, params)

  if (withAuthentication && response.status === 401) {
    redirect('/logout')
  }

  return response.json()
}

export {
  get,
  unauthenticatedPost,
  post,
}
