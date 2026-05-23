import { BaseScraper } from './baseScraper.js';
import * as cheerio from 'cheerio';

export class EngineScraper extends BaseScraper {
    constructor(engineConfig) {
        super();
        this.name = engineConfig.name;
        this.baseUrl = engineConfig.url;
        this.selectors = engineConfig.selectors;
    }

    async search(keyword) {
        const targetUrl = `${this.baseUrl}${encodeURIComponent(keyword)}`;
        const results = [];

        try {
            // Ambil HTML mentah via proxy SOCKS5 Tor
            const html = await this.client.fetch(targetUrl);
            const $ = cheerio.load(html);

            // Parsing data berdasarkan selector di engines.json
            $(this.selectors.container).each((index, element) => {
                const title = $(element).find(this.selectors.title).text().trim();
                let link = $(element).find(this.selectors.link).attr('href');
                const description = $(element).find(this.selectors.description).text().trim();

                // Bersihkan URL jika berupa parameter redirect (opsional, optimasi dasar)
                if (link && link.startsWith('/url?q=')) {
                    link = new URL(link, 'https://localhost').searchParams.get('q');
                }

                if (title && link) {
                    results.push({
                        engine: this.name,
                        title: title.substring(0, 60) + (title.length > 60 ? '...' : ''),
                        link: link,
                        description: description.substring(0, 100) + (description.length > 100 ? '...' : '')
                    });
                }
            });

            return results;
        } catch (error) {
            // Kita return array kosong agar satu engine yang mati tidak menggagalkan engine lainnya
            return [{ engine: this.name, title: "ERROR", link: error.message, description: "Gagal menarik data." }];
        }
    }
}
