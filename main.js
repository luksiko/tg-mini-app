import { Telegraf, Markup } from "telegraf";
import { message } from "telegraf/filters";

const token = process.env.TELEGRAM_BOT_TOKEN
const webAppUrl = 'https://ang-tg-webapp.web.app';
const bot = new Telegraf(token);

bot.command('start', (ctx) => {
    ctx.reply(
        'Добро пожаловать, нажмите кнопку ниже, чтобы запустить приложение',
        Markup.keyboard([
            Markup.button.webApp(
                'Send feedback',
                webAppUrl + '/feedback',
            ),
        ]),
    );
});

bot.on(message('web_app_data'), async (ctx) => {
    const data = ctx.webAppData.data.json();
    ctx.reply(`Ваше сообщение: ${data?.feedback}` ?? 'empty message');
});

bot.launch();