import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('API working!')
})

export default app
