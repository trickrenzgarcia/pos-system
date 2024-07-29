import { db } from '@/drizzle/db'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', async (c) => {
  
  return c.json({})
})

export const GET = handle(app)
export const POST = handle(app)