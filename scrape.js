const { Builder, By, until } = require('selenium-webdriver');

async function scrapeMedium() {
  let driver = await new Builder().forBrowser('chrome').build();
  try {
    // Open the Medium URL
    await driver.get('https://www.designgurus.io/course/grokking-the-coding-interview?aff=kJSIoU');

    // Wait for the article to load
    await driver.wait(until.elementLocated(By.css('article')), 60000); // Increased timeout to 60 seconds

    // Scroll down to load more content if necessary
    await driver.executeScript('window.scrollTo(0, document.body.scrollHeight)');
    await driver.sleep(2000); // Wait for 2 seconds to load more content

    // Extract the text inside the <article> tag
    let article = await driver.findElement(By.css('article'));
    let content = await article.getText();

    // Print the result
    console.log('Scraped Content:\n', content);
  } finally {
    await driver.quit();
  }
}

scrapeMedium();