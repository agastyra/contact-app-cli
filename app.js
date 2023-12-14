const { pertanyaan, simpan } = require("./contact");

const main = async () => {
  const nama = await pertanyaan("Masukkan nama kamu: ");
  const email = await pertanyaan("Masukkan email kamu: ");

  simpan(nama, email);

  console.log("\nTerimakasih sudah mengisi data");
};

main();
