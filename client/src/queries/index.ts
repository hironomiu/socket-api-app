import { User } from '../types'

export const fetchSignInPost = async (user: User) => {
  const response = await fetch('http://localhost:5252/api/v1/auth/signin', {
    method: 'POST',
    credentials: 'include',
    mode: 'cors',
    cache: 'no-cache',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...user }),
  })

  const json = await response.json()
  return json
}

export const fetchSignInGet = async () => {
  const response = await fetch('http://localhost:5252/api/v1/auth/signin', {
    method: 'GET',
    credentials: 'include',
    cache: 'no-cache',
    mode: 'cors',
  })

  console.log(response.headers)
  const json = await response.json()

  return json
}
