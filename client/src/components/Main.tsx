import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { isLoginAtom } from '../recoil'
import io, { Socket } from 'socket.io-client'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { message, Message } from '../types'

const socket: Socket = io('http://localhost:5252', {
  transports: ['wesocket', 'polling', 'flashsocket'],
})

const Main = () => {
  const navigate = useNavigate()
  const isLogin = useRecoilValue(isLoginAtom)
  const [messages, setMessages] = useState<string[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Message>({
    resolver: zodResolver(message),
  })
  useEffect(() => {
    if (!isLogin) navigate('/signin')
  }, [isLogin, navigate])

  useEffect(() => {
    socket.on('message', (msg) => {
      console.log(msg)
    })
  }, [])

  const handleClick = async () => {
    const response = await fetch('http://localhost:5252/api/v1/auth/signin', {
      method: 'GET',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
    })
    const json = await response.json()
    console.log(json)
  }
  return (
    <main className="flex">
      <button onClick={handleClick}>API GET SignIn</button>
      <form
        onSubmit={handleSubmit(async (message: Message) => {
          console.log('hoge:', message)
          setMessages((prev) => [...prev, message.message])
        })}
      >
        <input type="text" {...register('message')} />
        {errors.message?.message && <p>{errors.message?.message}</p>}
        <input type="submit" value="Send" />
      </form>
      <div className="flex flex-col">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </main>
  )
}

export default Main
