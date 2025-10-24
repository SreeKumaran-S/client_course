import { SELECTORS, URLS } from '../dom-selectors/selectors';
export default function AddUserPage(page) {
    let addUserPageUrl = new URL(URLS.addUser(), URLS.host()).toString();
    let homePageUrl = new URL(URLS.home(), URLS.host()).toString();
    
    return {
        homePageUrl,
        addUserPageUrl,

        async gotoHomePage() {  
            await page.goto(homePageUrl);
        },
        async gotoAddUserPage(){
            await page.goto(addUserPageUrl);
        },
        async populateUserData() {
            await page.getByTitle(SELECTORS.userName).fill('manikandan');
            await page.getByTitle(SELECTORS.userEmail).fill('mani@zoho.com');
            await page.getByTitle(SELECTORS.userMobile).fill('+919876543219');
            await page.getByTitle(SELECTORS.userDOB).fill('2025-10-24');
            await page.getByTitle(SELECTORS.userGender).selectOption('male');
        },
        async populateOnlyNameAndEmail(){
            await page.getByTitle(SELECTORS.userName).fill('manikandan');
            await page.getByTitle(SELECTORS.userEmail).fill('mani@zoho.com');
        },
        async actionReset(){
            page.getByTitle(SELECTORS.reset).click();
        },
        async actionSignup(){
            page.getByTitle(SELECTORS.signup).click();
        }
    }
}

