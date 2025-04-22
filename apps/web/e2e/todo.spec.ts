import {
  test,
  expect,
} from "@playwright/test"

test.describe("Todo List 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("새로운 Todo를 생성할 수 있다", async ({ page }) => {
    const todoText = "첫 번째 할 일"
    const input = page.getByTestId("todo-input")

    await input.fill(todoText)
    await page.getByTestId("create-todo-button").click()

    const todoItem = page.getByTestId("todo-item").first()
    const todoId = await todoItem.getAttribute("data-todo-id")
    expect(todoId).not.toBeNull()

    await expect(todoItem.getByTestId("todo-title")).toContainText(todoText)
  })

  test("기존 Todo를 완료 표시할 수 있다", async ({ page }) => {
    const todoText = "첫 번째 할 일"
    const input = page.getByTestId("todo-input")

    await input.fill(todoText)
    await page.getByTestId("create-todo-button").click()

    const todoItem = page.getByTestId("todo-item").first()
    const todoId = await todoItem.getAttribute("data-todo-id")
    expect(todoId).not.toBeNull()

    await todoItem.getByTestId("todo-checkbox").click()

    await expect(todoItem.getByTestId("todo-status-container")).toHaveAttribute("data-completed", "true")
  })

  test("할 일을 삭제할 수 있다", async ({ page }) => {
    const todoText = "삭제할 할 일"
    const input = page.getByTestId("todo-input")
    await input.fill(todoText)
    await page.getByTestId("create-todo-button").click()

    const todoItem = page.getByTestId("todo-item").first()
    const todoId = await todoItem.getAttribute("data-todo-id")
    expect(todoId).not.toBeNull()

    const todoItems = page.getByTestId("todo-item")
    const todoCountBefore = await todoItems.count()

    await todoItem.getByTestId("delete-todo-button").click()

    const todoCountAfter = await page.getByTestId("todo-item").count()
    expect(todoCountAfter).toBe(todoCountBefore - 1)

    await expect(page.locator(`[data-testid="todo-item"][data-todo-id="${todoId}"]`)).not.toBeVisible()
  })

  test("할 일의 제목을 변경할 수 있다", async ({ page }) => {
    const initialTodoText = "변경할 할 일"
    const updatedTodoText = "변경된 할 일"

    const input = page.getByTestId("todo-input")
    await input.fill(initialTodoText)
    await page.getByTestId("create-todo-button").click()

    const todoItem = page.getByTestId("todo-item").first()
    const todoId = await todoItem.getAttribute("data-todo-id")
    expect(todoId).not.toBeNull()

    await expect(todoItem.getByTestId("todo-title")).toContainText(initialTodoText)

    await todoItem.getByTestId("edit-todo-button").click()

    await page.getByTestId("edit-todo-input").fill(updatedTodoText)
    await page.getByTestId("save-todo-button").click()

    await expect(todoItem.getByTestId("todo-title")).toContainText(updatedTodoText)
    await expect(todoItem.getByTestId("todo-title")).not.toContainText(initialTodoText)
  })
})
