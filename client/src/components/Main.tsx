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

  return (
    <main className="flex flex-col">
      <form
        onSubmit={handleSubmit(async (message: Message) => {
          console.log('hoge:', message)
          setMessages((prev) => [...prev, message.message])
        })}
      >
        <input
          type="text"
          {...register('message')}
          className="h-12 mx-2 px-2 text-xl border-2"
          placeholder="text"
        />
        {errors.message?.message && <p>{errors.message?.message}</p>}
        <input
          type="submit"
          value="Send"
          className="h-12 w-40 bg-blue-600 rounded-md mx-4 text-xl text-white"
        />
      </form>
      <div className="flex flex-col mx-4 my-10">
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </main>
  )
}

export default Main
