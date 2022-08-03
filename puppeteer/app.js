const puppeteer = require('puppeteer')
const screenshot = require('./screenshot')

const initBrowser = async(browserConfig) => {
  const browser = await puppeteer.launch(browserConfig)
  return await browser.wsEndpoint()
}

const app = async() => {
  const browserWSEndpoint = await initBrowser()
  const imgPath = await screenshot('https://bilibili.com', {
    browserWSEndpoint,
    maxHeight: 6000,
  })

  console.log(imgPath)
}

app()