import { Router } from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const auth = Router()
const prisma = new PrismaClient()

auth.post('/signin', async (req, res) => {
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
      res.json({ isSuccess: isValid, message: 'success' })
    } else {
      res.json({ isSuccess: isValid, message: 'error' })
    }
  } else {
    res.json({ isSuccess: false, message: 'error' })
  }
})

export default auth
