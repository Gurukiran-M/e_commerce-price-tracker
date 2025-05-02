"use server"

import puppeteer from 'puppeteer';

type ProductDescription = {
    features: string[];
    specifications: { [key: string]: string };
};

export async function scrapeChromaProduct(url: string) {
    if (!url) return;

    // BrightData proxy configuration
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    const port = 22225;
    const session_id = (1000000 * Math.random()) | 0;

    const options = {
        auth: {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    const browser = await puppeteer.launch({
        headless: false,
        slowMo: 50,
    });

    const page = await browser.newPage();


    try {
        // await page.goto(url, { waitUntil: 'networkidle2' });
        await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Wait for the title element to appear
        await Promise.all([
            page.waitForSelector('.pd-title.pd-title-normal'),
            page.waitForSelector('#pdp-product-price'),
            // page.waitForSelector('#old-price'),
        ]);

        // Extract the title text
        const title = await page.$eval('.pd-title.pd-title-normal', el => (el.textContent ?? '').trim());
        // console.log('Product Title:', title);

        const currentPrice = await page.$eval('#pdp-product-price', el => (el.textContent ?? '').trim());
        const cp = currentPrice.replace(/[^\d.]/g, '').split('.')[0];
        // console.log(cp)


        const oldPriceElement = await page.$('#old-price');
        let op = null;
        if (oldPriceElement) {
            const originalPrice = await page.$eval('#old-price', el => (el.textContent ?? '').trim());
            op = originalPrice.replace(/[^\d.]/g, '').split('.')[0];
        }

        // const features= await page.$eval('.cp-keyfeature.pd-eligibility-wrap', el => (el.textContent ?? '').trim());

        const features = await page.$$eval(
            '.cp-keyfeature.pd-eligibility-wrap li',
            elements => elements.map(el => (el.textContent ?? '').trim())
        );
        
        const specifications = await page.$$eval(
            '.cp-specification-info',
            uls => {
                const specs: { [key: string]: string } = {};
                uls.forEach(ul => {
                    const keyEl = ul.querySelector('.cp-specification-spec-info:nth-child(1)');
                    const valueEl = ul.querySelector('.cp-specification-spec-info:nth-child(2)');
                    if (keyEl && valueEl) {
                        const key = (keyEl.textContent ?? '').trim();
                        const value = (valueEl.textContent ?? '').trim();
                        specs[key] = value;
                    }
                });
                return specs;
            }
        );
        
        const description: ProductDescription = {
            features,
            specifications
        };
        
      
        const discountElement = await page.$('.dicount-value');
        let discount = null;
        if (discountElement) {
            const discountRate = await page.$eval('.dicount-value', el => (el.textContent ?? '').trim());
            const match = discountRate.match(/(\d+(\.\d+)?)/);
            discount = match ? match[1] : null;
        }

        const imageUrl = await page.$eval(
            '[id="0prod_img"]',
            el => el.getAttribute('data-src')
        );

        console.log(imageUrl);


        await browser.close();

        const data = {
            url,
            currency: '₹',
            image: imageUrl,
            title,
            currentPrice: Number(cp) || Number(op),
            originalPrice: Number(op) || Number(cp),
            priceHistory: [],
            discountRate: discount,
            category: 'category',
            reviewsCount: 100,
            stars: 4.5,
            isOutOfStock: false,
            description: JSON.stringify(description),
            lowestPrice: Number(cp) || Number(op),
            highestPrice: Number(op) || Number(cp),
            averagePrice: Number(cp) || Number(op),
        }

        return data;
    } catch (error) {
        console.error('Error scraping:', error);
        await browser.close();
    }
}