import puppeteer from "puppeteer";
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on("console", msg => console.log("PAGE LOG:", msg.text()));
    page.on("pageerror", err => console.log("PAGE ERROR:", err.message));
    console.log("Navigating...");
    await page.goto("https://imoveiscapaonovo.com.br/imoveis/casa-4-dormitorios-com-anexo-em-capao-novo-daarp", {waitUntil: "networkidle2"});
    console.log("Looking for button...");
    const button = await page.$("button"); // let s just find all buttons!
    
    // Evaluate in page
    const data = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      const target = btns.find(b => b.textContent && b.textContent.includes("Ver todas"));
      if (target) {
        target.click();
        return "Clicked button: " + target.textContent;
      }
      return "Button not found";
    });
    console.log(data);
    await new Promise(r => setTimeout(r, 1000));
    await page.screenshot({path: "test_gallery.png"});
    await browser.close();
})();
