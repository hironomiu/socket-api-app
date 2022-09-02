import * as z from 'zod'

export const user = z.object({
  email: z.string().email({ message: 'Email address' }),
  password: z.string().min(2, { message: 'Required' }),
})

export type User = z.infer<typeof user>

export const message = z.object({
  message: z
    .string()
    .min(1, { message: 'Required' })
    .max(255, { message: 'max 255' }),
})

export type Message = z.infer<typeof message>
