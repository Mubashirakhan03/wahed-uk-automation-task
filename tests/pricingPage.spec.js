const { test, expect } = require('@playwright/test');
const { PricingPage } = require('../Pages/PricingPage');
const data = require('../Data/pricingData.json');


test.describe('Wahed UK Pricing Page Content Verification', () => {
  let pageObj;

  test.beforeEach(async ({ page }) => {
    pageObj = new PricingPage(page);
    await pageObj.open();
  });

  test('Verify Navigation Bar', async () => {
    await expect(pageObj.navLogo).toBeVisible();
    await expect(pageObj.navLinks).toHaveCountGreaterThan(0);
    await expect(pageObj.ukFlagDropdown).toBeVisible();
  });

  test('Verify Hero Section', async () => {
    await expect(pageObj.heroTitle).toBeVisible();
    await expect(pageObj.heroSubtitle).toBeVisible();
    await expect(pageObj.heroGetAppBtn).toBeVisible();
  });

  test('Verify Transparent Pricing Calculator Section', async () => {
    await expect(pageObj.calculatorHeader).toBeVisible();
    await expect(pageObj.investmentAmount).toBeVisible();
    await expect(pageObj.portfolioTabs).toHaveCount(7);
    await expect(pageObj.totalAnnualFee).toBeVisible();

    const tooltipText = await pageObj.getInfoTooltipText();
    console.log('Info Tooltip Text:', tooltipText);
    expect(tooltipText.length).toBeGreaterThan(0);
  });

  test('Verify FAQ Section', async () => {
    await expect(pageObj.faqHeader).toBeVisible();
    await expect(pageObj.faqItems).toHaveCount(3);

    for (let i = 0; i < 3; i++) {
      await pageObj.toggleFaqItem(i); // expand
      const answer = await pageObj.getFaqAnswerText(i);
      expect(answer.length).toBeGreaterThan(0);
      await pageObj.toggleFaqItem(i); // collapse
    }
  });

  test('Verify Start Your Journey Section', async () => {
    await expect(pageObj.startHeader).toBeVisible();
    await expect(pageObj.appStoreBadges).toHaveCountGreaterThan(0);
    await expect(pageObj.startGetAppBtn).toBeVisible();
  });

  test('Verify Footer Section', async () => {
    await expect(pageObj.footerLogo).toBeVisible();
    await expect(pageObj.footerColumnHeaders).toHaveCountGreaterThan(0);
    await expect(pageObj.contactDetails).toBeVisible();
    await expect(pageObj.riskText).toBeVisible();
    await expect(pageObj.registrationText).toBeVisible();
    await expect(pageObj.copyrightText).toBeVisible();
    await expect(pageObj.socialIcons).toHaveCountGreaterThan(0);
  });
});
test.describe('Transparent Pricing Calculator Verification', () => {
  let pricingPage;

  test.beforeEach(async ({ page }) => {
    pricingPage = new PricingPage(page);
    await pricingPage.open();
  });

  // --- 1. Verify Default Values ---
  test('Verify default values on page load', async () => {
    expect(await pricingPage.investmentAmount.inputValue()).toBe(data.defaultValues.investmentAmount);
    expect(await pricingPage.portfolioStrategy.inputValue()).toBe(data.defaultValues.portfolioStrategy);
    expect(await pricingPage.includePension.isChecked()).toBe(data.defaultValues.includePension);
    expect(await pricingPage.getTotalAnnualFee()).toBe(data.defaultValues.totalAnnualFee);

    const fees = await pricingPage.getFeesDetails();
    expect(fees.wahedFee).toBe(data.defaultValues.wahedFee);
    expect(fees.fundCosts).toBe(data.defaultValues.fundCosts);
    expect(fees.marketSpread).toBe(data.defaultValues.marketSpread);
  });

  // --- 2. Verify multiple test scenarios ---
  test('Verify multiple input combinations', async () => {
    for (const testCase of data.testCases) {
      await pricingPage.setInvestmentAmount(testCase.amount);
      await pricingPage.selectPortfolioStrategy(testCase.strategy);
      await pricingPage.togglePension(testCase.pension);

      // wait for calculation to update
      await pricingPage.page.waitForTimeout(500);

      const fee = await pricingPage.getTotalAnnualFee();
      expect(fee).toBe(testCase.expectedFee);
    }
  });

  // --- 3. Input validation ---
  test('Verify investment amount input validation', async () => {
    let valid = await pricingPage.isInvestmentInputValid('5000');
    expect(valid).toBe(true);

    valid = await pricingPage.isInvestmentInputValid('abc');
    expect(valid).toBe(false);

    valid = await pricingPage.isInvestmentInputValid('!@#');
    expect(valid).toBe(false);
  });
});