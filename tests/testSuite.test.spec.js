import { test } from "@playwright/test";
import { HomePage } from "../pages/homePage";
import { ShopPage } from "../pages/shopPage";

//let browser, context, page;
let homePage;
let shopPage;
test.describe("Website common flow test", () => {
  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    shopPage = new ShopPage(page);
    homePage.goToHomePage();
  });

  test.afterEach(async ({ page }) => {
    await page.close();
  });
  test("Assert if homepage is loaded", async ({ page }) => {
    await homePage.assertionsForHomePage();
  });
  test("Adding products into cart and going to checkout", async ({ page }) => {
    await shopPage.shopPageFunctions();
  });
});
