import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { fetchSignInPost, fetchSignInGet } from '../queries'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { isLoginAtom } from '../recoil'
import { useNavigate } from 'react-router-dom'
import { user, User } from '../types'

const SignIn = () => {
  const isLogin = useRecoilValue(isLoginAtom)
  const setIsLogin = useSetRecoilState(isLoginAtom)
  const navigate = useNavigate()
  const signinMutation = useMutation((user: any) => fetchSignInPost(user))

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: zodResolver(user),
  })

  useEffect(() => {
    fetchSignInGet().then((json) => {
      if (json.isSignIned) {
        setIsLogin(true)
        navigate('/')
      }
    })
  })

  useEffect(() => {
    if (isLogin) navigate('/')
  }, [isLogin, navigate])

  return (
    <div className="flex justify-center items-center">
      <form
        onSubmit={handleSubmit(async (user: User) => {
          console.log('hoge')
          const response = signinMutation.mutate(user, {
            onSuccess: async (res: { isSuccess: boolean; message: string }) => {
              console.log('res:', res)
              if (res.isSuccess) {
                setIsLogin(true)
              }
            },
          })
          console.log(response)
        })}
        className="flex space-x-2"
      >
        <div>
          <input
            type="email"
            placeholder="email"
            {...register('email')}
            className="border text-2xl px-2 py-2"
          />
          {errors.email?.message && <p>{errors.email?.message}</p>}
        </div>
        <div>
          <input
            type="password"
            placeholder="password"
            {...register('password')}
            className="border text-2xl px-2 py-2"
          />
          {errors.password?.message && <p>{errors.password?.message}</p>}
        </div>

        <div>
          <input
            type="submit"
            value="SignIn"
            className="bg-blue-300 w-40 text-2xl rounded-md h-12 hover:cursor-pointer"
          />
        </div>
      </form>
    </div>
  )
}

export default SignIn
