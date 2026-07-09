import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const dataFilePath = path.join(process.cwd(), 'src/data/reviews.json')

function getReviews() {
  try {
    if (!fs.existsSync(dataFilePath)) {
      return []
    }
    const data = fs.readFileSync(dataFilePath, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading reviews:', error)
    return []
  }
}

function saveReviews(reviews) {
  try {
    const dirPath = path.dirname(dataFilePath)
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    fs.writeFileSync(dataFilePath, JSON.stringify(reviews, null, 2), 'utf8')
    return true
  } catch (error) {
    console.error('Error saving reviews:', error)
    return false
  }
}

export async function GET() {
  const reviews = getReviews()
  return NextResponse.json(reviews)
}

export async function POST(request) {
  try {
    const body = await request.json()
    const { name, title, rating, text, avatar } = body

    if (!name || !title || rating === undefined || !text) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const reviews = getReviews()
    const newReview = {
      id: Date.now().toString(),
      name,
      title,
      rating: parseFloat(rating),
      text,
      avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'
    }

    reviews.unshift(newReview) // Add new review at the beginning
    if (saveReviews(reviews)) {
      return NextResponse.json(newReview, { status: 201 })
    } else {
      return NextResponse.json({ error: 'Failed to save review' }, { status: 500 })
    }
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json({ error: 'Missing review id' }, { status: 400 })
    }

    let reviews = getReviews()
    reviews = reviews.filter((r) => r.id !== id)

    if (saveReviews(reviews)) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Failed to delete review' }, { status: 500 })
    }
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
}
