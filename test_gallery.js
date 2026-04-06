const puppeteer = require("puppeteer");
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", err => console.log("PAGE ERROR:", err.message));
    console.log("Navigating...");
    await page.goto("https://imoveiscapaonovo.com.br/imoveis/casa-4-dormitorios-com-anexo-em-capao-novo-daarp", {waitUntil: "networkidle2"});
    console.log("Looking for button...");
    const button = await page.$("text/Ver todas as 8 fotos");
    if(button) {
      console.log("Button found! Clicking!");
      await button.click();
      await page.waitForTimeout(1000);
      await page.screenshot({path: "test_gallery.png"});
    } else {
      console.log("Button NOT found!");
      const html = await page.content();
      console.log(html.substring(0,500));
    }
    await browser.close();
})();
