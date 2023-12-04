// playwright-dev-page.ts
import { expect, Locator, Page } from '@playwright/test';
import { faker } from '@faker-js/faker';
import jwtDecode from 'jwt-decode';

export class ActTrialPage {
    readonly page: Page;
    readonly mta_test_trial_url: string = 'https://mytest.actops.com/en-us/trial?product=classic';
    readonly production_trial_url: string = 'https://my.act.com/en-us/trial?product=classic';
    //init trial page
    readonly firstName: Locator;
    readonly firstNameLocator: string = '#FirstName';
    readonly lastName: Locator;
    readonly lastNameLocator: string = '#LastName';
    readonly company: Locator;
    readonly companyLocator:string = '#CompanyName';
    readonly phone: Locator;
    readonly phoneLocator:string = '#PhoneNumber';
    readonly email: Locator;
    readonly emailLocator: string = '#Email';
    readonly postal_code: Locator;
    readonly postal_codeLocator: string = '#postalCode';
    readonly country: Locator;
    readonly countryLocator: string = '#country';
    readonly submitButton: Locator;
    readonly submitButtonLocator: string = '#trialBtn';
    readonly province: Locator;
    readonly provinceLocator: string = '#stateProv';
    readonly languageOverride: Locator;
    readonly languageOverrideLocator: string = '#languageOverride';

    readonly token: Locator;
    readonly tokenID: string = 'input#hiddenTokenField';
    readonly welcomeTitle: Locator;
    readonly welcomeTitleID: string = '#lblNavTitle';

    //email used page?
    readonly email_not_used_title: Locator;
    readonly email_not_used_title_text: string = 'We’re setting up your account!';

    readonly continue_button: Locator;
    readonly passd: string = 'goarmy01';

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
    readonly mtaHomeUrl: string = 'https://appus.actops.com/';

    readonly mta_popup: Locator;
    readonly mta_popup1: Locator;

    constructor(page: Page) {
        //page 1
        this.page = page;
        this.firstName = page.locator(this.firstNameLocator);
        this.lastName = page.locator(this.lastNameLocator);
        this.company = page.locator(this.companyLocator);
        this.phone = page.locator(this.phoneLocator);
        this.email = page.locator(this.emailLocator);
        this.postal_code = page.locator(this.postal_codeLocator);
        this.country = page.locator(this.countryLocator);
        this.submitButton = page.locator(this.submitButtonLocator);
        this.province = page.locator(this.provinceLocator);
        this.languageOverride = page.locator(this.languageOverrideLocator);

        //email used
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
        //token
        this.token = page.locator(this.tokenID);
        this.welcomeTitle = page.locator(this.welcomeTitleID);
    }

    async goToMTATrial() {
        await this.page.goto(this.mta_test_trial_url);
    }

    async fillTrialPage1(locale: string) {
        await this.goToMTATrial();

        await this.firstName.fill('APC');
        await this.lastName.fill('Automation');
        await this.company.fill('Act');
        await this.phone.fill('1231231234');
        // const email = faker.internet.exampleEmail();
        const date = new Date;
        const emailUsername = 'dgabpre';
        const emailDomain = '@gmail.com';

        // eslint-disable-next-line max-len
        // const my_email = `${emailUsername}+mta+${locale}-test${date.getMonth()}${date.getDate()}${date.getFullYear()}v${Math.floor(Math.random() * (999_999_999 - 1) + 1)}${emailDomain}`;
        const my_email = `${emailUsername}+mta+${locale}${date.getMonth()}${date.getDate()}${date.getFullYear()}${emailDomain}`;
        // eslint-disable-next-line no-console
        console.log(my_email);
        await this.email.fill(my_email);
        // submit
        await expect(this.submitButton).toBeEnabled();
        await this.submitButton.click();
    }

    async trial_4_questions(){
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

    async get_MTA_trial_token(){
        //wait for home url
        await this.page.waitForSelector(this.welcomeTitleID);
        const token = await this.token.inputValue();
        const decoded = jwtDecode(token);
        /* eslint-disable no-console */

        /*
        LOCALE='us'
        TEST_ENV='test'
        USER_EMAIL='dgabpre+mta+us-test112023@gmail.com'
        USER_PASSWORD='goarmy01'
        DATABASE='O11623203138'
        API_URL='https://apius.actops.com/act.web.api'
        */
        console.log('TEST_ENV=\'test\'');
        console.log(`API_URL='${decoded['lng']}/act.web.api'`);
        console.log(`LOCALE='${decoded['lng']}'`);
        console.log(`USER_EMAIL='${decoded['sub']}'`);
        console.log(`DATABASE='${decoded['db']}'`);
        console.log(`PASSWORD='${this.passd}'`);

    }

}
