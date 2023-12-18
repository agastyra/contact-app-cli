// import core module File System
const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");

// Cek apakah folder ./data sudah ada atau belum
const dirPath = "./data";
if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath);

// Cek apakah file contacts.json di dalam folder ./data sudah ada atau belum
const filePath = "./data/contacts.json";
if (!fs.existsSync(filePath)) fs.writeFileSync(filePath, "[]", "utf-8");

// membuat function untuk mendapatkan semua kontak
const daftarKontak = async () => {
  try {
    const contacts = await readfile(filePath, "utf-8");
    console.log(chalk.dim("Memuat..."));
    return JSON.parse(contacts);
  } catch (error) {
    return console.log(chalk.red(error));
  }
};

// refactoring method readFile dari FileSystem
const readfile = (path, option) => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, option, (err, data) => {
      if (err) reject("Terjadi kesalahan");
      resolve(data);
    });
  });
};

// membuat function simpan yang menerima parameter nama email dan no telepon
const simpan = async (nama, email, telp) => {
  // membuat object contact yang memiliki key nama, email, dan telp
  const contact = {
    nama,
    email,
    telp,
  };

  const contacts = await daftarKontak();

  // Cek duplikasi email -- logikal error
  // const duplicatedEmail = data.find((contact) => {
  //   if (contact.email) {
  //     contact.email.toLowerCase() === email.toLowerCase();
  //   }
  // });

  // Cek duplikasi
  const duplicatedTelp = contacts.find(
    (contact) => contact.telp.toLowerCase() === telp.toLowerCase()
  );

  // logical error
  // if (duplicatedEmail) {
  //   console.log(
  //     chalk.redBright(`Alamat email ${email}, sudah berada di dalam kontak`)
  //   );
  //   return false;
  // }

  if (email) {
    if (!validator.isEmail(email)) {
      console.log(chalk.redBright(`Email ${email} tidak valid`));
      return false;
    }
  }

  if (!validator.isMobilePhone(telp, "id-ID")) {
    console.log(chalk.redBright(`No telepon ${telp} tidak valid`));
    return false;
  }

  if (duplicatedTelp) {
    console.log(
      chalk.redBright(`Nomor telepon ${telp}, sudah berada di dalam kontak`)
    );
    return false;
  }

  // Menambahkan isi array pada JSON
  contacts.push(contact);

  // Menuliskan kembali isi file ke file contacts.json dengan menggunakan method writeFileSync(), dengan menggunakan data yang sudah di ubah menjadi JSON
  fs.writeFileSync(filePath, JSON.stringify(contacts), "utf-8");

  // Menampilkan string ke layar
  return console.log(chalk.greenBright("Terimakasih telah mengisi data"));
};

// membuat function untuk menampilkan daftar kontak
const tampil = async () => {
  const contacts = await daftarKontak();

  contacts.forEach((contact, i) => {
    return console.log(`${i + 1}. ${contact.nama} - ${contact.telp}`);
  });
};

// Meng-export module / function
module.exports = {
  simpan,
  tampil,
  daftarKontak,
};
