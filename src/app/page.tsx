"use client"
import { useEffect, useState } from "react"
import Link from "next/link"

interface Post {
  id: number
  title: string
  content: string
  author: string
  createdAt: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/posts")
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error("Постуудыг татахад алдаа гарлаа:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">Ачааллаж байна...</div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Миний Блог</h1>
        <Link
          href="/create"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Шинэ пост бичих
        </Link>
      </div>

      <div className="space-y-6">
        {posts.length === 0 ? (
          <div className="text-center text-gray-500 py-12">
            <p>Одоогоор пост байхгүй байна.</p>
            <Link href="/create" className="text-blue-500 hover:underline">
              Эхний постоо бичээрэй!
            </Link>
          </div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>Зохиогч: {post.author}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString("mn-MN")}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
