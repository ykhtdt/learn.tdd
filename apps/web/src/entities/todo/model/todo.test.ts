import {
  describe,
  it,
  expect,
  vi,
} from "vitest"

import { formatISO } from "date-fns"

import {
  createTodo,
  toggleTodo,
} from "./todo"

describe("Todo Entity", () => {
  it("새로운 Todo를 생성할 수 있다", () => {
    const todo = createTodo({
      title: "첫 번째 할 일",
    })

    expect(todo.id).toBeDefined()
    expect(todo.title).toBe("첫 번째 할 일")
    expect(todo.completed).toBe(false)
    expect(todo.createdAt).toBeDefined()
    expect(todo.updatedAt).toBeDefined()
  })

  it("Todo의 완료 상태를 토글할 수 있다", () => {
    const now = new Date()
    const initialTime = formatISO(now)
    const updatedTime = formatISO(now.getTime() + 60 * 1000)

    vi.useFakeTimers()
    vi.setSystemTime(initialTime)

    const todo = createTodo({
      title: "두 번째 할 일",
    })

    expect(todo.completed).toBe(false)
    expect(todo.updatedAt).toEqual(initialTime)


    vi.setSystemTime(updatedTime)

    const toggledTodo = toggleTodo(todo)

    expect(toggledTodo.completed).toBe(true)
    expect(toggledTodo.updatedAt).toEqual(updatedTime)

    vi.useRealTimers()

  })
})
