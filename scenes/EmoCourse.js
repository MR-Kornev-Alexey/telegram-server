const {Scenes: {BaseScene}} = require('telegraf');
const callDb = require("../controllers/tutorial.controller")

class EmoSceneGenerator {
    GenEmoScene() {
        const emo = new BaseScene('emo')
        const weeks = [
            {
                text: '1 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Работа с положительными эмоциями',
                        link: '/first'
                    }
                ]
            },
            {
                text: '2 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Работа с отрицательными эмоциями',
                        link: '/negatives'
                    },
                    {
                        id: 2,
                        label: 'Контейнирование эмоций',
                        link: '/main-container'
                    }
                ]
            },
            {
                text: '3 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Работа с истерикой',
                        link: '/hysterics'
                    }
                ]
            },
            {
                text: '4 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Если ребенок кусается',
                        link: '/bite'
                    }
                ]
            },
            {
                text: '5 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Слова - запреты и слова "НЕТ" и "НЕЛЬЗЯ"',
                        link: '/stop'
                    },
                    {
                        id: 1,
                        label: 'Эмоциональное развитие мамы',
                        link: '/emotion'
                    }
                ]
            },
            {
                text: '6 - я неделя',
                show: false,
                module: [
                    {
                        id: 0,
                        label: 'Удобный ребенок/Харизматичная личность',
                        link: '/comfortable'
                    },
                    {
                        id: 1,
                        label: 'Границы и правила',
                        link: '/border'
                    }
                ]
            }
        ]

        async function getEmoWeek(openPositions) {
            let openButton = []
            try {
                for (let i = 0; i < openPositions.length; i++) {
                    openButton.push(
                        [
                            {
                                "text": `${openPositions[i] + 1} - я неделя`,
                                "callback_data": `emo_${openPositions[i]}`
                            }
                        ]
                    )
                }
                openButton.push(
                    [
                        {
                            "text": "Закрыть",
                            "callback_data": "close_emo"
                        }
                    ]
                )
                return {
                    reply_markup: {
                        inline_keyboard: openButton
                    }
                }
            } catch (e) {
                console.log(e)
            }
            // console.log(user)

        }

        async function checkOpenWeek(array) {
            // создаем новый массив, содержащий позиции единиц
            // console.log('array week  - ', array);
            const newStr = array.replace(/\[|\]/g, "");
            const arr = newStr.split(",").map(Number);
            console.log(arr);
            const onesPositions = [];
            for (let i = 0; i < arr.length; i++) {
                if (Number(arr[i]) === 1) {
                    onesPositions.push(i);
                }
            }
            if (onesPositions.length > 0) {
                // console.log(onesPositions);
                return onesPositions
            } else {
                console.log("В массиве нет единиц");
                return null
            }
        }

        emo.enter(async (ctx) => {
                const user = ctx.update.callback_query.from.id
                if (user) {
                    const userEmo = await callDb.checkUserEmo(user)
                    // console.log(accessOfEmo.access_emo)
                    const currentDate = new Date()
                    const lastOptionOpenDate = userEmo.lastOptionOpenDate
                    const daysSinceLastOptionOpen = Math.floor((currentDate - lastOptionOpenDate) / (1000 * 60 * 60 * 24));
                    if (daysSinceLastOptionOpen >= 7) {
                        // Открываем опции
                        // user.lastOptionOpenDate = currentDate;
                        // await user.save();
                    }
                    const openWeek = await checkOpenWeek(userEmo.choice_emo)
                    try {
                        if (openWeek === null) {
                            await ctx.reply(`У вас нет доступа ни к одной неделе по работе е эмоциями\n Для открытия обратитесь, пожалуйста, в Службу поддержки\n https://t.me/mrk_service`,
                                {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                {text: `Выйти`, callback_data: 'close_emo'}
                                            ]
                                        ]
                                    }
                                })
                        } else {
                            await ctx.reply(`Приветствую Вас на курсе по работе с эмоциями.\n Выберите, пожалуйста, неделю`,
                                await getEmoWeek(openWeek)
                            )
                        }

                    } catch (e) {
                        console.log(e)
                    }
                } else {
                    await ctx.scene.leave()
                }
            }
        )
        emo.action('close_emo_window', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if (chatId) {
                // код, который использует свойство from
                try {
                    const messageId = ctx.update.callback_query.message.message_id
                    ctx.answerCbQuery()
                    await ctx.telegram.deleteMessage(chatId, messageId)
                } catch (e) {
                    console.log(e)
                }
            } else {
                await ctx.scene.leave()
            }
        });
        emo.action('close_emo', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            ctx.answerCbQuery()
            if (chatId) {
                // код, который использует свойство from
                try {
                    const messageId = ctx.update.callback_query.message.message_id

                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                } catch (e) {
                    console.log(e)
                }
            } else {
                await ctx.scene.leave()
            }
        });
        const emoRegex = /^emo_([0-9]|10)$/; // регулярное выражение для проверки
        emo.action(/(\d+)/, async (ctx) => {
            const newId = ctx.update.callback_query.data
            console.log("The newId is:", newId)
            ctx.answerCbQuery()
            if (ctx.update.callback_query.data === 'undefined' || ctx.update.callback_query.data === null) {
                console.log("The ctx is:", newId)
                await ctx.scene.leave()
            } else {
                if (emoRegex.test(newId)) {
                    // ваш код для выполнения функции emo.action() при правильном входном значении
                    try {
                        const lastTwo = Number(newId.substring(newId.length - 1, newId.length))
                        await ctx.reply(`Просмотр недели `,
                            {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            {text: 'Закрыть', callback_data: 'close_emo_window'}
                                        ]
                                    ]
                                }
                            }
                        )
                    } catch (e) {
                        console.log(e)
                    }
                } else {
                }
            }


        });
        emo.on('message', async (ctx) => {
            await ctx.reply('Это я пока не понимаю.')
            await ctx.scene.reenter()
        })
        return emo
    }
}

module.exports = EmoSceneGenerator