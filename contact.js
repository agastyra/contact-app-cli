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

// membuat function simpan yang menerima parameter nama dan email
const simpan = (nama, email, telp) => {
  // membuat object contact yang memiliki key nama, email, dan telp
  const contact = {
    nama,
    email,
    telp,
  };

  // menjalankan method readFile() dari core module File System
  fs.readFile("data/contacts.json", "utf-8", (err, data) => {
    // Cek jika terdapat error pada saat menjalankan fungsi readFile()
    if (err) console.error(err);

    // Mengambil isi file dan melakukan parsing ke dalam bentuk JSON
    data = JSON.parse(data);

    // Cek duplikasi email -- logikal error
    // const duplicatedEmail = data.find((contact) => {
    //   if (contact.email) {
    //     contact.email.toLowerCase() === email.toLowerCase();
    //   }
    // });

    // Cek duplikasi
    const duplicatedTelp = data.find(
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
    data.push(contact);

    // Menuliskan kembali isi file ke file contacts.json dengan menggunakan method writeFileSync(), dengan menggunakan data yang sudah di ubah menjadi JSON
    fs.writeFileSync("data/contacts.json", JSON.stringify(data), "utf-8");

    // Menampilkan string ke layar
    return console.log(chalk.greenBright("Terimakasih telah mengisi data"));
  });
};

// Meng-export module / function
module.exports = {
  simpan,
};
