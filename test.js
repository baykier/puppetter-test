const puppeteer = require('puppeteer');
const server_host = '127.0.0.1'
const server_port = '9222';


const axios = require('axios');



(async () => {
    

    const resp = await axios.get('http://' + server_host + ':' + server_port + '/json/version')

    if(resp.status != 200)
    {
        console.log('error')
        return
    }
    const browser = await puppeteer.connect({
        browserWSEndpoint: String(resp.data.webSocketDebuggerUrl),
        defaultViewport: {
            width: 1440,
            height: 1220
        }
    });
    const page = await browser.newPage();
    await page.goto('http://icxinli.com/nova');

    await page.waitForSelector("#username");
    await page.type('#username','icxinli@icxinli.com')
    await page.waitForSelector("#password");
    await page.type('#password', 'admin123')
    await page.waitForSelector("button[type='submit']");
    await page.click("button[type='submit']")
    await page.waitForNavigation()
    await page.screenshot({path: 'icxinli_login.png'});

    await browser.close();
})();