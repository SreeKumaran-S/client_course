import { test } from '@playwright/test';;
import AddUserPage from '../page-object-model/AddUserPage';
import { UserTaskAssert } from "../assertions/userTaskAsserts";
import { URLS } from '../dom-selectors/selectors';

test.describe("@addPage", () => {
  test.describe.configure({ mode: 'serial' }); 

  test('fill, submit and redirect to homepage', async ({ page }) => {
    let addUserPage = AddUserPage(page);
    await addUserPage.gotoAddUserPage();

    await addUserPage.populateUserData();
    let [response] = await Promise.all([
      page.waitForResponse(resp => resp.url().includes(URLS.userUrl())),
      addUserPage.actionSignup()
    ]);
   
    await UserTaskAssert.isPostUserApiSuccess(response);
    await page.waitForURL(addUserPage.homePageUrl);
    await UserTaskAssert.isHomePage(page);
    await page.waitForTimeout(1000);
    await page.close();
  })

  test('fill and reset data', async ({ page }) => {
    let addUserPage = AddUserPage(page);
    await addUserPage.gotoAddUserPage();

    await addUserPage.populateUserData();
    await addUserPage.actionReset();

    await UserTaskAssert.checkUserFieldsAreEmpty(page);
    await page.waitForTimeout(1000);
    await page.close();
  })

  test("fill only userName, userEmail should notify with incorrect fields", async ({ page }) => {
    let addUserPage = AddUserPage(page);
    await addUserPage.gotoAddUserPage();

    await addUserPage.populateOnlyNameAndEmail();
    await addUserPage.actionSignup();
    await UserTaskAssert.isNotificationShownForNameAndEmail(page);
    await page.waitForTimeout(1000);
    await page.close();
  })
})
