"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"

interface User {
  id: string
  name: string
  color: string
  cursor?: { line: number; column: number }
  isActive: boolean
}

interface CollaborativeEditorProps {
  content: string
  onChange: (content: string) => void
  onCursorChange: (cursor: { line: number; column: number }) => void
  collaborators: User[]
  currentUser: User | null
}

export default function CollaborativeEditor({
  content,
  onChange,
  onCursorChange,
  collaborators,
  currentUser,
}: CollaborativeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [localContent, setLocalContent] = useState(content)
  const [cursorPosition, setCursorPosition] = useState({ line: 0, column: 0 })

  useEffect(() => {
    setLocalContent(content)
  }, [content])

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value
    setLocalContent(newContent)
    onChange(newContent)

    // Update cursor position
    updateCursorPosition()
  }

  const updateCursorPosition = () => {
    if (!textareaRef.current) return

    const textarea = textareaRef.current
    const cursorPos = textarea.selectionStart
    const textBeforeCursor = localContent.substring(0, cursorPos)
    const lines = textBeforeCursor.split("\n")
    const line = lines.length - 1
    const column = lines[lines.length - 1].length

    const newCursor = { line, column }
    setCursorPosition(newCursor)
    onCursorChange(newCursor)
  }

  const handleKeyUp = () => {
    updateCursorPosition()
  }

  const handleClick = () => {
    updateCursorPosition()
  }

  // Simulate real-time changes from other users
  useEffect(() => {
    const interval = setInterval(() => {
      if (collaborators.length > 1 && Math.random() > 0.7) {
        // Simulate typing from other users
        const randomUser = collaborators.find((u) => u.id !== currentUser?.id)
        if (randomUser) {
          // This would normally come from WebSocket
          console.log(`${randomUser.name} is typing...`)
        }
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [collaborators, currentUser])

  return (
    <Card className="h-[600px] relative overflow-hidden">
      <div className="relative h-full">
        {/* Collaborative cursors overlay */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {collaborators
            .filter((user) => user.id !== currentUser?.id && user.cursor)
            .map((user) => (
              <div
                key={user.id}
                className="absolute"
                style={{
                  top: `${user.cursor!.line * 24 + 16}px`,
                  left: `${user.cursor!.column * 8 + 16}px`,
                }}
              >
                <div className="w-0.5 h-6 animate-pulse" style={{ backgroundColor: user.color }} />
                <div
                  className="absolute -top-6 left-0 px-2 py-1 rounded text-xs text-white whitespace-nowrap"
                  style={{ backgroundColor: user.color }}
                >
                  {user.name}
                </div>
              </div>
            ))}
        </div>

        {/* Main editor */}
        <textarea
          ref={textareaRef}
          value={localContent}
          onChange={handleContentChange}
          onKeyUp={handleKeyUp}
          onClick={handleClick}
          className="w-full h-full p-4 border-none outline-none resize-none font-mono text-sm leading-6 bg-transparent"
          placeholder="Start typing your document..."
          style={{ lineHeight: "24px" }}
        />

        {/* Status bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gray-50 border-t px-4 py-2 flex justify-between items-center text-xs text-gray-500">
          <div>
            Line {cursorPosition.line + 1}, Column {cursorPosition.column + 1}
          </div>
          <div className="flex items-center space-x-4">
            <span>{localContent.length} characters</span>
            <span>{localContent.split(/\s+/).filter((word) => word.length > 0).length} words</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Auto-saving...</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
