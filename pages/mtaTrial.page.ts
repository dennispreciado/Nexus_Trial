// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import jwtDecode from "jwt-decode";

export class ActTrialPage {
    readonly page: Page;
    readonly mta_test_trial_url: string = 'https://mytest.actops.com/en-us/trial?product=classic';
    readonly production_trial_url: string = 'https://my.act.com/en-us/trial?product=classic';
    //init trial page
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly phone: Locator;
    readonly email: Locator;
    readonly postal_code: Locator;
    readonly country: Locator;
    readonly submitButton: Locator;
    //email used page?
    readonly email_not_used_title: Locator;
    readonly email_not_used_title_text: string = 'We’re setting up your account!';

    readonly continue_button: Locator;
    readonly passd: string = 'goarmy01'

    readonly step1of4_title_text: string = 'Approximately how many people will be using Act!?';
    readonly step1of4_title:Locator;

    readonly step2of4_title_text: string = 'Approximately how many people will be using Act!?';
    readonly step2of4_title:Locator;

    readonly step3of4_title:Locator;

    readonly step4of4_title:Locator;
    readonly password: Locator;
    readonly confirm_password: Locator;
    readonly set_password_button: Locator;
    readonly trial_load_url: string = 'https://mytest.actops.com/en-US/myact/TrialLoad';

    readonly buy_now_button: Locator;
    readonly nexusdev_url: string = 'https://nexusdev.actops.com/dashboard';

    readonly mta_popup: Locator;
    readonly mta_popup1: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('#FirstName');
        this.lastName = page.locator('#LastName');
        this.company = page.locator('#CompanyName');
        this.phone = page.locator('#PhoneNumber');
        this.email = page.getByLabel('Email');
        this.postal_code = page.getByLabel('Postal Code');
        this.country = page.locator('#country');
        this.submitButton = page.getByRole('button', { name: 'Start your free trial' });

        //email used?
        this.email_not_used_title = page.getByRole('heading', { name: 'We’re setting up your account!' });
        this.continue_button = page.getByRole('button', { name: 'Continue' });

        //step 1 of 4
        this.step1of4_title = page.getByRole('heading', { name: 'Approximately how many people will be using Act!?' });

        //step 2 of 4
        this.step2of4_title = page.getByRole('heading', { name: 'How can Act! help you?' });

        //step 3 of 4
        this.step3of4_title = page.getByRole('heading', { name: 'How would you describe your business?' });

        //step 4 of 4
        this.step4of4_title = page.getByRole('heading', { name: 'Set Your Password' });
        this.password = page.locator('#Password');
        this.confirm_password = page.getByPlaceholder('Confirm Password');
        this.set_password_button = page.getByRole('button', { name: 'Set Password' });
        this.buy_now_button = page.getByRole('link', { name: 'Buy now' });

        this.mta_popup = page.getByRole('button', { name: 'Save' });
        this.mta_popup1 = page.locator('#RadWindowWrapper_popupHost div');
    }

    async gotoNexusTrial() {
        await this.page.goto(this.test_trial_url);
    }
    async gotoMTATrial() {
        await this.page.goto(this.mta_test_trial_url);
    }


    async fillTrialForm() {
        await this.firstName.fill('dennis');
        await this.lastName.fill('preciado');
        await this.company.fill('act');
        await this.phone.fill('1231234');
        let email = faker.internet.exampleEmail()
        let date = new Date;
        let my_email: string = `dgabpre+admin-${date.getMonth()}${date.getDate()}${date.getFullYear()}v${Math.floor(Math.random() * (999_999_999 - 1) + 1)}@gmail.com`;
        console.log(my_email);
        await this.email.fill(my_email);

    }

    async submitTrialForm() {
        await expect(this.submitButton).toBeEnabled();
        await this.submitButton.click();
    }
    async steps_4_questions(){

        await expect(this.email_not_used_title).toBeVisible();
        await this.email_not_used_title.isVisible();
        await this.continue_button.click();
        await this.step1of4_title.isVisible();
        await this.continue_button.click();
        await this.step2of4_title.isVisible();
        await this.continue_button.click();
        await this.step3of4_title.isVisible();
        await this.continue_button.click();
        await this.step4of4_title.isVisible();
        await this.password.fill(this.passd);
        await this.confirm_password.fill(this.passd);
        await this.set_password_button.click();
        await expect(this.page).toHaveURL(this.trial_load_url);
    }
    async wait_for_nexus_redirect(){
        await this.buy_now_button.isEnabled();
        await expect(this.page).toHaveURL(this.nexusdev_url);
    }
    async wait_for_mta_redirect(){
        await this.buy_now_button.isEnabled();
        await expect(this.page).toHaveURL(this.nexusdev_url);
    }
    async get_nexus_trial_token(){
        // let cookies = await this.page.context().cookies()
        // console.log(cookies);
        const sessionStorage = await this.page.evaluate(() => sessionStorage);
        console.log(sessionStorage?.token);
        console.log(jwtDecode(sessionStorage.token))

        // console.log('\n');
        // const localStorage = await this.page.evßaluate(() => localStorage);
        // console.log(localStorage);

        // let token = await this.page.context().
    //    https://github.com/microsoft/playwright/issues/14062
    }
    async mta_welcome(){
        await this.mta_popup1.isVisible()
        await this.mta_popup.click()

    }
}
