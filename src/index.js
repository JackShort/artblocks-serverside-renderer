#!/usr/bin/node
import ArtBlocks from 'artblocks';
import puppeteer from 'puppeteer';

const generateImage = async (html, waitTime, aspectRatio) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    let height = aspectRatio <= 1 ? 2400 : 2400 / aspectRatio;
    let width = aspectRatio >= 1 ? 2400 : 2400 * aspectRatio;

    height = height % 1 == 0 ? height : Math.trunc(height) + 1;
    width = width % 1 == 0 ? width : Math.trunc(width);

    await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: 1,
    });
    await page.setContent(html);
    await page.waitForTimeout(waitTime);

    await page.screenshot({ path: 'example.png' });
    await browser.close();
};

let artblocks = new ArtBlocks('thegraph', 'mainnet');
const response = await artblocks.token_generator(204000540);
await generateImage(response, 30000, 0.70711);
