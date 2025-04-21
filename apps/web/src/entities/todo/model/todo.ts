import type { Todo } from "./types"

import { v4 as uuidv4 } from "uuid"
import { formatISO } from "date-fns"

export const checkTodoTitle = ({
  title,
}: {
  title: string
}): void => {
  if (title.length === 0) {
    throw new Error("제목을 입력해주세요.")
  }

  if (title.length > 30) {
    throw new Error("제목은 30자 이하로 입력해주세요.")
  }
}

export const createTodo = ({
  title,
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

export const changeTodoTitle = ({
  todo,
  title,
}: {
  todo: Todo
  title: string
}): Todo => {
  return {
    ...todo,
    title,
    updatedAt: formatISO(new Date()),
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
