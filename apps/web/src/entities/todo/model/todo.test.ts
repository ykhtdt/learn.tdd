import {
  describe,
  it,
  expect,
  vi,
} from "vitest"

import { formatISO } from "date-fns"

import {
  createTodo,
  changeTodoTitle,
  deleteTodo,
  toggleTodo,
  checkTodoTitle,
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
    expect(todo.deletedAt).toBeNull()
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

    const secondToggledTodo = toggleTodo(firstToggledTodo)

    expect(secondToggledTodo.completed).toBe(false)
    expect(secondToggledTodo.updatedAt).toEqual(secondUpdatedTime)

    vi.useRealTimers()
  })

  it("Todo를 제거할 수 있다", () => {
    const todo = createTodo({
      title: "첫 번째 할 일",
    })

    const deletedTodo = deleteTodo(todo)

    expect(deletedTodo.deletedAt).not.toBeNull()
  })

  it("Todo를 제목을 수정할 수 있다", () => {
    const todo = createTodo({
      title: "첫 번째 할 일",
    })

    const updatedTodo = changeTodoTitle({
      todo,
      title: "수정된 할 일",
    })

    expect(updatedTodo.title).toBe("수정된 할 일")
  })

  describe("Todo 제목을 검증한다", () => {
    it("제목이 비어있을 경우 checkTodoTitle 함수가 에러를 발생시킨다", () => {
      expect(() => checkTodoTitle({ title: "" })).toThrowError("제목을 입력해주세요.")
    })

    it("제목이 30자를 초과할 경우 checkTodoTitle 함수가 에러를 발생시킨다", () => {
      const longTitle = "이 제목은 30자가 넘는 매우 긴 제목입니다. 이렇게 긴 제목은 허용되지 않습니다."
      expect(() => checkTodoTitle({ title: longTitle })).toThrowError("제목은 30자 이하로 입력해주세요.")
    })

    it("유효한 제목일 경우 checkTodoTitle 함수는 에러를 발생시키지 않는다", () => {
      expect(() => checkTodoTitle({ title: "유효한 제목" })).not.toThrowError()
    })
  })
})
