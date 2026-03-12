class PricingPage {
  constructor(page) {
    this.page = page;

    // --- Navigation Bar ---
    this.navLogo = page.locator("//img[@class='navbar2_logo medium-size']");
    this.navLinks = page.locator('nav a'); 
    this.ukFlagDropdown = page.locator("//div[@id='w-dropdown-toggle-8']//div[contains(text(),'United Kingdom')]"); 

    // --- Hero Section ---
    this.heroTitle = page.locator("//h1[normalize-space()='Pricing']");
    this.heroSubtitle = page.locator("//div[@class='text-size-medium text-weight-medium']");
    this.heroGetAppBtn = page.locator("//a[@id='priceLanding-CTA']");

    // --- Transparent Pricing Calculator ---
    this.calculatorHeader = page.locator("//h2[normalize-space()='Transparent Pricing']");
    this.investmentAmount = page.locator("//input[@id='invest-amount']");
    this.portfolioTabs = page.locator('.portfolio-tab'); // 7 tabs
    this.totalAnnualFee = page.locator("//span[@id='total-fee']");
    this.infoIcon = page.locator("//div[@id='info-icon']"); // Tooltip

    // Fee details (add these for calculator verification)
    this.wahedFee = page.locator("//div[normalize-space()='Annual Wahed Fee']"); 
    this.fundCosts = page.locator("//div[@id='w-node-d3ba4ca9-a392-3a65-53ed-4e340b5f328e-70be70a7']//div[@class='text-block-43']");
    this.marketSpread = page.locator("//div[@id='w-node-d3ba4ca9-a392-3a65-53ed-4e340b5f32a3-70be70a7']//div[@class='text-block-43']"); 

    // --- FAQ Section ---
    this.faqHeader = page.locator("//h2[normalize-space()='Frequently asked questions']");
    this.faqItems = page.locator('.faq-item'); 
    this.faqExpandIcons = page.locator('.faq-item .expand-icon');

    // --- Start Your Journey Section ---
    this.startHeader = page.locator("//h2[normalize-space()='Start your journey to wealth']");
    this.appStoreBadges = page.locator("//section[@class='section-cta25']//a[1]//img[1]");
    this.startGetAppBtn = page.locator("//a[@id='priceJourn-CTA']");

    // --- Footer Section ---
    this.footerLogo = page.locator("//img[@alt='Wahed Logo']");
    this.footerColumnHeaders = page.locator('footer .footer-column h4');
    this.contactDetails = page.locator('footer .contact-details');
    this.riskText = page.locator("//p[contains(text(),'Risk Warning: As with any investment, a Wahed Inve')]");
    this.registrationText = page.locator("//p[contains(text(),'Wahed Invest Ltd. is registered in England and Wal')]");
    this.copyrightText = page.locator("//div[@id='w-node-_705f9341-b254-2bfc-62ed-06bfa02b302f-a0d470ed']");
    this.socialIcons = page.locator("//div[@class='w-layout-grid footer5_social-icons']");
  }

  async open() {
    await this.page.goto('https://www.wahed.com/uk/pricing');
  }

  // --- Tooltip ---
  async getInfoTooltipText() {
    await this.infoIcon.hover();
    return await this.page.locator('.tooltip').textContent();
  }

  // --- FAQ ---
  async toggleFaqItem(index) {
    await this.faqExpandIcons.nth(index).click();
  }

  async getFaqAnswerText(index) {
    return await this.faqItems.nth(index).locator('.answer').textContent();
  }

  // --- Transparent Pricing Calculator Methods ---
  async setInvestmentAmount(amount) {
    await this.investmentAmount.fill(amount);
  }

  async selectPortfolioStrategy(strategy) {
    await this.page.locator(`.portfolio-tab:has-text("${strategy}")`).click();
  }

  async togglePension(include) {
    const isChecked = await this.page.locator("//input[@id='pension']").isChecked();
    if (include !== isChecked) await this.page.locator("//input[@id='pension']").click();
  }

  async getTotalAnnualFee() {
    return (await this.totalAnnualFee.textContent()).trim();
  }

  async getFeesDetails() {
    return {
      wahedFee: (await this.wahedFee.textContent()).trim(),
      fundCosts: (await this.fundCosts.textContent()).trim(),
      marketSpread: (await this.marketSpread.textContent()).trim()
    };
  }

  // --- Input Validation ---
  async isInvestmentInputValid(value) {
    await this.setInvestmentAmount(value);
    const currentValue = await this.investmentAmount.inputValue();
    return currentValue === value;
  }
}

module.exports = { PricingPage };