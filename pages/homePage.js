import { expect } from "playwright/test";
export class HomePage {
  constructor(page) {
    this.page = page;
  }

  //Locators
  pageTitle = () => this.page.getByRole("link", { name: "LOVELY STUFF" });
  homePageHeaderButton = () => this.page.getByRole("link", { name: "Home" });
  shopPageHeaderButton = () => this.page.getByRole("link", { name: "Shop" });
  bestSellerTitle = () => this.page.getByRole("link", { name: "Best Seller Quick View" });

  //Functions
  async goToHomePage() {
    await this.page.goto("/stuff");
  }

  //Assertion
  async assertPageTitleIsPresent() {
    const pageTitle = this.pageTitle();
    await expect(pageTitle).toBeVisible();
  }
  async asserthomePageHeaderButtonIsPresent() {
    const homePageHeaderButton = this.homePageHeaderButton();
    await expect(homePageHeaderButton).toBeVisible();
  }
  async assertshopPageHeaderButtonIsPresent() {
    const shopPageHeaderButton = this.shopPageHeaderButton();
    await expect(shopPageHeaderButton).toBeVisible();
  }
  async assertbestSellerTitleIsPresent() {
    const bestSeller = this.bestSellerTitle();
    await expect(bestSeller).toBeVisible();
  }

  //Keywords

  async assertionsForHomePage() {
    await this.assertPageTitleIsPresent();
    await this.asserthomePageHeaderButtonIsPresent();
    await this.assertshopPageHeaderButtonIsPresent();
    await this.assertbestSellerTitleIsPresent();
  }
}