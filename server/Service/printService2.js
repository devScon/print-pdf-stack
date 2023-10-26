const { join } = require('path');
const fs  = require("fs");
const { access, mkdir, readdir, unlink, writeFile } = require('fs/promises');
const { BrowserContext, chromium } = require('playwright-chromium');
const PDFDocument = require('pdfkit');

const minimal_chromium_args = [
    '--autoplay-policy=user-gesture-required',
    '--disable-background-networking',
    '--disable-background-timer-throttling',
    '--disable-backgrounding-occluded-windows',
    '--disable-breakpad',
    '--disable-client-side-phishing-detection',
    '--disable-component-update',
    '--disable-default-apps',
    '--disable-dev-shm-usage',
    '--disable-domain-reliability',
    '--disable-extensions',
    '--disable-features=AudioServiceOutOfProcess',
    '--disable-hang-monitor',
    '--disable-ipc-flooding-protection',
    '--disable-notifications',
    '--disable-offer-store-unmasked-wallet-cards',
    '--disable-popup-blocking',
    '--disable-print-preview',
    '--disable-prompt-on-repost',
    '--disable-renderer-backgrounding',
    '--disable-setuid-sandbox',
    '--disable-speech-api',
    '--disable-sync',
    '--hide-scrollbars',
    '--ignore-gpu-blacklist',
    '--metrics-recording-only',
    '--mute-audio',
    '--no-default-browser-check',
    '--no-first-run',
    '--no-pings',
    '--no-sandbox',
    '--no-zygote',
    '--password-store=basic',
    '--use-gl=swiftshader',
    '--use-mock-keychain',
  ];

  async function printAsPdf(url,slug) {
    const filename = `PDFExport_${slug}.png`;
    const filename_new = `PDFExport_${slug}_new.pdf`;
    const directory = join(__dirname, '..', 'public/assets/exports');
    const browser = await chromium.launchPersistentContext('.playwright', {
        headless: true,
        forcedColors: 'active',
        args: minimal_chromium_args,
      });

      const page = await browser.newPage();
      await page.goto(`${url}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.gr-wrapper.loaded', { state: 'visible' });
      await mkdir(directory, { recursive: true });
      try {
      const pdfkit = new PDFDocument({userPassword: "1111"});
      const pdfStream = fs.createWriteStream(join(directory, filename_new));
      pdfkit.pipe(pdfStream);
      await page.screenshot({path:join(directory, filename)})
      // await page.pdf({
      //   printBackground: true,
      //   height: '279mm',
      //   width:  '210mm',
      //   path: join(directory, filename)
      // });
      await page.close(); 
      pdfkit.image(join(directory, filename), {fit: [750,750], align: 'center'})
      pdfkit.end();
      await browser.close();  
      
    //   return "printed successfully"
      //console.log(`this is the buffer ${buffer}`)
    //   try{
    //     pdfkit.file(buffer, {name: filename, type: "application/pdf"})
    //    pdfkit.end();
    //   }catch(err){
    //     console.log(err)
    //     return err
    //   }
      
      pdfStream.on('finish', () => {
        console.log("Finish status: did i get printed")
        return("printed successfully")
      });
      }catch(err){
        console.log(err)
        return "failed"
      }
      
  }

  module.exports = {printAsPdf}