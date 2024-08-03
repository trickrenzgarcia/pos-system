import { db } from '@/drizzle/db'
import { categories, product } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { ref, uploadBytesResumable, UploadTaskSnapshot } from 'firebase/storage'
import { storage } from '@/app/firebase'

export const runtime = 'edge'

const app = new Hono().basePath('/api')

app.get('/hello', async (c) => {
  const user = await db.query.users.findMany()
  return c.json(user)
})

app.post('/product', async (c) => {
  const body = await c.req.parseBody();
  const file: File = body['file'] as File;

  if(!file) {
    return c.json({ message: 'No file uploaded', status: 400 }, { status: 400, statusText: 'Bad Request' })
  } else if(file.size > 1000000) {
    return c.json({ message: 'File size too large', status: 400 }, { status: 400, statusText: 'Bad Request' })
  } else if(!file.type.includes('image')) {
    return c.json({ message: 'Invalid file type', status: 400 }, { status: 400, statusText: 'Bad Request' })
  } else {
    const storageRef = ref(storage, `products/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on('state_changed',
      (snapshot: UploadTaskSnapshot) => {
        // Progress function
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      error => {
        return c.json({ 
          message: 'An error occurred',
          status: 500,
          reason: error.message,
          cause: error.cause
        }, { status: 500, statusText: 'Internal Server Error' })
      },
      () => {
        // Upload completed successfully
        return c.json({ 
          message: 'File uploaded successfully',
          status: 200,
          url: uploadTask.snapshot.ref.fullPath
        }, { status: 200, statusText: 'OK' })
      }
    )

  }
  return c.json(body)
  // const data = await db.insert(product).values({
  //   id: crypto.randomUUID(),
  //   slug: 'test-product',
  //   name: 'Test Product',
  //   category: 'test',
  //   price: 100.00,
  //   stock: 100,
    
  // })
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
    return c.json(data)
  }
})

export const GET = handle(app)
export const POST = handle(app)