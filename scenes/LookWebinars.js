const {Scenes: {BaseScene}} = require('telegraf');
const callDb = require("../controllers/tutorial.controller")

class webinarWebinarSceneGenerator {
    GenWebinarScene() {
        const webinar = new BaseScene('webinar')
        const periods = [
            {label: '0-2', link: 'https://youtube.com/live/-M8XUiEMUuA'},
            {label: '3-4', link: 'https://youtube.com/live/ePUitCOgN1c'},
            {label: '5-6', link: 'https://youtube.com/live/HJfgbrWaVkM'},
            {label: '7-8', link: 'https://youtube.com/live/qMnZmwGx9UU'},
            {label: '9-10', link: 'https://youtube.com/live/fcCZJqyd0Do'},
            {label: '11-13', link: 'https://youtube.com/live/v8bZ4jR2DN4'},
            {label: '14-18', link: 'https://youtube.com/live/ShMNQarl-MM'},
            {label: '19-14', link: 'https://youtube.com/live/a6eOOzjBYA0'},
            {
                label: '25-30',
                link: 'Для открытия обратитесь, пожалуйста, в Службу поддержки\n https://t.me/mrk_service'
            },
            {
                label: '30-36',
                link: 'Для открытия обратитесь, пожалуйста,  в Службу поддержки\n https://t.me/mrk_service'
            }
        ]

        async function getWebinar(openPositions) {
            let openButton = []
            try {
                for (let i = 0; i < openPositions.length; i++) {
                    openButton.push(
                        [
                            {
                                "text": `период ${periods[openPositions[i]].label} мес.`,
                                "callback_data": `webinar_${openPositions[i]}`
                            }
                        ]
                    )
                }
                openButton.push(
                    [
                        {
                            "text": "Закрыть",
                            "callback_data": "close_webinar"
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

        async function checkOpenWebinar(array) {
            // создаем новый массив, содержащий позиции единиц
            // console.log('array - ', array);
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

        webinar.enter(async (ctx) => {
                const user = ctx.update.callback_query.from.id
                if (user) {
                    const listOfWebinar = await callDb.checkUserWebinar(user)
                    const openPositions = await checkOpenWebinar(listOfWebinar.choice_webinar)
                    console.log(openPositions)
                    try {
                        if (openPositions === null) {
                            await ctx.reply(`У вас нет доступа ни к одному вебинару по развитию.\n Для открытия обратитесь, пожалуйста, в Службу поддержки\n https://t.me/mrk_service`,
                                {
                                    reply_markup: {
                                        inline_keyboard: [
                                            [
                                                {text: `Выйти`, callback_data: 'close_webinar'}
                                            ]
                                        ]
                                    }
                                })
                        } else {
                            await ctx.reply(`Просмотр вебинаров по развитию.\n Выберите, пожалуйста, период`,
                                await getWebinar(openPositions)
                            )
                        }

                    } catch (e) {
                        console.log(e)
                    }
                } else {
                }

            }
        )
        webinar.action('close_webinar_window', async ctx => {
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
        webinar.action('close_webinar', async ctx => {
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
        const webinarRegex = /^webinar_([0-9]|10)$/; // регулярное выражение для проверки
        webinar.action(/(\d+)/, async (ctx) => {
            const newId = ctx.update.callback_query.data
            console.log("The newId is:", newId)
            ctx.answerCbQuery()
            if (ctx.update.callback_query.data === 'undefined' || ctx.update.callback_query.data === null) {
                console.log("The ctx is:", newId)
                await ctx.scene.leave()
            } else {
                if (webinarRegex.test(newId)) {
                    // ваш код для выполнения функции webinar.action() при правильном входном значении
                    try {
                        const lastTwo = Number(newId.substring(newId.length - 1, newId.length))
                        await ctx.reply(`Просмотр вебинара за период ${periods[lastTwo].label} mec.\n ${periods[lastTwo].link}`,
                            {
                                reply_markup: {
                                    inline_keyboard: [
                                        [
                                            {text: 'Закрыть', callback_data: 'close_webinar_window'}
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
        webinar.on('message', async (ctx) => {
            await ctx.reply('Это я пока не понимаю.')
            await ctx.scene.reenter()
        })
        return webinar
    }
}

module.exports = webinarWebinarSceneGenerator