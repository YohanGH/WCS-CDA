import { test, expect } from "@playwright/test";

test("Addition: 1 + 1 = 2", async ({ page }) => {
  // Accéder à la calculatrice Desmos
  await page.goto("https://www.desmos.com/scientific?lang=fr", {
    waitUntil: 'networkidle'
  });
  
  // Attendre que la calculatrice soit chargée
  await page.waitForSelector(".dcg-basic-keypad", {
    timeout: 60000
  });

  // Saisir le calcul
  await page.click('.dcg-keypad-btn[dcg-command="1"]');
  await page.click('.dcg-keypad-btn[dcg-command="+"]');
  await page.click('.dcg-keypad-btn[dcg-command="1"]');
  await page.click('.dcg-keypad-btn[dcg-command="enter"]');

  // Vérifier le résultat
  const result = await page
    .locator(".dcg-exp-output-container .dcg-mq-binary-operator+.dcg-mq-digit")
    .textContent();
  expect(result?.trim()).toBe("2");
});

test("Multiplication: 2 × 2 = 4", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=fr", {
    waitUntil: 'networkidle'
  });
  await page.waitForSelector(".dcg-basic-keypad", {
    timeout: 60000
  });

  // Saisir le calcul
  await page.click('.dcg-keypad-btn[dcg-command="2"]');
  await page.click('.dcg-keypad-btn[dcg-command="*"]');
  await page.click('.dcg-keypad-btn[dcg-command="2"]');
  await page.click('.dcg-keypad-btn[dcg-command="enter"]');

  // Vérifier le résultat
  const result = await page
    .locator(".dcg-exp-output-container .dcg-mq-binary-operator+.dcg-mq-digit")
    .textContent();
  expect(result?.trim()).toBe("4");
});

test("Division: 8 ÷ 2 = 4", async ({ page }) => {
  await page.goto("https://www.desmos.com/scientific?lang=fr", {
    waitUntil: 'networkidle'
  });
  await page.waitForSelector(".dcg-basic-keypad", {
    timeout: 60000
  });

  // Saisir le calcul
  await page.click('.dcg-keypad-btn[dcg-command="8"]');
  await page.click('.dcg-keypad-btn[dcg-command="/"]');
  await page.click('.dcg-keypad-btn[dcg-command="2"]');
  await page.click('.dcg-keypad-btn[dcg-command="enter"]');

  // Vérifier le résultat
  const result = await page
    .locator(".dcg-exp-output-container .dcg-mq-binary-operator+.dcg-mq-digit")
    .textContent();
  expect(result?.trim()).toBe("4");
});
