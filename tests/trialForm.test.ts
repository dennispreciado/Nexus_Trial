// example.spec.ts
import { test, expect } from '@playwright/test';
import { ActTrialPage } from '../pages/trial-page';
// import { jwt_decode } from 'jwt-decode';


test('getting started should contain table of contents', async ({ page }) => {
    const playwrightDev = new ActTrialPage(page);
    await playwrightDev.goto();
    await playwrightDev.fillTrialForm();
    await playwrightDev.submitTrialForm();
    await playwrightDev.steps_4_questions();
    await playwrightDev.wait_for_redirect();
    await playwrightDev.get_trial_token();
//    https://www.npmjs.com/package/jwt-decode
});


test('should show Page Object Model article @smoke', async ({ page }) => {
    console.log('my smoke test')
});
