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

class ScanHomeworkSceneGenerator {
    GenScanScene () {
        const scan = new BaseScene('scan')

        async function calcNowDay() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return day + "-" + month + 1 + "-" + year
        }
        async function convertBirthdate(date) {
            const oldDay = Number(date.substring(0, 2));
            const oldMonth = Number(date.substring(3, 5));
            const oldYear = Number(date.substring(6));
            return new Date(oldYear, oldMonth - 1, oldDay)
        }

        async function calculateWeeksSinceBirth(date) {
            const birthdate = await convertBirthdate(date)
            // console.log(birthdate)
            const today = new Date()
            const oneDay = 24 * 60 * 60 * 1000;
            let diffDays = Math.round(Math.abs((birthdate.getTime() - today.getTime()) / (oneDay)));
            return Math.round(diffDays / 7);
        }

        scan.enter(async (ctx) => {
            await ctx.reply(`Просмотр домашних заданий за последние 6 рассылок.\nСегодня ${ await calcNowDay()}\nВыберите, пожалуйста,  день для просмотра`,
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
            await ctx.telegram.deleteMessage(chatId, messageId)
        });
        scan.action('close_step', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            await ctx.telegram.deleteMessage(chatId, messageId)
            await ctx.scene.leave()
        });
        scan.action('next_step', async ctx => {
            ctx.answerCbQuery()
            await ctx.reply('Эта функция пока в процессе разработки.')
        });
        async function calculateLinkForSending(fullWeek, number) {
            const today = new Date();
            const dayOfWeek = today.getUTCDay();
            let indexLink = null
            if (fullWeek <= 9) {
                indexLink = "0" + fullWeek + "-0" + dayOfWeek
            } else {
                indexLink = fullWeek + "-0" + dayOfWeek
            }
            let object = arraySend.findIndex(obj => obj.id === indexLink)
            // console.log('object ----', arraySend[object - number])
            return arraySend[object - number]
        }

        async function calculateMonthsSinceBirth(birthdate) {
            let newBirthdate = await convertBirthdate(birthdate)
            const today = new Date();
            let months = (today.getFullYear() - newBirthdate.getFullYear()) * 12 + today.getMonth() - newBirthdate.getMonth();
            if (today.getDate() < newBirthdate.getDate()) {
                const newFrom = new Date(today.getFullYear(), today.getMonth(), newBirthdate.getDate())
                if (today < newFrom && today.getMonth() === newFrom.getMonth() && today.getFullYear() % 4 !== 0) {
                    months--
                }
            }
            return months
        }

        async function calcLink(chatId, number) {
            // console.log(chatId)
            const user = await callDb.checkUserForCommon(chatId)
            const fullWeek = await calculateWeeksSinceBirth(user.birthday_telegram)
            const fullMonth = await calculateMonthsSinceBirth(user.birthday_telegram)
            if (fullWeek <= 56) {
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
        }

        scan.action('check_today', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 0 )
            ctx.answerCbQuery()
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
        });

        scan.action('check_minus_1', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 1 )
            ctx.answerCbQuery()
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
        });
        scan.action('check_minus_2', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 2 )
            ctx.answerCbQuery()
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
        });
        scan.action('check_minus_3', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 3 )
            ctx.answerCbQuery()
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
        });
        scan.action('check_minus_4', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 4 )
            ctx.answerCbQuery()
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
        });
        scan.action('check_minus_5', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 5 )
            ctx.answerCbQuery()
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
        });

        scan.on('message', async (ctx) => {
            await ctx.reply('Это я пока не понимаю.')
            await ctx.scene.reenter()
        })
        return scan
    }
}
module.exports = ScanHomeworkSceneGenerator