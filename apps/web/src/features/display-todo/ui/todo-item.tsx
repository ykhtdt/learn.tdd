"use client"

import type { Todo } from "@/entities/todo"

import {
  Fragment,
  useCallback,
} from "react"

import {
  EditIcon,
  TrashIcon,
} from "lucide-react"

import { cn } from "@workspace/ui/lib/utils"
import { Button } from "@workspace/ui/components/button"
import { Checkbox } from "@workspace/ui/components/checkbox"

interface TodoItemProps {
  todo: Todo
  onToggleComplete: (id: string) => void
  onEditStart: (id: string) => void
  onDelete: (id: string) => void
}

export const TodoItem = ({
  todo,
  onToggleComplete,
  onEditStart,
  onDelete,
}: TodoItemProps) => {
  const handleToggleComplete = useCallback(() => {
    onToggleComplete(todo.id)
  }, [onToggleComplete, todo.id])

  const handleEditStart = useCallback(() => {
    onEditStart(todo.id)
  }, [onEditStart, todo.id])

  const handleDelete = useCallback(() => {
    onDelete(todo.id)
  }, [onDelete, todo.id])

  return (
    <Fragment>
      <div className="flex items-center gap-2" data-completed={todo.completed ? "true" : "false"} data-testid="todo-status-container">
        <Checkbox id={todo.id} checked={todo.completed} onCheckedChange={handleToggleComplete} data-testid="todo-checkbox" />
        <label htmlFor={todo.id} className={cn("cursor-pointer text-sm", { "line-through": todo.completed })} data-testid="todo-title">
          {todo.title}
        </label>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="icon" onClick={handleEditStart} className="cursor-pointer" data-testid="edit-todo-button">
          <EditIcon />
          <span className="sr-only">
            수정
          </span>
        </Button>
        <Button variant="destructive" size="icon" onClick={handleDelete} className="cursor-pointer" data-testid="delete-todo-button">
          <TrashIcon />
          <span className="sr-only">
            제거
          </span>
        </Button>
      </div>
    </Fragment>
  )
}
