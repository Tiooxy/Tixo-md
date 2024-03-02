require('./config')
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const moment = require("moment");
const chalk = require('chalk')
const PORT = process.env.PORT || 8080;

process.on("unhandledRejection", console.error);
process.on("uncaughtException", console.error);

var isRunning = false;

const folderPath = './tmp';
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log('Folder tmp berhasil dibuat.');
        }

async function start(file) {
  if (isRunning) return;

  try {
    isRunning = true;
    var args = [path.join(__dirname, file), ...process.argv.slice(2)];
    var p = spawn(process.argv[0], args, {
      stdio: ["inherit", "inherit", "pipe", "ipc"],
    });

    let errorStack = "";

    p.stderr.on("data", (data) => {
      errorStack += data.toString();
    });

    p.on("message", (data) => {
      console.log("[ Execute ]", data);
      switch (data) {
        case "reset":
          p.kill();
          isRunning = false;
          start.apply(this, arguments);
          break;
        case "uptime":
          p.send(process.uptime());
          break;
      }
    });

    p.on("exit", (code) => {
      isRunning = false;
      console.error("Keluar dengan kode:", code);

      if (code !== null) {
        const now = moment().format("YYYY-MM-DD_HH-mm-ss");
        const logFileName = `system/log/error_log_${now}.txt`;
        const logFilePath = path.join(__dirname, logFileName);

        const logContent = `
          Error aktivitas - ${now}
          Keluar dengan Code: ${code}
          Error bagian: ${errorStack || "No error stack available"}
         
        `;
        console.log(chalk.red(errorStack))
        fs.writeFile(logFilePath, logContent, (err) => {
          if (err) console.error("Gagal menyimpan log error sistem:", err); 
          console.log(err)
          console.log("menyimpan ke folder system/log:", logFileName);
        });

        
          start(file);
        
      } else {
        console.log("Keluar dengan kode: null. Memulai ulang...");
        start("main.js");
      }
    });

    console.log(`${global.info.nameBot} server is running on port ${PORT}`);
  } catch (e) {
    console.error("Terjadi kesalahan:", e);
  }
}

/**
Starting main.js
**/
start("main.js");
  