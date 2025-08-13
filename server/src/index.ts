import { Hono } from 'hono'
import authRoutes from './routes/auth.route'
import { cors } from 'hono/cors'


export type Env = {
  DATABASE_URL:string
}

const app = new Hono<{Bindings:Env}>()
app.use('*',cors())
app.get('/', (c) => {
  c.env.DATABASE_URL
  return c.text('API working!')
})


app.route('/api/v1/auth',authRoutes)
export default app
