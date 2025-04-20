"use client"

import type { Todo } from "@/entities/todo"

import { useState } from "react"

import { PlusIcon } from "lucide-react"

import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"

import { BaseLayout } from "@/app/layouts"
import { createTodo } from "@/entities/todo"

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")

  const handleChangeTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTodo()
    }
  }

  const handleCreateTodo = () => {
    const newTodo = createTodo({ title })
    setTodos([...todos, newTodo])
  }

  return (
    <BaseLayout>
      <div className="flex flex-col gap-8">
        <h1 className="text-base font-bold tracking-wider">
          Todo List
        </h1>
        <div className="flex gap-2">
          <Input
            placeholder="할 일을 입력하세요."
            onInput={handleChangeTitle}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleCreateTodo} className="cursor-pointer">
            <PlusIcon />
          </Button>
        </div>
      </div>
    </BaseLayout>
  )
}
