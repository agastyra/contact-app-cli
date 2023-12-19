const yargs = require("yargs");
const chalk = require("chalk");
const { simpan, tampil, detail, edit } = require("./contact");

// Membuat perintah pada terminal untuk menambahkan kontak
yargs
  .command({
    command: "add",
    describe: "Menambahkan kontak baru",
    builder: {
      nama: {
        alias: "n",
        type: "string",
        demandOption: true,
        describe: "Menambahkan nama baru",
      },
      email: {
        alias: "e",
        type: "string",
        demandOption: false,
        describe: "Menambahkan email baru",
      },
      telp: {
        alias: "t",
        type: "string",
        demandOption: true,
        describe: "Menambahkan nomor telepon baru",
      },
    },
    handler({ nama, email, telp }) {
      simpan(nama, email, telp);
    },
  })
  .demandCommand();

// Membuat perintah pada terminal untuk menampilkan semua kontak
yargs.command({
  command: "list",
  describe: "Menampilkan semua data kontak",
  handler() {
    tampil();
  },
});

// Membuat perintah pada terminal untuk menampilkan detail kontak seseorang
yargs.command({
  command: "detail",
  describe: "Menampilkan detail informasi kontak seseorang",
  builder: {
    nama: {
      alias: "n",
      type: "string",
      demandOption: true,
      describe: "Nama kontak yang dicari",
    },
  },
  handler({ nama }) {
    detail(nama);
  },
});

// Membuat perintah pada terminal untuk menampilkan merubah kontak seseorang
yargs.command({
  command: "edit",
  describe: "Mengubah informasi kontak seseorang",
  builder: {
    nama: {
      alias: "n",
      type: "string",
      demandOption: true,
      describe: "Nama kontak yang dicari",
    },
  },
  handler({ nama }) {
    edit(nama);
  },
});

yargs.parse();
