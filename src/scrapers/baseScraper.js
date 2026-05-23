import { TorClient } from '../services/torClient.js';

export class BaseScraper {
    constructor() {
        if (this.constructor === BaseScraper) {
            throw new Error("BaseScraper adalah class abstrak dan tidak bisa diinstansiasi langsung.");
        }
        this.client = new TorClient();
    }

    /**
     * Metode utama yang wajib diimplementasikan oleh subclass
     * @param {string} keyword - Kata kunci pencarian
     */
    async search(keyword) {
        throw new Error("Metode 'search(keyword)' wajib diimplementasikan!");
    }
}
