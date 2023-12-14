const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let nama = "";
let umur = 0;

rl.question("Masukkan Nama: ", (nama) => {
  nama = nama;

  rl.question("Masukkan Umur: ", (umur) => {
    umur = umur;
    rl.close();

    console.log(`Halo nama saya ${nama} saya berumur ${umur} tahun.`);
  });
});
