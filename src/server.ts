import { setUp } from './app'

const server = setUp()

server.listen(5252, () => {
  console.log(`server listening *:5252`)
})
