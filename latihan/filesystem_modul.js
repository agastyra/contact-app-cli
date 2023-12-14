const fs = require("fs");

// Menuliskan string ke dalam file secara synchronous

try {
  fs.writeFileSync("data/tes.txt", "oke secara synchronous");
  console.log("selesai");
} catch (e) {
  console.error(e);
}

// Menuliskan string ke dalam file secara asynchronous
fs.writeFile("data/sigap.txt", "oke siap secara asynchronous", (err) =>
  console.error(err)
);

// Membaca file secara synchronous
const message = fs.readFileSync("data/tes.txt", "utf-8");
console.log(message);

fs.readFile("data/sigap.txt", "utf-8", (error, data) => {
  if (error) {
    console.error(error);
  }

  console.log(data);
});
