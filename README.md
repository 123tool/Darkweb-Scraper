## 🕵️‍♂️ DarkWeb OSINT Scraper

DarkWeb OSINT Scraper adalah alat intelijen digital (Open Source Intelligence) berbasis Node.js yang dirancang untuk melakukan pencarian massal secara paralel (*asynchronous concurrency*) di berbagai mesin pencari *darknet*, *deepweb*, dan jaringan `.onion`. 

Alat ini mengarahkan seluruh trafiknya secara aman melalui proxy **Tor SOCKS5h**, menyembunyikan identitas investigator dengan *rotating user-agents*, serta menggunakan sistem arsitektur berbasis kode modular dan pemetaan selektor berbasis JSON (*engine selector mapping*) untuk memudahkan perawatan jangka panjang.

---

## ✨ Fitur

* **Parallel Multi-Engine Search:** Mengeksekusi pencarian ke banyak *search engine* (Ahmia, DarkSearch, OnionLand, Haystack, TorDex, dll.) secara bersamaan menggunakan `Promise.all`.
* **Deep Native Tor Integration:** Menggunakan protokol `socks5h://` untuk memastikan resolusi DNS domain `.onion` terjadi di dalam jaringan Tor, bukan bocor (*leak*) ke DNS publik ISP Anda.
* **Anti-Bot Evading:** Mengacak struktur *Header* HTTP dan *User-Agent* di setiap request untuk meminimalkan risiko pemblokiran atau deteksi *bot* oleh sistem proteksi eksternal.
* **Modular Configuration:** Struktur HTML tiap mesin pencari dipetakan terpisah di dalam file `engines.json`. Anda bisa menambah atau memperbaiki selektor *engine* yang rusak tanpa menyentuh kode program utama.
* **Clean CLI Output:** Menampilkan ringkasan hasil investigasi langsung di terminal dalam bentuk tabel (`console.table`) yang rapi dan mudah dibaca.

---

## Instalasi & Penggunaan
​1. Prasyarat Sistem
​Sebelum menjalankan alat ini, Anda wajib menginstal dan menjalankan Tor Service di komputer Anda sebagai jembatan ke jaringan .onion.

- **​Linux (Debian/Ubuntu) :**
```
sudo apt update && sudo apt install tor -y
sudo service tor start
```

- **macOS (Homebrew) :**
```
brew install tor
brew services start tor
```
- **Windows :**
Unduh dan jalankan Tor Expert Bundle atau cukup buka aplikasi Tor Browser di latar belakang sebelum mengeksekusi skrip ini. Kloning Repositori :
```
git clone https://github.com/123tool/Darkweb-Scraper.git
cd Darkweb-Scraper
```

## Instalasi Dependensi
​Pastikan Anda sudah menginstal Node.js (Direkomendasikan versi v18 atau yang lebih baru).
```
npm install
```

## Konfigurasi Environment
​Buat file bernama .env di direktori utama (root) proyek Anda, lalu masukkan konfigurasi port Tor Anda :
```
# Gunakan port 9050 untuk Tor Service (Linux/Mac) atau port 9150 jika menggunakan Tor Browser (Windows)
TOR_PROXY_URL=socks5h://127.0.0.1:9050
REQUEST_TIMEOUT=30000
```

## Jalankan
```
npm start
```
Masukkan kata kunci yang ingin diinvestigasi saat diminta oleh terminal (contoh: "database breach", "exploit kit"), lalu tekan Enter.

## Peringatan

Alat ini dibuat murni untuk tujuan edukasi, riset keamanan siber, pertahanan digital, dan kebutuhan investigasi OSINT legal. Pengembang tidak bertanggung jawab atas segala bentuk penyalahgunaan alat ini untuk aktivitas yang melanggar hukum di wilayah hukum masing-masing. Selalu patuhi etika investigasi dan aturan hukum yang berlaku.
