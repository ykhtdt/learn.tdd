import type { Todo } from "./types"

import { v4 as uuidv4 } from "uuid"
import { formatISO } from "date-fns"

export const createTodo = ({
  title
}: {
  title: string
}): Todo => {
  return {
    id: uuidv4(),
    title,
    completed: false,
    createdAt: formatISO(new Date()),
    updatedAt: formatISO(new Date()),
    deletedAt: null,
  }
}

export const toggleTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    completed: !todo.completed,
    updatedAt: formatISO(new Date()),
  }
}

export const deleteTodo = (todo: Todo): Todo => {
  return {
    ...todo,
    deletedAt: formatISO(new Date()),
  }
}
