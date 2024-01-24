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

test('Delete Team Should not delete employee associate', async ({ page }) => {
  await page.goto('https://c.hr.dmerej.info/add_employee');

  await page.getByPlaceholder('Name').fill('killian2');
  await page.getByPlaceholder('Email').fill('jesuisdoublegay@dogo.com');
  await page.locator('#id_address_line1').fill('place de la Nation');
  await page.locator('#id_address_line2').fill('');
  await page.getByPlaceholder('City').fill('Palestine');
  await page.getByPlaceholder('Zip code').fill('2024')
  await page.getByPlaceholder('Hiring date').fill('2024-01-24');
  await page.getByPlaceholder('Job title').fill('Createur de FurSuit');
  await page.getByRole('button', { name: 'Add' }).click();

  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'Create new team' }).click();
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Coucouf20');
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('link', { name: 'Home' }).click();

  await page.getByRole('link', { name: 'List Employees' }).click();
  await page.getByRole('row', { name: 'killian2 jesuisdoublegay@dogo.com no' }).getByRole('link').first().click();
  await page.getByRole('link', { name: 'Add to team' }).click();
  await page.locator('option', { hasText: 'Coucouf20 team' }).textContent();

  const optionToSelect = await page.locator('option', { hasText: 'Coucouf20 team' }).textContent();
  await page.locator('select').selectOption({ label: optionToSelect });

  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('link', { name: 'Home' }).click();

  await page.getByRole('link', { name: 'List teams' }).click();
  await page.getByRole('link', { name: 'Delete' }).nth(-1).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.getByRole('link', { name: 'Home' }).click();
  await page.getByRole('link', { name: 'List Employees' }).click();

  await expect(page.getByText('killian2')).toBeVisible();
});