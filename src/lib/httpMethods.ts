import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

const apiUrl = (process.env.API_URL || 'http://localhost:3000/platform')

async function get(route: string) {
  return makeRequest('GET', route)
}

function unauthenticatedPost(route: string, payload: any) {
  return makeRequest('POST', route, false, payload)
}

async function post(route: string, payload: any, withAuthentication = true) {
  return makeRequest('POST', route, true, payload)
}

async function makeRequest(method: string, route: string, withAuthentication: boolean = true, payload: any = {}) {
  const headers: any = {
    'Content-Type': 'application/json'
  }

  if (withAuthentication) {
    const cookieStore = await cookies()
    const jwt = cookieStore.get('jwt')

    headers.Authorization = 'Bearer ' + jwt?.value
  }

  const params: any = {
    method,
    headers,
  }

  if (method === 'POST') {
    params.body = JSON.stringify(payload)
  }

  const response = await fetch(`${apiUrl}/${route}`, params)

  if (response.status === 401) {
    redirect('/logout')
  }

  return response.json()
}

export {
  get,
  unauthenticatedPost,
  post,
}
