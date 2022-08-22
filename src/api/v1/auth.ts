import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const auth = Router()
const prisma = new PrismaClient()

auth.get('/signin', (req: any, res: any) => {
  console.log('GET signin session', req.session.id)
  if (req.session.userId) {
    res.json({ isSignIned: true, message: 'signined' })
  } else {
    res.json({ isSignIned: false, message: 'error' })
  }
})

auth.post('/signin', async (req: any, res) => {
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
