"use client"

import type { Todo } from "@/entities/todo"

import {
  useState,
  useCallback,
} from "react"

import { BaseLayout } from "@/app/layouts"
import {
  createTodo,
  deleteTodo,
  toggleTodo,
  changeTodoTitle,
} from "@/entities/todo"
import { CreateTodo } from "@/features/create-todo"
import { EditTodo } from "@/features/edit-todo"
import { TodoItem } from "@/features/display-todo"

export const HomePage = () => {
  const [todos, setTodos] = useState<Todo[]>([])

  const [editingTodoId, setEditingTodoId] = useState<string | null>(null)
  const [editingTodoTitle, setEditingTodoTitle] = useState("")

  const handleCreateTodo = useCallback((title: string) => {
    const newTodo = createTodo({ title })
    setTodos([...todos, newTodo])
  }, [todos])

  const toggleComplete = useCallback((id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return toggleTodo(todo)
      }
      return todo
    })

    setTodos(updatedTodos)
  }, [todos])

  const handleDeleteTodo = useCallback((id: string) => {
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
  }, [todos])

  const handleEditTodoStart = useCallback((id: string) => {
    setEditingTodoId(id)
    setEditingTodoTitle(todos.find((todo) => todo.id === id)?.title || "")
  }, [todos])

  const handleEditTodoTitleChange = useCallback((title: string) => {
    setEditingTodoTitle(title)
  }, [])

  const handleEditTodoReset = useCallback(() => {
    setEditingTodoId(null)
    setEditingTodoTitle("")
  }, [])

  const handleEditTodoSave = useCallback(() => {
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

    handleEditTodoReset()
  }, [editingTodoId, editingTodoTitle, handleEditTodoReset, todos])

  return (
    <BaseLayout>
      <div className="flex flex-col gap-8 mb-10">
        <h1 className="text-base font-bold tracking-wider">
          Todo List
        </h1>
        <CreateTodo onCreate={handleCreateTodo} />
      </div>

      <div className="flex flex-col gap-4">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className="flex items-center justify-between gap-2 px-4 py-2 rounded-md border"
            data-testid="todo-item"
            data-todo-id={todo.id}
          >
            {editingTodoId === todo.id ?
              <EditTodo
                defaultValue={todo.title}
                onChange={handleEditTodoTitleChange}
                onSave={handleEditTodoSave}
                onReset={handleEditTodoReset}
              />
              :
              <TodoItem
                todo={todo}
                onToggleComplete={toggleComplete}
                onEditStart={handleEditTodoStart}
                onDelete={handleDeleteTodo}
              />
            }
          </div>
        ))}
      </div>
    </BaseLayout>
  )
}
