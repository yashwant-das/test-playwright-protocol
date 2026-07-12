import { Page, Locator } from '@playwright/test';
import { BasePage } from '../BasePage';

/**
 * Sidebar component page object for Sauce Demo navigation menu.
 * Covers hamburger menu toggle, sidebar links, and logout flow.
 */
export class Sidebar extends BasePage {
  /**
   * @selector #react-burger-menu-btn
   * @strategy id
   * @verified false
   */
  readonly hamburgerMenuButton: Locator;

  /**
   * @selector [data-test="logout-sidebar-link"]
   * @strategy id
   * @verified false
   */
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.hamburgerMenuButton = page.locator('#react-burger-menu-btn');
    this.logoutButton = page.locator('[data-test="logout-sidebar-link"]');
  }

  /**
   * Opens the sidebar navigation menu by clicking the hamburger button.
   */
  async open() {
    await this.hamburgerMenuButton.click();
  }

  /**
   * Logs out the current user by opening the sidebar and clicking logout.
   */
  async logout() {
    await this.open();
    await this.logoutButton.click();
  }
}
