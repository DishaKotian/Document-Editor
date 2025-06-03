import { type NextRequest, NextResponse } from "next/server"

// In a real application, this would connect to MongoDB or PostgreSQL
const documents = new Map()

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const docId = searchParams.get("id")

  if (docId) {
    const document = documents.get(docId) || {
      id: docId,
      title: "New Document",
      content: "",
      lastModified: new Date(),
      collaborators: [],
    }
    return NextResponse.json(document)
  }

  return NextResponse.json(Array.from(documents.values()))
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { id, title, content, collaborators } = body

  const document = {
    id,
    title,
    content,
    lastModified: new Date(),
    collaborators,
  }

  documents.set(id, document)

  // In a real app, this would broadcast to all connected clients via WebSocket
  return NextResponse.json(document)
}

export async function PUT(request: NextRequest) {
  const body = await request.json()
  const { id, ...updates } = body

  const existingDoc = documents.get(id)
  if (!existingDoc) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 })
  }

  const updatedDoc = {
    ...existingDoc,
    ...updates,
    lastModified: new Date(),
  }

  documents.set(id, updatedDoc)

  return NextResponse.json(updatedDoc)
}
