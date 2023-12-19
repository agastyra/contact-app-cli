const fs = require("fs");
const chalk = require("chalk");
const validator = require("validator");
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

// membuat function untuk mendapatkan semua kontak
const daftarKontak = async () => {
  try {
    const contacts = await readfile(filePath, "utf-8");
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
  const duplicatedNama = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
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

  if (duplicatedNama) {
    console.log(chalk.yellowBright(`${nama} sudah di dalam kontak`));
    return false;
  }

  rl.close();

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
  console.log(chalk.dim("Memuat..."));

  rl.close();

  if (contacts.length < 1) {
    console.log(chalk.yellow("Belum ada kontak yang tercatat"));
    return false;
  }

  contacts.forEach((contact, i) => {
    return console.log(`${i + 1}. ${contact.nama} - ${contact.telp}`);
  });
};

// Membuat function untuk menampilkan detail informasi mengenai kontak yang dicari
const detail = async (nama) => {
  const contacts = await daftarKontak();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );
  const name = contact.nama;
  const email = contact.email ? contact.email : "-";
  const telp = contact.telp;

  console.log(chalk.dim("Memuat..."));

  if (contacts.length < 1) {
    console.log(chalk.yellow("Belum ada kontak yang tercatat"));
    return false;
  }

  const text = chalk`Nama: {greenBright.bold ${name}}\nEmail: {greenBright.bold ${email}}\nNo. Telpon: {greenBright.bold ${telp}}
    `;

  rl.close();

  return console.log(text);
};

// Membuat function untuk merubah informasi mengenai kontak yang dicari
const edit = async (nama) => {
  const contacts = await daftarKontak();
  const contact = contacts.find(
    (contact) => contact.nama.toLowerCase() === nama.toLowerCase()
  );

  console.log(chalk.dim("Memuat..."));

  if (contacts.length < 1) {
    console.log(chalk.yellow("Belum ada kontak yang tercatat"));
    return false;
  }

  const text = chalk`Nama: {greenBright.bold ${
    contact.nama
  }}\nEmail: {greenBright.bold ${
    contact.email ? contact.email : "-"
  }}\nNo. Telpon: {greenBright.bold ${contact.telp}}
    `;

  console.log(text);

  const namaBaru = await pertanyaan("Masukkan nama baru:");
  const emailBaru = await pertanyaan("Masukkan email baru:");
  const telpBaru = await pertanyaan("Masukkan no. telp baru:");
  rl.close();

  if (emailBaru) {
    if (!validator.isEmail(emailBaru)) {
      console.log(chalk.redBright(`Email ${emailBaru} tidak valid`));
      return false;
    }
  }

  if (telpBaru) {
    if (!validator.isMobilePhone(telpBaru, "id-ID")) {
      console.log(chalk.redBright(`No telepon ${telpBaru} tidak valid`));
      return false;
    }
  }

  const duplicatedNama = contacts.find(
    (contact) => contact.nama.toLowerCase() === namaBaru.toLowerCase()
  );

  if (duplicatedNama) {
    console.log(chalk.yellowBright(`${nama} sudah di dalam kontak`));
    return false;
  }

  contact.nama = namaBaru ? namaBaru : contact.nama;
  contact.email = emailBaru ? emailBaru : contact.email;
  contact.telp = telpBaru ? telpBaru : contact.telp;

  // Menuliskan kembali isi file ke file contacts.json dengan menggunakan method writeFileSync(), dengan menggunakan data yang sudah di ubah menjadi JSON
  fs.writeFileSync(filePath, JSON.stringify(contacts), "utf-8");

  // Menampilkan string ke layar
  return console.log(chalk.greenBright("Terimakasih telah mengisi data"));
};

// Meng-export module / function
module.exports = {
  simpan,
  tampil,
  detail,
  edit,
};
