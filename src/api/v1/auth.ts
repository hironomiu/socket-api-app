import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const auth = Router()
const prisma = new PrismaClient()

/**
 * @swagger
 * /api/v1/auth/signin:
 *  get:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
auth.get('/signin', (req: any, res: any) => {
  console.log('GET signin session', req.session.id)
  // console.log('cookie:', res.cookie())
  if (req.session.userId) {
    res.json({ isSignIned: true, message: 'signined' })
  } else {
    res.json({ isSignIned: false, message: 'error' })
  }
})

/**
 * @swagger
 * /api/v1/auth/signin:
 *  post:
 *    description: Use to request all customers
 *    responses:
 *      '200':
 *        description: A successful response
 */
auth.post('/signin', async (req: any, res) => {
  // TODO: req.bodyでバリデーション
  const user = await prisma.users.findUnique({
    where: {
      email: req.body.email,
    },
  })
  console.log('called:', user)
  if (user) {
    const isValid = await new Promise((resolve, reject) => {
      bcrypt.compare(req.body.password, user.password, (err, isValid) => {
        console.log('err:', err)
        resolve(isValid)
      })
    })
    if (isValid) {
      req.session.regenerate((err: any) => {
        console.log(err)
      })

      req.session.userId = user.id
      req.session.email = user.email

      res.json({ isSuccess: isValid, message: 'success' })
    } else {
      res.json({ isSuccess: isValid, message: 'error' })
    }
  } else {
    res.json({ isSuccess: false, message: 'error' })
  }
})

auth.post('/signout', (req, res) => {
  req.session.destroy((err) => {
    console.log('err:', err)
  })
  res.clearCookie('session')
  res.json({ issuccess: true, message: 'signouted' })
})
export default auth
