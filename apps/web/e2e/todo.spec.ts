import {
  test,
  expect,
} from "@playwright/test"

test.describe("Todo List 테스트", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("새로운 Todo를 생성할 수 있다", async ({ page }) => {
    const input = page.getByPlaceholder("할 일을 입력하세요.")

    await input.fill("첫 번째 할 일")
    await page.getByRole("button", { name: /추가/i }).click()
    await expect(page.getByText("첫 번째 할 일")).toBeVisible()
  })
})
