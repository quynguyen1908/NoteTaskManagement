const { Builder } = require("selenium-webdriver");

async function openGoogle() {
    let driver = await new Builder().forBrowser("chrome").build();
    
    await driver.get("https://www.google.com");
    console.log("Open Google successfully!");

    // Đợi 5 giây rồi đóng trình duyệt
  
    await driver.quit();
}

openGoogle();