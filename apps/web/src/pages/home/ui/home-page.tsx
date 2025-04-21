"use client"

import type { Todo } from "@/entities/todo"

import { useState } from "react"

import {
  CheckIcon,
  EditIcon,
  PlusIcon,
  TrashIcon,
  XIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Input } from "@workspace/ui/components/input"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"

import { BaseLayout } from "@/app/layouts"
import {
  createTodo,
  deleteTodo,
  toggleTodo,
  changeTodoTitle,
} from "@/entities/todo"

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [title, setTitle] = useState("")
  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editingTodoTitle, setEditingTodoTitle] = useState("")

  const handleInputTitle = (event: React.FormEvent<HTMLInputElement>) => {
    setTitle(event.currentTarget.value)
  }

  const handleInputTitleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTodo()
      setTitle("")
    }
  }

  const handleCreateTodo = () => {
    if (title.length === 0) {
      return
    }

    const newTodo = createTodo({ title })
    setTodos([...todos, newTodo])
  }

  const toggleComplete = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return toggleTodo(todo)
      }
      return todo
    })

    setTodos(updatedTodos)
  }

  const handleDeleteTodo = (id: string) => {
    const targetTodo = todos.find((todo) => todo.id === id)

    if (targetTodo) {
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return deleteTodo(todo)
        }
        return todo
      }).filter((todo) => !todo.deletedAt)

      setTodos(updatedTodos)
    }
  }

  const handleStartEditingTodo = (id: string) => {
    setEditingTodoId(id)
    setEditingTodoTitle(todos.find((todo) => todo.id === id)?.title || "")
  }

  const handleSaveEditedTodoTitle = () => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === editingTodoId) {
        return changeTodoTitle({
          todo,
          title: editingTodoTitle,
        })
      }
      return todo
    })
    setTodos(updatedTodos)
    setEditingTodoId(null)
  }

  return (
    <BaseLayout>
      <div className="flex flex-col gap-8 mb-10">
        <h1 className="text-base font-bold tracking-wider">
          Todo List
        </h1>
        <div className="flex gap-2">
          <Input
            value={title}
            placeholder="할 일을 입력하세요."
            onInput={handleInputTitle}
            onKeyDown={handleInputTitleKeyDown}
          />
          <Button onClick={handleCreateTodo} className="cursor-pointer">
            <PlusIcon />
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <div key={todo.id} className="flex items-center justify-between gap-2 px-4 py-2 rounded-md border">
            {editingTodoId === todo.id ? (
              <div className="flex items-center gap-2">
                <Input
                  value={editingTodoTitle}
                  onInput={(event) => {
                    setEditingTodoTitle(event.currentTarget.value)
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      handleSaveEditedTodoTitle()
                    }
                  }}
                  autoFocus
                />
                <Button onClick={handleSaveEditedTodoTitle} className="cursor-pointer">
                  <CheckIcon />
                </Button>
                <Button onClick={() => setEditingTodoId(null)} className="cursor-pointer">
                  <XIcon />
                </Button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={() => toggleComplete(todo.id)} />
                  <label htmlFor={todo.id} className={cn("cursor-pointer text-sm", { "line-through": todo.completed })}>
                    {todo.title}
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="icon" onClick={() => handleStartEditingTodo(todo.id)} className="cursor-pointer">
                    <EditIcon />
                  </Button>
                  <Button variant="destructive" size="icon" onClick={() => handleDeleteTodo(todo.id)} className="cursor-pointer">
                    <TrashIcon />
                  </Button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </BaseLayout>
  )
}
