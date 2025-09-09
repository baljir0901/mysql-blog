import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" }
    })
    return NextResponse.json(posts)
  } catch (error) {
    return NextResponse.json({ error: "Posts олж чадсангүй" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { title, content, author } = await request.json()
    
    const post = await prisma.post.create({
      data: { title, content, author }
    })
    
    return NextResponse.json(post)
  } catch (error) {
    return NextResponse.json({ error: "Post үүсгэж чадсангүй" }, { status: 500 })
  }
}
