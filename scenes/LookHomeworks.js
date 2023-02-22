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
const {actionGetOneHomework, finishSent, homeworksList} = require("../homeworks");
const {getWatch} = require("../lib/keyboards");
const telegraf = require("telegraf");
const convert = new DateConverter()

class lookHomeworkSceneGenerator {
    GenLookScene () {
        const look = new BaseScene('look')
        async function calcNowDay() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.getMonth();
            const day = date.getDate();
            return day + "-" + month + 1 + "-" + year
        }
        look.enter(async (ctx) => {
            const listOfLook =  await callDb.findAllIntensive2_0()
            await ctx.reply(`Просмотр домашних заданий участников 2.0.\nСегодня ${ await calcNowDay()}\nВыберите, пожалуйста, участника`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: `Выйти`, callback_data: 'close_look'}
                            ]
                        ]
                    }
                })
            for (let i = 0; i < listOfLook.length; i++) {
                // console.log(listOfLook[i].dataValues)
                await ctx.reply(`${listOfLook[i].dataValues.real_name_telegram}`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: `Выбрать`, callback_data: listOfLook[i].dataValues.chatId }
                                ]
                            ]
                        }
                    }

                )
            }

        })
        look.action('close_look', async ctx => {
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
        look.action(/(\d+)/, async ctx => {
            const newId = ctx.update.callback_query.data
            console.log("The newId  id is:", newId)
            await ctx.reply(`Просмотр домашних заданий за последние 6 рассылок для ${ newId }`,
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
        });
        look.action('close_step', async ctx => {
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

        async function calcLink(chatId, number) {
            // console.log(chatId)
            const user = await callDb.checkUserForCommon(chatId)
            const fullWeek = await convert.calculateWeeksSinceBirth(user.birthday_telegram)
            const fullMonth = await convert.calculateMonthsSinceBirth(user.birthday_telegram)
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

        look.action('check_today', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const link = await calcLink(chatId, 0 )
            ctx.answerCbQuery()
            if (chatId) {
                try {
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
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });

        look.on('message', async (ctx) => {
            await ctx.reply('Это я пока не понимаю.')
            await ctx.scene.reenter()
        })
        return look
    }
}
module.exports = lookHomeworkSceneGenerator