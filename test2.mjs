import puppeteer from "puppeteer";
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.type(), msg.text()));
    page.on("pageerror", err => console.log("PAGE ERROR:", err.message));
    console.log("Navigating...");
    await page.goto("https://imoveiscapaonovo.com.br/imoveis/casa-4-dormitorios-com-anexo-em-capao-novo-daarp", {waitUntil: "networkidle2"});
    console.log("Clicking using CDP/puppeteer click...");
    const [button] = await page.$x("//button[contains(., \"Ver todas\")]");
    if(button) {
      await button.click();
      console.log("Clicked! Waiting 2 seconds...");
      await new Promise(r => setTimeout(r, 2000));
      await page.screenshot({path: "C:/Users/lenin/.gemini/antigravity/brain/50f9dda2-00a8-41e5-9069-0bc7d26b1af8/test_gallery_2.png"});
    } else {
      console.log("Button NOT found with XPath!");
    }
    await browser.close();
})();
