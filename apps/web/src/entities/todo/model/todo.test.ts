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
    const firstUpdatedTime = formatISO(now.getTime() + 60 * 1000)
    const secondUpdatedTime = formatISO(now.getTime() + 120 * 1000)

    vi.useFakeTimers()
    vi.setSystemTime(initialTime)

    const todo = createTodo({
      title: "첫 번째 할 일",
    })

    vi.setSystemTime(firstUpdatedTime)

    const firstToggledTodo = toggleTodo(todo)

    expect(firstToggledTodo.completed).toBe(true)
    expect(firstToggledTodo.updatedAt).toEqual(firstUpdatedTime)

    vi.setSystemTime(secondUpdatedTime)

    const secondToggledTodo = toggleTodo(todo)

    expect(secondToggledTodo.completed).toBe(true)
    expect(secondToggledTodo.updatedAt).toEqual(secondUpdatedTime)

    vi.useRealTimers()
  })
})
