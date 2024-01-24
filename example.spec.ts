import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://c.hr.dmerej.info/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/HR DB/);
});


test('Add employee', async ({ page }) => {
  await page.goto('https://c.hr.dmerej.info/add_employee');

  await page.getByPlaceholder('Name').fill('killian');
  await page.getByPlaceholder('Email').fill('jesuisgay@dogo.com');
  await page.locator('#id_address_line1').fill('place de la Nation');
  await page.locator('#id_address_line2').fill('');
  await page.getByPlaceholder('City').fill('Palestine');
  await page.getByPlaceholder('Zip code').fill('2024')
  await page.getByPlaceholder('Hiring date').fill('2024-01-24');
  await page.getByPlaceholder('Job title').fill('Createur de FurSuit');
  await page.getByRole('button', { name: 'Add' }).click();


  await expect(page).toHaveURL('https://c.hr.dmerej.info/employees');

});
