import { SELECTORS, URLS } from '../dom-selectors/selectors';
export default function AddUserPage(page) {
    let homePageUrl = new URL(URLS.home(), URLS.host()).toString();
    let addUserPageUrl = new URL(URLS.addUser(), URLS.host()).toString();

    return {
        homePageUrl,
        addUserPageUrl,

        async gotoHomePage() {
            await page.goto(homePageUrl);
        },
        async gotoAddUserPage() {
            await page.goto(addUserPageUrl);
        },
        async actionGotoAddUserPage() {
            page.getByTitle(SELECTORS.addUsers).click();
        },
        async toggleOnEditModeBasedOnUserEmail(userEmail){
            const row = page.locator('tr').filter({ hasText: userEmail });
            await row.getByRole('button', { name: 'OFF' }).click();
        },
        async toggleOffEditModeBasedOnUserEmail(userEmail){
            const row = page.locator('tr').filter({ hasText: userEmail });
            await row.getByRole('button', { name: 'ON' }).click();
        },
        
        async deleteBtnClickBasedOnUserEmail(userEmail) {
            const row = page.locator('tr').filter({ hasText: userEmail });
            await row.getByRole('button', { name: 'Delete' }).click();
        },

        async updateBtnClickBasedOnUserEmail(userEmail) {
            const row = page.locator('tr').filter({ hasText: userEmail });
            await row.getByRole('button', { name: 'Update' }).click();
        }
    }
}