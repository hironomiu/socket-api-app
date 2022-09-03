import * as z from 'zod'
import { Request, Response } from 'express'

export const user = z.object({
  body: z.object({
    email: z.string().email({ message: 'Email address' }),
    password: z.string().min(8, { message: 'Required' }),
  }),
})

// TODO: 型
export const validate =
  (schema: any) => (req: Request, res: Response, next: any) => {
    console.log('validate called')
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      console.log(error)
      return res.json({ isSuccess: false, message: 'validation eroor' })
    }
  }
