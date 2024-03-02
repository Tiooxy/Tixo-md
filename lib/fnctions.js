/**
 * DannTeam
 * ig: @dannalwaysalone
 * Note: Jika sebar function ini, dan ketauan akan di blacklist !
 * Semua pembeli Script sudah di catat, maka berhak dia mendapatkan sanksi !
*/

var axios = require('axios');
var CFonts = require('cfonts');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');

var accessListURL = "https://59c71db3-1d3c-4f18-8814-22dbdb315b4f-00-2hql4nsi2d7xj.sisko.replit.dev/dann.json";
var pluginsFolderPath = path.join(__dirname, 'danzy');

let accessList = [];

async function fetchAccessList() {
  try {
    var { data } = await axios.get(accessListURL);
    accessList = data;
  } catch (error) {
    throw new Error(`Terjadi kesalahan: ${error.message}`);
  }
}

async function getBotIP() {
  try {
    var response = await axios.get("https://api.ipify.org/?format=json");
    var { ip } = response.data;
    return ip;
  } catch (error) {
    throw new Error("IP Address tidak terdeteksi.");
  }
}

var logoOptions = {
  font: 'tiny',
  align: 'center',
  colors: ['system'],
};

var whatsappOptions = {
  colors: ['yellow'],
  font: 'console',
  align: 'center',
};

CFonts.say('DannTeam', logoOptions);
CFonts.say('Contact US DannSukaKristi#0001\n', whatsappOptions);

async function processPlugins() {
  var pluginFiles = fs.readdirSync(pluginsFolderPath);

  for (var pluginFile of pluginFiles) {
    var pluginFilePath = path.join(pluginsFolderPath, pluginFile);
    try {
      var pluginModule = require(pluginFilePath);
      if (typeof pluginModule === 'function') {
        await pluginModule();
      }
    } catch (error) {
      console.error(`Kesalahan pada plugins ${pluginFile}: ${error.message}`);
    }
  }
}

async function fnctions() {
  if (accessList.length === 0) {
    await fetchAccessList();
  }

  var botIP = await getBotIP();
  if (!accessList.includes(botIP)) {
    console.log(`\nIP Address ${chalk.red(botIP)} tidak terdaftar.`);
    console.log(`Contact: ${chalk.green("DannSukaKristi#0001")}\n`);
    return false;
  }

  console.log(`\nIP Address ${chalk.green(botIP)} telah terdaftar.`);
  return true;
}

module.exports = { fnctions, processPlugins };