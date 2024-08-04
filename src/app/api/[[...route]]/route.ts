import { db } from '@/drizzle/db'
import { categories, product } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'
import { storage } from '@/app/firebase'
import { ReqProduct } from '@/types/api-types'
import { generateRandomString } from '@/lib/utils'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', async (c) => {
  const user = await db.query.users.findMany()
  return c.json(user)
})

app.post('/product', async (c) => {
  const { name, category, image, price, stock  } = await c.req.parseBody();
  const slug = generateRandomString();

  const exists = await db.select().from(product).where(eq(product.name, name as string))
  const dbCat = await db.select().from(categories).where(eq(categories.id, category as string))

  if (exists.length) {
    return c.json({ message: 'Product already exists', status: 400 }, { status: 400, statusText: 'Bad Request' })
  } else {
    if (!dbCat.length) {
      return c.json({ message: 'Category does not exist', status: 404 }, { status: 404, statusText: 'Not Found' })
    } else {
      const data = await db.insert(product).values({
        id: crypto.randomUUID(),
        slug: slug,
        name: name as string,
        category: dbCat[0].category,
        image: image as string,
        price: parseFloat(price as string),
        stock: parseInt(stock as string),
        created_at: new Date(),
      }).returning();
      return c.json(data, 201)
    }
  }
})

app.get('/products', async (c) => {
  const data = await db.select().from(product).orderBy(product.created_at)
  return c.json(data)
})

app.get('/products/category', async (c) => {
  const data = await db.select().from(categories).orderBy(categories.created_at)
  return c.json(data)
})

app.get('/products/category/:slug', async (c) => {
  const category = c.req.param('slug')
  const data = await db.select().from(categories).where(eq(categories.slug, category))
  return c.json(data)
})

app.post('/products/category', async (c) => {
  const { category, icon }: { category: string, icon: string } = await c.req.json()

  const slug = category.toLowerCase().replace(/\s/g, '-')

  const exists = await db.select().from(categories).where(eq(categories.slug, slug))

  if (exists.length) {
    return c.json({ message: 'Category already exists', status: 400 }, { status: 400, statusText: 'Bad Request' })
  } else {
    const data = await db.insert(categories).values({
      id: crypto.randomUUID(),
      slug: category.toLowerCase().replace(/\s/g, '-'),
      category: category,
      icon: icon,
      created_at: new Date(),
    }).returning()
    return c.json(data, 201)
  }
})

export const GET = handle(app)
export const POST = handle(app)