const yargs = require("yargs");
const { simpan } = require("./contact");

yargs.command({
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
});

yargs.parse();
