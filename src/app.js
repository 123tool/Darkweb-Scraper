import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { EngineScraper } from './scrapers/engineScraper.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup interface baca input terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Load database konfigurasi engine pencari
const configPath = path.join(__dirname, '../config/engines.json');
const enginesData = JSON.parse(fs.readFileSync(configPath, 'utf8'));

async function main() {
    console.clear();
    console.log("====================================================");
    console.log("       🕵️‍♂️ INDONESIA OSINT - DARKWEB SCRAPER v1.0    ");
    console.log("====================================================");
    
    // Tampilkan daftar engine yang termuat otomatis
    const availableEngines = Object.keys(enginesData);
    console.log(`🤖 Engine Terintegrasi (${availableEngines.length}): [${availableEngines.join(', ')}]`);
    console.log("----------------------------------------------------\n");

    rl.question('🔍 Masukkan kata kunci intelijen (cth: "credit card leak"): ', async (keyword) => {
        if (!keyword.trim()) {
            console.log("❌ Kata kunci tidak boleh kosong!");
            rl.close();
            return;
        }

        console.log(`\n⏳ Mengirimkan agen pencari untuk kata kunci: "${keyword}" via Tor...`);
        console.time('⚡ Waktu eksekusi');

        // Inisialisasi scraper instansiasi secara dinamis
        const scrapers = availableEngines.map(key => new EngineScraper(enginesData[key]));

        // Jalankan semua mesin pencari secara paralel (Asynchronous Concurrency)
        const searchPromises = scrapers.map(scraper => scraper.search(keyword));
        const totalResultsRaw = await Promise.all(searchPromises);

        // Gabungkan semua hasil array menjadi satu flat array
        const finalResults = totalResultsRaw.flat();

        console.log("\n=================== HASIL PENCARIAN ===================");
        console.timeEnd('⚡ Waktu eksekusi');
        console.log(`📊 Total baris data ditemukan: ${finalResults.length}\n`);

        if (finalResults.length === 0) {
            console.log("📭 Tidak ada data yang ditemukan atau seluruh engine time-out.");
        } else {
            // Tampilkan dalam bentuk table interaktif bawaan console node.js
            console.table(finalResults);
        }

        console.log("=======================================================");
        rl.close();
    });
}

// Tangkap error tidak terduga agar aplikasi tidak langsung crash terlempar keluar
process.on('unhandledRejection', (reason, promise) => {
    // Diamkan atau log internal untuk menjaga kelancaran CLI stream
});

main();
