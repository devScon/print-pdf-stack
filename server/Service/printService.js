const {PDFDocument} = require('pdf-lib');
const { join } = require('path');
const { access, mkdir, readdir, unlink, writeFile } = require('fs/promises');
const { BrowserContext, chromium } = require('playwright-chromium');

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
    const filename = `PDFExport_${slug}.pdf`;
    const directory = join(__dirname, '..', 'public/assets/exports');
    const browser = await chromium.launchPersistentContext('.playwright', {
        headless: true,
        forcedColors: 'active',
        args: minimal_chromium_args,
      });

      const page = await browser.newPage();
      await page.goto(`${url}`, { waitUntil: 'networkidle' });
      await page.waitForSelector('.gr-wrapper.loaded', { state: 'visible' });
      const pdf = await PDFDocument.create();
      const buffer = await page.pdf({
        printBackground: true,
        height: '279mm',
        width:  '210mm',
      });
      const pageDoc = await PDFDocument.load(buffer);
      //console.log(pageDoc)
      //pageDoc.setUserPassword("12345");
      const copiedPages = await pdf.copyPages(pageDoc, [0]);
      copiedPages.forEach((copiedPage) => pdf.addPage(copiedPage));
      await page.close();
     // pdf.setUserPassword("123456");
      const pdfBytes = await pdf.save();
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, filename), pdfBytes);
      return "printed successfully"
  }

  module.exports = {printAsPdf}