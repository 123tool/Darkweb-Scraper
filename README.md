# 🕵️‍♂️ DarkWeb OSINT Scraper

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D%2018.0.0-blue.svg)](https://nodejs.org)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Category](https://img.shields.io/badge/OSINT-Tool-red.svg)]()

DarkWeb OSINT Scraper adalah alat intelijen digital (Open Source Intelligence) berbasis Node.js yang dirancang untuk melakukan pencarian massal secara paralel (*asynchronous concurrency*) di berbagai mesin pencari *darknet*, *deepweb*, dan jaringan `.onion`. 

Alat ini mengarahkan seluruh trafiknya secara aman melalui proxy **Tor SOCKS5h**, menyembunyikan identitas investigator dengan *rotating user-agents*, serta menggunakan sistem arsitektur berbasis kode modular dan pemetaan selektor berbasis JSON (*engine selector mapping*) untuk memudahkan perawatan jangka panjang.

---

## ✨ Fitur Utama

* **Parallel Multi-Engine Search:** Mengeksekusi pencarian ke banyak *search engine* (Ahmia, DarkSearch, OnionLand, Haystack, TorDex, dll.) secara bersamaan menggunakan `Promise.all`.
* **Deep Native Tor Integration:** Menggunakan protokol `socks5h://` untuk memastikan resolusi DNS domain `.onion` terjadi di dalam jaringan Tor, bukan bocor (*leak*) ke DNS publik ISP Anda.
* **Anti-Bot Evading:** Mengacak struktur *Header* HTTP dan *User-Agent* di setiap request untuk meminimalkan risiko pemblokiran atau deteksi *bot* oleh sistem proteksi eksternal.
* **Modular Configuration:** Struktur HTML tiap mesin pencari dipetakan terpisah di dalam file `engines.json`. Anda bisa menambah atau memperbaiki selektor *engine* yang rusak tanpa menyentuh kode program utama.
* **Clean CLI Output:** Menampilkan ringkasan hasil investigasi langsung di terminal dalam bentuk tabel (`console.table`) yang rapi dan mudah dibaca.

---

## 🏗️ Struktur Proyek

```text
darkweb-scraper/
├── config/
│   └── engines.json         # Database target URL & CSS Selector mesin pencari
├── src/
│   ├── scrapers/
│   │   ├── baseScraper.js   # Blueprint / Abstract class untuk standarisasi scraper
│   │   └── engineScraper.js # Engine parser dinamis menggunakan Cheerio
│   ├── services/
│   │   └── torClient.js     # Core HTTP client terintegrasi SOCKS5 Agent
│   └── app.js               # Entry point utama & CLI Orchestrator
├── .env                     # Konfigurasi port Tor & Environment variable
├── package.json             # Dependensi aplikasi
└── README.md                # Dokumentasi proyek
