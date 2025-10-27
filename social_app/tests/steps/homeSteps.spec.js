import { test } from '@playwright/test';;
import HomePage from '../page-object-model/HomePage';
import { UserTaskAssert } from "../assertions/userTaskAsserts";
import { URLS } from '../dom-selectors/selectors';

test.describe("@homePage", () => {
    test.describe.configure({ mode: 'serial' });

    test("Add Users nav button is present and check if it is redirecting to addUser page", async ({ page }) => {
        let homePage = HomePage(page);
        await homePage.gotoHomePage();
        await UserTaskAssert.isAddUserBtnVisible(page);
        await homePage.actionGotoAddUserPage();
        await page.waitForURL(homePage.addUserPageUrl);
        await page.close();
    })

    test("load user data into the table", async ({ page }) => {
        let homePage = HomePage(page);
        await Promise.all([
            page.waitForRequest(URLS.userUrl),
            homePage.gotoHomePage()
        ]);
        await UserTaskAssert.isUsersTableVisible(page);
        await page.close();
    })

    test("Delete and update operations require edit mode to be ON", async ({ page }) => {
        let homePage = HomePage(page);
        await Promise.all([
            page.waitForRequest(URLS.userUrl),
            homePage.gotoHomePage()
        ]);

        await homePage.deleteBtnClickBasedOnUserEmail("sreemass@example.com");
        await UserTaskAssert.isNotificationShownToEnableEditMode(page);
        await homePage.updateBtnClickBasedOnUserEmail("sreemass@example.com");
        await UserTaskAssert.isNotificationShownToEnableEditMode(page);
        await page.close();
    })

    test("Delete operation should perform if edit mode is ON", async ({ page }) => {
        let homePage = HomePage(page);
        await Promise.all([
            page.waitForRequest(req => req.url().includes(URLS.userUrl())),
            homePage.gotoHomePage()
        ]);

        await homePage.toggleOnEditModeBasedOnUserEmail("sreemass@example.com");

        await Promise.all([
            page.waitForRequest(req => req.url().includes(URLS.userUrl()) && req.method() === 'DELETE'),
            page.waitForResponse(resp => resp.url().includes(URLS.userUrl()) && resp.status() === 200),
            homePage.deleteBtnClickBasedOnUserEmail("sreemass@example.com"),
            page.waitForRequest(req => req.url().includes(URLS.userUrl()) && req.method() === 'GET')
        ]);

        await UserTaskAssert.isNotifyDataDeletedInDb(page);
        await page.close();
    })

    test("Update userName, userMobile operation should redirect to update page if edit mode is ON", async ({ page }) => {
        let homePage = HomePage(page);

        await homePage.gotoHomePage();

        await homePage.toggleOnEditModeBasedOnUserEmail("john.doe@example.com");

        await homePage.updateBtnClickBasedOnUserEmail("john.doe@example.com");

        await UserTaskAssert.isUpdateUserPage(page);
        let userData = {
            "userName": "john",
            "userEmail": "john.doe@example.com",
            "userMobile": "+919876543210",
            "userDOB": "1990-05-15",
            "userGender": "male",
        };
        await UserTaskAssert.validateUpdateLoadedFields(page, userData);
        await homePage.modifyUserName();
        await homePage.modifyUserMobile()
        await homePage.actionSignup();
        await UserTaskAssert.isHomePage(page);
        await UserTaskAssert.isNotifyDataUpdatedInDb(page);
        await page.close();
    })
})