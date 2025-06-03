"use client"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface User {
  id: string
  name: string
  color: string
  cursor?: { line: number; column: number }
  isActive: boolean
}

interface UserPresenceProps {
  users: User[]
}

export default function UserPresence({ users }: UserPresenceProps) {
  return (
    <div className="flex items-center space-x-2">
      <div className="flex -space-x-2">
        {users.slice(0, 4).map((user) => (
          <Avatar key={user.id} className="w-8 h-8 border-2 border-white">
            <AvatarFallback style={{ backgroundColor: user.color }} className="text-white text-xs">
              {user.name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        ))}
        {users.length > 4 && (
          <Avatar className="w-8 h-8 border-2 border-white">
            <AvatarFallback className="bg-gray-500 text-white text-xs">+{users.length - 4}</AvatarFallback>
          </Avatar>
        )}
      </div>
      {users.length > 0 && (
        <span className="text-sm text-gray-600 ml-2">
          {users.length} {users.length === 1 ? "user" : "users"} online
        </span>
      )}
    </div>
  )
}
