const {Scenes: {BaseScene}, Markup} = require('telegraf');
const callDb = require("../controllers/tutorial.controller")
const arraySend = require("../lib/send_0_56")
const homeworks_11_13 = require("../temp/11_13")
const homeworks_14_19 = require("../temp/14_19")
const index13 = require("../temp/13")
const index14 = require("../temp/14")
const index15 = require("../temp/15")
const index16 = require("../temp/16")
const index17 = require("../temp/17")
const index18 = require("../temp/18")
const DateConverter = require('../common/DateConverter');
const getCommon = require("../common/commonFunction");
const convert = new DateConverter()

class ScanHomeworkSceneGenerator {
    GenScanScene () {
        const scan = new BaseScene('scan')
        async function calcNowDay() {
            const allMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
            const today = new Date();
            const year = today.getFullYear();
            const month = today.getMonth();
            const day = today.getDate();
            return day + " " + allMonths[month] + " " + year + " года"
        }
        scan.enter(async (ctx) => {
            await ctx.reply(`Просмотр домашних заданий за последние 6 рассылок.\nСегодня ${await calcNowDay()}\nВыберите, пожалуйста,  день для просмотра`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'ДЗ сегодня', callback_data: 'check_today' }
                            ],
                            [
                                { text: 'ДЗ минус 1', callback_data: 'check_minus_1' }
                            ],
                            [
                                { text: 'ДЗ минус 2', callback_data: 'check_minus_2' }
                            ],
                            [
                                { text: 'ДЗ минус 3', callback_data: 'check_minus_3' }
                            ],
                            [
                                { text: 'ДЗ минус 4', callback_data: 'check_minus_4' }
                            ],
                            [
                                { text: 'ДЗ минус 5', callback_data: 'check_minus_5' }
                            ],
                            [
                                { text: 'Другой период', callback_data: 'next_step' }
                            ],
                            [
                                { text: 'Закрыть', callback_data: 'close_step' }
                            ]
                        ]
                    }
                }

                )
        })
        scan.action('close_video', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });
        scan.action('close_step', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });
        scan.action('next_step', async ctx => {
            ctx.answerCbQuery()
            await ctx.reply('Эта функция пока в процессе разработки.')
        });
        async function calculateLink(fullWeek) {
            const today = new Date();
            const dayOfWeek = today.getUTCDay();
            // console.log("dayOfWeek ----- ", dayOfWeek )
            let indexLink = null
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-05";
            } else if (dayOfWeek <= 5) {
                indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-0" + dayOfWeek;
            }
            // console.log("indexLink --- ", indexLink)
            return indexLink
        }
        async function calculateLinkForSending(fullWeek, number) {
            const indexLink = await calculateLink(fullWeek)
            let object = arraySend.findIndex(obj => obj.id === indexLink)
            // console.log('object ----', arraySend[object - number])
            return arraySend[object - number]
        }

        async function calcLink(chatId, number) {
            // console.log(chatId)
            const user = await callDb.checkUserForCommon(chatId)
            console.log('user --- ', user)
            const fullWeek = user.index_week
            const fullMonth = await convert.calculateMonthsSinceBirth(user.birthday_telegram)
            try{
                if (fullWeek <= 63) {
                    const linkVideo = await calculateLinkForSending(fullWeek, number)
                    return linkVideo.link
                }
                else {
                    const indexArrays = {
                        13: index13,
                        14: index14,
                        15: index15,
                        16: index16,
                        17: index17,
                        18: index18
                    }
                    const numberToday = await callDb.getNumber()
                    const indexHW = numberToday.dataValues.indexSent - number
                    console.log(numberToday.dataValues.indexSent)
                    if (indexArrays[fullMonth]) {
                        return indexArrays[fullMonth][indexHW].link
                    } else {
                        return 'Эта функция пока в процессе разработки.'
                    }
                }
            } catch (e) {
                console.log(e)
            }

        }

        scan.action('check_today', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId){
                const link = await calcLink(chatId, 0 )
                await ctx.reply(`Домашнее задание сегодня\n ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });

        scan.action('check_minus_1', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId) {
                const link = await calcLink(chatId, 1 )
                await ctx.reply(`Домашнее задание минус 1\n ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });
        scan.action('check_minus_2', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId) {
                const link = await calcLink(chatId, 2 )
                await ctx.reply(`Домашнее задание минус 2\n ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });
        scan.action('check_minus_3', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId) {
                const link = await calcLink(chatId, 3 )
                await ctx.reply(`Домашнее задание минус 3\n ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });
        scan.action('check_minus_4', async ctx => {
           const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId) {
                const link = await calcLink(chatId, 4 )
                await ctx.reply(`Домашнее задание минус 4\n  ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });
        scan.action('check_minus_5', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if(chatId) {
                const link = await calcLink(chatId, 5 )
                await ctx.reply(`Домашнее задание минус 5\n ${link}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: 'Закрыть', callback_data: 'close_video' }
                                ]
                            ]
                        }
                    })
            } else {}
        });

        scan.on('message', async (ctx) => {
            await ctx.reply('Это я пока не понимаю.')
            await ctx.scene.reenter()
        })
        return scan
    }
}
module.exports = ScanHomeworkSceneGenerator