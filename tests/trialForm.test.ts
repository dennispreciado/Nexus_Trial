
import { jwt_decode } from 'jwt-decode';
import {ActTrialPage} from "../pages/mtaTrial.page";
import {test} from "@playwright/test";


// test('Nexus Test Trial', async ({ page }) => {
//     const playwrightDev = new ActTrialPage(page);
//     await playwrightDev.gotoNexusTrial();
//     await playwrightDev.fillTrialForm();
//     await playwrightDev.submitTrialForm();
//     await playwrightDev.steps_4_questions();
//     await playwrightDev.wait_for_nexus_redirect();
//     await playwrightDev.get_nexus_trial_token();
// //    https://www.npmjs.com/package/jwt-decode
// });


test('MTA Test trial', async ({ page }) => {
    const playwrightDev = new ActTrialPage(await page);
    await playwrightDev.gotoMTATrial();
    await playwrightDev.fillTrialForm();
    await playwrightDev.submitTrialForm();
    await playwrightDev.steps_4_questions();
    await playwrightDev.wait_for_mta_redirect();
    await playwrightDev.mta_welcome();
});

// test('should show Page Object Model article @smoke', async ({ page }) => {
//     console.log('my smoke test')
// });
