import { test, expect } from "@playwright/test";

test.describe("博客网站测试", () => {
  test("首页 - 显示文章列表", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("h1")).toHaveText("最新文章");
    await expect(page.locator("article")).toHaveCount(3);
    await expect(page.locator("article").first()).toContainText(
      "Hello World - 我的第一篇博客"
    );
  });

  test("首页 - 导航栏正常显示", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
    await expect(page.locator('nav a[href="/"]').first()).toHaveText("我的博客");
    await expect(page.locator('nav a[href="/categories"]')).toHaveText("分类");
  });

  test("文章详情页 - 点击文章跳转并显示内容", async ({ page }) => {
    await page.goto("/");
    await page.click("text=Hello World - 我的第一篇博客");
    await expect(page).toHaveURL("/posts/hello-world");
    await expect(page.locator("h1")).toHaveText(
      "Hello World - 我的第一篇博客"
    );
    await expect(page.locator(".prose")).toBeVisible();
    await expect(page.locator(".prose")).toContainText("你好，世界！");
  });

  test("文章详情页 - 显示标签和分类", async ({ page }) => {
    await page.goto("/posts/hello-world");
    await expect(page.locator("text=随笔")).toBeVisible();
    await expect(page.getByText("博客", { exact: true })).toBeVisible();
  });

  test("文章详情页 - 返回首页链接", async ({ page }) => {
    await page.goto("/posts/hello-world");
    await page.click("text=← 返回首页");
    await expect(page).toHaveURL("/");
  });

  test("分类列表页 - 显示所有分类", async ({ page }) => {
    await page.goto("/categories");
    await expect(page.locator("h1")).toHaveText("文章分类");
    await expect(page.locator("text=技术")).toBeVisible();
    await expect(page.locator("text=随笔")).toBeVisible();
  });

  test("分类筛选页 - 按分类筛选文章", async ({ page }) => {
    await page.goto("/categories");
    await page.click("text=技术");
    await expect(page.locator("h1")).toContainText("技术");
    await expect(page.locator("article")).toHaveCount(2);
  });

  test("响应式 - 移动端布局", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto("/");
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator("nav")).toBeVisible();
  });
});
