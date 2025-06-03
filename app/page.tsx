"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Users, Share2, Save, FileText } from "lucide-react"
import CollaborativeEditor from "@/components/collaborative-editor"
import UserPresence from "@/components/user-presence"

interface User {
  id: string
  name: string
  color: string
  cursor?: { line: number; column: number }
  isActive: boolean
}

interface Document {
  id: string
  title: string
  content: string
  lastModified: Date
  collaborators: User[]
}

export default function DocumentEditor() {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [document, setDocument] = useState<Document>({
    id: "doc-1",
    title: "Untitled Document",
    content:
      "Welcome to the collaborative document editor!\n\nStart typing to see real-time collaboration in action. Multiple users can edit simultaneously with live cursor tracking and instant synchronization.\n\nFeatures:\n• Real-time text synchronization\n• Live cursor positions\n• User presence indicators\n• Auto-save functionality\n• Collaborative editing",
    lastModified: new Date(),
    collaborators: [],
  })
  const [isConnected, setIsConnected] = useState(false)
  const [userName, setUserName] = useState("")
  const [showJoinForm, setShowJoinForm] = useState(true)

  const userColors = ["#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7", "#DDA0DD", "#98D8C8"]

  const joinSession = () => {
    if (!userName.trim()) return

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: userName,
      color: userColors[Math.floor(Math.random() * userColors.length)],
      isActive: true,
    }

    setCurrentUser(newUser)
    setDocument((prev) => ({
      ...prev,
      collaborators: [...prev.collaborators, newUser],
    }))
    setIsConnected(true)
    setShowJoinForm(false)

    // Simulate other users joining
    setTimeout(() => {
      const simulatedUsers: User[] = [
        { id: "user-2", name: "Alice Johnson", color: "#4ECDC4", isActive: true },
        { id: "user-3", name: "Bob Smith", color: "#45B7D1", isActive: true },
      ]

      setDocument((prev) => ({
        ...prev,
        collaborators: [...prev.collaborators, ...simulatedUsers],
      }))
    }, 2000)
  }

  const updateDocument = (content: string) => {
    setDocument((prev) => ({
      ...prev,
      content,
      lastModified: new Date(),
    }))
  }

  const updateTitle = (title: string) => {
    setDocument((prev) => ({
      ...prev,
      title,
      lastModified: new Date(),
    }))
  }

  const updateUserCursor = (cursor: { line: number; column: number }) => {
    if (!currentUser) return

    setDocument((prev) => ({
      ...prev,
      collaborators: prev.collaborators.map((user) => (user.id === currentUser.id ? { ...user, cursor } : user)),
    }))
  }

  if (showJoinForm) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl">Join Collaborative Session</CardTitle>
            <p className="text-gray-600">Enter your name to start editing together</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              placeholder="Enter your name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && joinSession()}
            />
            <Button onClick={joinSession} className="w-full" disabled={!userName.trim()}>
              Join Session
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <Input
                value={document.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="border-none text-lg font-semibold bg-transparent p-0 h-auto focus-visible:ring-0"
              />
            </div>
            <Badge variant={isConnected ? "default" : "secondary"} className="ml-2">
              {isConnected ? "Connected" : "Offline"}
            </Badge>
          </div>

          <div className="flex items-center space-x-4">
            <UserPresence users={document.collaborators} />
            <Button variant="outline" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Save className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Editor */}
          <div className="lg:col-span-3">
            <CollaborativeEditor
              content={document.content}
              onChange={updateDocument}
              onCursorChange={updateUserCursor}
              collaborators={document.collaborators}
              currentUser={currentUser}
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Active Users */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Active Users ({document.collaborators.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {document.collaborators.map((user) => (
                  <div key={user.id} className="flex items-center space-x-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback style={{ backgroundColor: user.color }} className="text-white text-xs">
                        {user.name.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.id === currentUser?.id ? "You" : "Collaborator"}</p>
                    </div>
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: user.isActive ? "#10B981" : "#6B7280" }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Document Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium">Document Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-500">Last modified:</span>
                  <p>{document.lastModified.toLocaleString()}</p>
                </div>
                <div>
                  <span className="text-gray-500">Characters:</span>
                  <p>{document.content.length}</p>
                </div>
                <div>
                  <span className="text-gray-500">Words:</span>
                  <p>{document.content.split(/\s+/).filter((word) => word.length > 0).length}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
