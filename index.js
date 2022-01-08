const TelegramBot = require('node-telegram-bot-api');
require('dotenv').config();
const axios = require('axios').default;

const token = process.env.botToken;
const options = {
    polling: true,
}
const bot = new TelegramBot(token, options);

async function getEmailInfo(email) {
    const data = await axios.get('https://api.eva.pingutil.com/email?email='+email);
    return JSON.parse(JSON.stringify(data.data.data));
}
bot.on("polling_error", console.log);

bot.onText(/\/start/, async (msg) => {
    bot.sendMessage(msg.chat.id, "");
});

bot.onText(/\/help/, async (msg) => {
    bot.sendMessage(msg.chat.id, "");
});

bot.onText(/\/check (.+)/, async (msg, match) => {
    let data = await getEmailInfo(match[1]);
    var result = `Domain : ${data.domain | null}
    Valid Syntax : ${data.valid_syntax}
    WebMail : ${data.webmail}
    Deliverable : ${data.deliverable}
    Gibberish : ${data.gibberish}
    Spam : ${data.spam}`;
    bot.sendMessage(msg.chat.id, result);
});






