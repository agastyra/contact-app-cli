// import core module File System
const fs = require("fs");
// import core module Readline
const readline = require("readline");

// Buat interface readline
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Cek apakah folder ./data sudah ada atau belum
const dirPath = "./data";
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

// Cek apakah file contacts.json di dalam folder ./data sudah ada atau belum
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");

// buat function pertanyaan yang menerima parameter berupa soal, dan mengembalikan Promise yang menjalankan rl.question()
const pertanyaan = (soal) => {
  return new Promise((resolve, reject) => {
    rl.question(soal, (jawaban) => {
      resolve(jawaban);
    });
  });
};

// membuat function simpan yang menerima parameter nama dan email
const simpan = (nama, email) => {
  // membuat object contact yang memiliki key nama, email
  const contact = {
    nama,
    email,
  };

  // menjalankan method readFile() dari core module File System
  fs.readFile("data/contacts.json", "utf-8", (err, data) => {
    // Cek jika terdapat error pada saat menjalankan fungsi readFile()
    if (err) console.error(err);

    // Mengambil isi file dan melakukan parsing ke dalam bentuk JSON
    data = JSON.parse(data);
    // Menambahkan isi array pada JSON
    data.push(contact);

    // Menuliskan kembali isi file ke file contacts.json dengan menggunakan method writeFileSync(), dengan menggunakan data yang sudah di ubah menjadi JSON
    fs.writeFileSync("data/contacts.json", JSON.stringify(data), "utf-8");

    // Mengembalikan nilai string
    return "Terimakasih telah mengisi data";
  });

  // Menutup readline
  rl.close();
};

// Meng-export module / function
module.exports = {
  pertanyaan,
  simpan,
};
