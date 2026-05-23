import axios from 'axios';
import { SocksProxyAgent } from 'socks-proxy-agent';
import dotenv from 'dotenv';

dotenv.config();

const USER_AGENTS = [
    'Mozilla/5.0 (Windows NT 10.0; rv:109.0) Gecko/20100101 Firefox/115.0', // Tor Browser Standard Windows
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/115.0', // Tor Browser Mac
    'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0' // Tor Browser Linux
];

export class TorClient {
    constructor() {
        const proxyUrl = process.env.TOR_PROXY_URL || 'socks5h://127.0.0.1:9050';
        this.agent = new SocksProxyAgent(proxyUrl);
    }

    getRandomUserAgent() {
        return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
    }

    async fetch(url) {
        const config = {
            method: 'get',
            url: url,
            headers: {
                'User-Agent': this.getRandomUserAgent(),
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1'
            },
            httpAgent: this.agent,
            httpsAgent: this.agent,
            timeout: parseInt(process.env.REQUEST_TIMEOUT) || 30000
        };

        try {
            const response = await axios(config);
            return response.data;
        } catch (error) {
            throw new Error(`[Tor Error] Gagal memuat URL: ${url}. Alasan: ${error.message}`);
        }
    }
}
