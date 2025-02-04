import { expect, request } from "playwright/test";
import { HomePage } from "./homePage";
export class ShopPage {
  constructor(page, cookies) {
    this.page = page;
    this.cookies = cookies;
  }

  //Locators
  shoesOption = () => this.page.getByLabel("Shoes gallery").getByRole("link", { name: "Quick View" });
  selectColor = () => this.page.locator(".sQwyij4").first();
  addToCart = () => this.page.getByRole("button", { name: "Add to Cart" });
  viewCart = () => this.page.frameLocator("//*[contains(@name, 'tpapopup')]").getByRole("link").getByText("View Cart");
  goToCheckoutButton = () => this.page.getByRole("button", { name: "Checkout" });
  iframeLocatorCheckout = () => this.page.locator('iframe[name="tpaModal_rtby_f5vy8"]').contentFrame();
  message = () => this.iframeLocatorCheckout().getByText("We can't accept online orders");
  gotItButton = () => this.iframeLocatorCheckout().getByRole("button", { name: "Got It" });
  incrementProductButton = () => this.page.locator("label span").nth(1);

  //Functions
  async clickOnShopOption() {
    let hp = new HomePage(this.page);
    const shopOptionButton = await hp.shopPageHeaderButton();
    await shopOptionButton.click();
  }

  async selectShoesOption() {
    await this.shoesOption().click();
  }

  async clickOnPreferedColor() {
    await this.selectColor().click();
  }

  async selectToAddToCart() {
    await this.addToCart().click();
  }
  async clickOnViewCart() {
    await this.viewCart().click();
  }

  async clickOnGoToCheckOutButton() {
    await this.goToCheckoutButton().click();
  }

  async clickOnGotItButton() {
    await this.gotItButton().click();
  }

  async clickOnIncrementProductButton() {
    await this.incrementProductButton().click();
  }

  async getApiResponseForProductAmount() {
    const cookies = await this.page.context().cookies();
    const bSessionCookie = cookies.find((cookie) => cookie.name === "bSession");
    const bSession = bSessionCookie ? bSessionCookie.value : null;
    const amount = 170;
    const language = "en";
    const currency = "EUR";
    const url = `https://lovelytests.wixsite.com/_api/payment-services-web/payments/v2/accounts/1380b703-ce81-ff05-f115-39571d94dfcd:a1c7d44e-defb-4f8f-a2c9-69f895a52d31/bnpl/payment-methods?amount=${amount}&language=${language}&currency=${currency}`;
    if (!bSession) {
      console.error("bSession cookie is missing!");
      return;
    }

    const response = await this.page.request.get(url, {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/132.0.0.0",
        bSession: bSession,
      },
    });
    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(url);
  }

  async getApiResponseForMyCart() {
    const cookies = await this.page.context().cookies();
    const bSessionCookie = cookies.find((cookie) => cookie.name === "bSession");
    const bSession = bSessionCookie ? bSessionCookie.value : null;
    const expectedCartTitle = "My cart";
    const propertyField = "cart.shopping_cart_title";
    const url = `https://static.parastorage.com/services/wixstores-client-cart/1.2541.0/assets/locale/cart/messages_en.json`;
    if (!bSession) {
      console.error("bSession cookie is missing!");
      return;
    }

    const response = await this.page.request.get(url, {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/132.0.0.0",
        bSession: bSession,
      },
    });
    const responseBody = await response.json();
    expect(response.status()).toBe(200);
    expect(response.url()).toMatch(url);
    expect(responseBody[propertyField]).toBe(expectedCartTitle);
  }

  //Assertion
  async cantAcceptOnlineOrdersMessage() {
    const message = this.message();
    await expect(message).toBeVisible();
  }
  //Keywords
  async shopPageFunctions() {
    await this.clickOnShopOption();
    await this.selectShoesOption();
    await this.clickOnPreferedColor();
    await this.clickOnIncrementProductButton();
    await this.getApiResponseForProductAmount();
    await this.selectToAddToCart();
    await this.clickOnViewCart();
    await this.clickOnGoToCheckOutButton();
    await this.getApiResponseForMyCart();
    await this.cantAcceptOnlineOrdersMessage();
    await this.clickOnGotItButton();
  }
}