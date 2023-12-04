
import { test } from '@playwright/test';
import {ActTrialPage} from "../pages/mtaTrial.page";

test.describe('MTA Create Trial Tests @Trials', () => {
    /*test.beforeEach(async () => {
        //await pages.loginPage.login();
    });

    test.afterEach(async () => {
        //await pages.topNavigationBarPage.logout();
    });*/

    test('Create US Trial', async ({ page }) => {
        const trial = new ActTrialPage(page);
        await trial.fillTrialPage1('us');
        await trial.trial_4_questions();
        await trial.get_MTA_trial_token();
    });

});
