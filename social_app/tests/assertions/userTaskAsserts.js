import { expect } from '@playwright/test';
import { SELECTORS, URLS } from '../dom-selectors/selectors';

export const UserTaskAssert = {
    async isHomePage(page){
        expect(page.url()).toContain(URLS.home());
    },
    async isAddUserPage(page){
        expect(page.url()).toContain(URLS.addUser());
    },

    async checkUserFieldsAreEmpty(page) {
        await expect(page.getByTitle(SELECTORS.userName)).toHaveValue('');
        await expect(page.getByTitle(SELECTORS.userEmail)).toHaveValue('');
        await expect(page.getByTitle(SELECTORS.userMobile)).toHaveValue('');
        await expect(page.getByTitle(SELECTORS.userDOB)).toHaveValue('');
        await expect(page.getByTitle(SELECTORS.userGender)).toHaveValue('');
    },

    async isPostUserApiSuccess(response){
        expect(response.url()).toContain(URLS.userUrl());
        expect(response.status()).toBe(201);
    },

    async isNotificationShownForNameAndEmail(page){
        let notifyComp = await page.getByTestId(SELECTORS.notificationComp);
        await expect(notifyComp).toHaveText(SELECTORS.recheckMobileDobGender);
    },

    async isNotificationShownToEnableEditMode(page){
        let notifyComp = await page.getByTestId(SELECTORS.notificationComp);
        await expect(notifyComp).toHaveText(SELECTORS.recheckEditModeIsEnabled);
    },

    async isNotifyDataDeletedInDb(page){
        let notifyComp = await page.getByTestId(SELECTORS.notificationComp);
        await expect(notifyComp).toHaveText(SELECTORS.dataDeletedInDb);
    },

    async isAddUserBtnVisible(page){
        let addUserBtn = page.getByTitle(SELECTORS.addUsers);
        await expect(addUserBtn).toBeVisible();
    },

    async isUsersTableVisible(page){
        let usersTable = await page.getByTestId("usersContainer");
        await expect(usersTable).toBeVisible();
    },

}


