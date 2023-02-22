const { Scenes: { BaseScene }, Markup} = require('telegraf');
const callDb = require("../controllers/tutorial.controller")
const diffTime = require("../common/differentMonths");
const getCommon = require("../common/commonFunction");

class SceneGenerator {
GenBabyScene () {
    const baby = new BaseScene('baby')
    baby.enter(async (ctx) => {
        await ctx.reply(`Введите, пожалуйста, имя ребенка`
        )
    })
   async function checkLetters(text) {
             const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
             if (regex.test(text)) {
                 return ["", true]
             } else {
                 const message = "Пожалуйста напишите имя или кириллицей или латиницей"
                 return [message,false]
             }
         }
        baby.on('text', async (ctx) => {
            let source = ctx.botInfo.id
            const checkData = await checkLetters(ctx.message.text)
            let data = "no"
            console.log("source" , source)
            if(source === 5858592661 ){
                data = "dream"
            } else {
                data = "intensive"
            }
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"baby_name_telegram" : ctx.message.text , source: data})
                 await ctx.scene.enter('age')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        baby.on('message', async (ctx) => {
            await ctx.reply('Это явно не имя')
            await ctx.scene.reenter()
        })
         return baby
    }
    GenBabyEditScene () {
        const edit_baby = new BaseScene('edit_baby')
        edit_baby.enter(async (ctx) => {
            await ctx.reply(`Введите заново имя ребенка`
            )
        })
        async function checkLetters(text) {
            const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
            if (regex.test(text)) {
                return ["", true]
            } else {
                const message = "Пожалуйста напишите имя или кириллицей или латиницей"
                return [message,false]
            }
        }
        edit_baby.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"baby_name_telegram" : ctx.message.text})
                await ctx.scene.enter('check')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        edit_baby.on('message', async (ctx) => {
            await ctx.reply('Это явно не имя')
            await ctx.scene.reenter()
        })
        return edit_baby
    }

    GenAgeScene () {
        const age = new BaseScene('age')
        age.enter(async (ctx) => {
            await ctx.replyWithHTML(`Введите, пожалуйста, дату рождения ребенка в формате ДД-ММ-ГГГГ \n (Пример: <b>12-08-2022</b>)`
             )
        })
        async function checkInput (data) {
            // const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(2[1-4])$/
            const regex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(20(20|21|22|23|24))$/
            if (regex.test(data)) {
                return ["", true]
            } else {
                const message = "Похоже, формат даты неправильный"
                return [message,false]
            }

        }
        age.on('text', async (ctx) => {
                const checkData = await checkInput(ctx.message.text)
                if(checkData[1]){
                    await callDb.getInDB(ctx.message.from.id, {"birthday_telegram" : ctx.message.text })
                    await ctx.scene.enter('name')
                } else {
                    await ctx.reply(`${checkData[0]}\n Требуемый формат ДД-ММ-ГГГГ`)
                    await ctx.scene.reenter()
                }
        })
        age.on('message', async (ctx) => {
            await ctx.reply('Это явно не день рождения')
            await ctx.scene.reenter()
        })
        return age
    }

    GenEditAgeScene () {
        const edit_birthday = new BaseScene('edit_birthday')
        edit_birthday.enter(async (ctx) => {
            await ctx.replyWithHTML(`Введите ДР ребенка в формате ДД-ММ-ГГГГ\n(Пример: <b>12-08-2022</b>)`
            )
        })
        async function checkInput (data) {
            // const regex = /^(0[1-9]|[12][0-9]|3[01])-(0[1-9]|1[0-2])-(2[1-4])$/
            const regex = /^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[0-2])-(20(20|21|22|23|24))$/
            if (regex.test(data)) {
                return ["", true]
            } else {
                const message = "Похоже, формат даты неправильный"
                return [message,false]
            }

        }
        edit_birthday.on('text', async (ctx) => {
            const checkData = await checkInput(ctx.message.text)
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"birthday_telegram" : ctx.message.text })
                await ctx.scene.enter('check')
            } else {
                await ctx.reply(`${checkData[0]}\n Требуемый формат ДД-ММ-ГГГГ`)
                await ctx.scene.reenter()
            }
        })
        edit_birthday.on('message', async (ctx) => {
            await ctx.reply('Это явно не день рождения')
            await ctx.scene.reenter()
        })
        return edit_birthday
    }

    GenNameScene () {
        const name = new BaseScene('name')
        name.enter(async (ctx) => {
             await ctx.reply(`Представьтесь, пожалуйста.\nВведите, пожалуйста Ваши имя и фамилию`)
        })
        async function checkLetters(text) {
            const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
            if (regex.test(text)) {
                return ["", true]
            } else {
                const message = "Пожалуйста напишите имя или кириллицей или латиницей"
                return [message,false]
            }
        }
        name.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
               await callDb.getInDB(ctx.message.from.id, {"real_name_telegram" : ctx.message.text })
                await ctx.scene.enter('location')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        name.on('message', async (ctx) => {
            await ctx.reply('И кого вы хотите проверить?  Это явно не имя')
            await ctx.scene.reenter()
        })
        return name
    }
    GenEditNameScene () {
        const edit_name = new BaseScene('edit_name')
        edit_name.enter(async (ctx) => {
            await ctx.reply(`Введите повторно Ваши имя и фамилию`)
        })
        async function checkLetters(text) {
            const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
            if (regex.test(text)) {
                return ["", true]
            } else {
                const message = "Имя пишется или кириллицей или латиницей"
                return [message,false]
            }
        }
        edit_name.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"real_name_telegram" : ctx.message.text })
                await ctx.scene.enter('check')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        edit_name.on('message', async (ctx) => {
            await ctx.reply('Это явно не имя')
            await ctx.scene.reenter()
        })
        return edit_name
    }
    GenLocationScene () {
        const location = new BaseScene('location')
        location.enter(async (ctx) => {
            await ctx.reply(`Введите, пожалуйста, где Вы живете`)
        })
        async function checkLetters(text) {
            const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
            if (regex.test(text)) {
                return ["", true]
            } else {
                const message = "Пожалуйста напишите или кириллицей или латиницей"
                return [message,false]
            }
        }
        location.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"location" : ctx.message.text })
                await ctx.scene.enter('email')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        location.on('message', async (ctx) => {
            await ctx.reply('И опять явно не то, что надо ')
            await ctx.scene.reenter()
        })
        return location
    }
    GenEditLocationScene () {
        const edit_location = new BaseScene('edit_location')
        edit_location.enter(async (ctx) => {
            await ctx.reply(`Введите повторно где Вы живете`)
        })
        async function checkLetters(text) {
            const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/
            if (regex.test(text)) {
                return ["", true]
            } else {
                const message = "Пишется или кириллицей или латиницей"
                return [message,false]
            }
        }
        edit_location.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await callDb.getInDB(ctx.message.from.id, {"location" : ctx.message.text })
                await ctx.scene.enter('check')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        edit_location.on('message', async (ctx) => {
            await ctx.reply('И опять явно что-то не то')
            await ctx.scene.reenter()
        })
        return edit_location
    }
    GenEmailScene () {
        const email = new BaseScene('email')
        email.enter(async (ctx) => {
            await ctx.reply(`Введите, пожалуйста, email`)
        })
        async function checkEmail (data) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/// Регулярное выражение для проверки формата
            if (regex.test(data)) {
                return ["", true]
            } else {
                const message = "Похоже, Вы ввели email неправильно"
                return [message,false]
            }

        }
        email.on('text', async (ctx) => {
            const checkData = await checkEmail(ctx.message.text)
            if(checkData[1]){
                callDb.getInDB(ctx.message.from.id, {"email_telegram" : ctx.message.text })
                    .then(async (result) => {
                        // Execute next function if update was successful
                        if (result) {
                            await ctx.scene.enter('check')
                        } else {
                            await ctx.reply(`Похоже, ошибка`)
                            await ctx.telegram.sendMessage(ctx.message.from.id, `${result}`)
                            await ctx.scene.reenter()
                        }
                    })
                    .catch(async (error) => {
                        await ctx.telegram.sendMessage(ctx.message.from.id, `${checkData[0]}`)
                        await ctx.scene.reenter()
                    });
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        email.on('message', async (ctx) => {
            await ctx.reply('И опять неправильно!  Это явно не email.')
            await ctx.scene.reenter()
        })
        return email
    }
    GenEditEmailScene () {
        const edit_email = new BaseScene('edit_email')
        edit_email.enter(async (ctx) => {
            await ctx.reply(`Введите, пожалуйста, email`)
        })
        async function checkEmail (data) {
            const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/// Регулярное выражение для проверки формата
            if (regex.test(data)) {
                return ["", true]
            } else {
                const message = "Похоже, Вы ввели email неправильно"
                return [message,false]
            }

        }
        edit_email.on('text', async (ctx) => {
            const checkData = await checkEmail(ctx.message.text)
            if(checkData[1]){
                callDb.getInDB(ctx.message.from.id, {"email_telegram" : ctx.message.text })
                    .then(async (result) => {
                        // Execute next function if update was successful
                        if (result) {
                            await ctx.scene.enter('check')
                        } else {
                            await ctx.reply(`Похоже, ошибка`)
                            await ctx.telegram.sendMessage(ctx.message.from.id, `${result}`)
                            await ctx.scene.reenter()
                        }
                    })
                    .catch(async (error) => {
                        await ctx.telegram.sendMessage(ctx.message.from.id, `${checkData[0]}`)
                        await ctx.scene.reenter()
                    });
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        edit_email.on('message', async (ctx) => {
            await ctx.reply('И опять неправильно!  Это явно не email.')
            await ctx.scene.reenter()
        })
        return edit_email
    }
    GenCheckScene () {
        const check = new BaseScene('check')
        check.enter(async (ctx) => {
            callDb.getOne(ctx.message.from).then(async (result) => {
                try{
                    await ctx.reply(
                        `Проверьте Ваши данные:\n` +
                        `*Имя ребенка* - ${result.baby_name_telegram}\n` +
                        `*Дата рождения ребенка* - ${result.birthday_telegram}\n` +
                        `*Число полных месяцев* - ${diffTime.calculating(result.birthday_telegram)}\n` +
                        `*Ваши Имя и Фамилия* - ${result.real_name_telegram}\n` +
                        `Вы живете в  ${result.location}\n` +
                        `*Ваш email* - ${result.email_telegram}`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {text: 'Изменить имя ребенка', callback_data: 'edit_baby'}
                                    ],
                                    [
                                        {text: 'Изменить дату рождения ребенка', callback_data: 'edit_birthday'}
                                    ],
                                    [
                                        {text: 'Изменить имя', callback_data: 'edit_name'}
                                    ],
                                    [
                                        {text: 'Изменить локацию', callback_data: 'edit_location'}
                                    ],
                                    [
                                        {text: 'Изменить email', callback_data: 'edit_email'}
                                    ],
                                    [
                                        {text: 'Все верно', callback_data: 'yes'}
                                    ]
                                ]
                            }
                        }
                    )

                } catch (e) {
                    console.log(e)
                }
        })
        }
        )
        check.action('edit_email', async (ctx) => {
                await ctx.reply(`Пойдем исправлять email`)
                const chatId = ctx.update.callback_query.from.id
                const messageId = ctx.update.callback_query.message.message_id
                await ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.enter('edit_email')
                }catch (e) {
                    console.log(e)
                }
            } else {}

            }
        )
        check.action('edit_location', async (ctx) => {
                await ctx.reply(`Пойдем исправлять место жительства`)
                const chatId = ctx.update.callback_query.from.id
                const messageId = ctx.update.callback_query.message.message_id
                await ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.enter('edit_location')
                }catch (e) {
                    console.log(e)
                }
            } else {}

            }
        )
        check.action('edit_name', async (ctx) => {
                await ctx.reply(`Пойдем исправлять имя`)
                const chatId = ctx.update.callback_query.from.id
                const messageId = ctx.update.callback_query.message.message_id
                await ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.enter('edit_name')
                }catch (e) {
                    console.log(e)
                }
            } else {}

            }
        )

        check.action('edit_birthday', async (ctx) => {
                await ctx.reply(`Пойдем редактировать ДР`)
                const chatId = ctx.update.callback_query.from.id
                const messageId = ctx.update.callback_query.message.message_id
                await ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.enter('edit_birthday')
                }catch (e) {
                    console.log(e)
                }
            } else {}
            }
        )
        check.action('edit_baby', async (ctx) => {
            await ctx.reply(`Пойдем редактировать имя ребенка`)
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            await ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.enter('edit_baby')
                }catch (e) {
                    console.log(e)
                }
            } else {}

            }
        )
        check.action('yes', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                    await getCommon.getServiceNew(ctx, chatId)
                    await getCommon.sendServiceNewUser(ctx, chatId)
                }catch (e) {
                    console.log(e)
                }
            } else {}

        });
        return check
    }
}

module.exports = SceneGenerator