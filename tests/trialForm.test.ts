// example.spec.ts
import { test, expect } from '@playwright/test';
import { ActTrialPage } from '../pages/trial-page';
// import { jwt_decode } from 'jwt-decode';


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
    const playwrightDev = new ActTrialPage(page);
    await playwrightDev.gotoMTATrial();
    await playwrightDev.fillTrialForm();
    await playwrightDev.submitTrialForm();
    await playwrightDev.steps_4_questions();
    // await playwrightDev.wait_for_mta_redirect();
    await playwrightDev.mta_welcome();
});

// test('should show Page Object Model article @smoke', async ({ page }) => {
//     console.log('my smoke test')
// });
