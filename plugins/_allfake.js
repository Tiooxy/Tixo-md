/*
wa.me/6282285357346
github: https://github.com/sadxzyq
Instagram: https://instagram.com/tulisan.ku.id
ini wm gw cok jan di hapus
*/

const fs = require('fs');
const fetch = require('node-fetch');
const moment = require('moment-timezone');
const axios = require('axios');

let handler = m => m
handler.all = async function(m, { conn }) {
    let name = await conn.getName(m.sender)
    let pp = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
    let fotonyu = 'https://telegra.ph/file/e1047817d256d9e372144.jpg'
    try {
        pp = await this.profilePictureUrl(m.sender, 'image')
    } catch (e) {} finally {

        global.doc = pickRandom(["application/vnd.ms-excel", "application/vnd.openxmlformats-officedocument.presentationml.presentation", "application/msword", "application/pdf"])
        global.fsizedoc = pickRandom([2000, 3000, 2023000, 2024000])
        
        // modul
        global.axios = require('axios')
        global.fetch = require('node-fetch')
        global.cheerio = require('cheerio')
        global.fs = require('fs')
        
        const _uptime = process.uptime() * 1000

        global.fkon = {
            key: {
                fromMe: false,
                participant: m.sender,
                ...(m.chat ? {
                    remoteJid: 'BROADCAST GROUP'
                } : {})
            },
            message: {
                contactMessage: {
                    displayName: `${name}`,
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nN:;a,;;;\nFN:${name}\nitem1.TEL;waid=${m.sender.split('@')[0]}:${m.sender.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
                }
            }
        }

        // pesan sementara
        global.ephemeral = '86400'
        global.ucapan = ucapan()
        global.botdate = date()
        
        global.fakeVerif = {
          key: { 
          participant: '0@s.whatsapp.net', 
          remoteJid: "0@s.whatsapp.net" }, 
          message: {
          conversation: "_Akun telah Terverifikasi WhatsApp_"}
          }
        
        global.fakeig = {
            contextInfo: {
                externalAdReply: {
                    showAdAttribution: true,
                    title: info.nameBot,
                    body: ucapan(),
                    thumbnailUrl: pp,
                    sourceUrl: url.sig
                }
            }
        }
    }
}

module.exports = handler

function date() {
    let d = new Date(new Date + 3600000)
    let locale = 'id'
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let tgl = `${week}, ${date}`
    return tgl
}
function ucapan() {
    const time = moment.tz('Asia/Jakarta').format('HH')
    let res = "Selamat malam "
    if (time >= 4) {
        res = "Selamat pagi "
    }
    if (time > 10) {
        res = "Selamat siang "
    }
    if (time >= 15) {
        res = "Selamat sore "
    }
    if (time >= 18) {
        res = "Selamat malam "
    }
    return res
}

function pickRandom(list) {
    return list[Math.floor(list.length * Math.random())]
}