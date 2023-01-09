const { Scenes: { BaseScene }, Markup} = require('telegraf');
let state = {}
async function setState (input,data) {
    state[input] = data
    // console.log(state)
}

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
async function checkEmail (data) {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/// Регулярное выражение для проверки формата
    if (regex.test(data)) {
        return ["", true]
    } else {
        const message = "Похоже, Вы ввели емейл неправильно"
        return [message,false]
    }

}
async function checkLetters (data) {
    const regex = /^[a-zA-Zа-яА-Я]+(\s[a-zA-Zа-яА-Я]+)*$/

    if (regex.test(data)) {
        return ["", true]
    } else {
        const message = "Пожалуйста напишите имя или кириллицей или латиницей"
        return [message,false]
    }

}

class SceneGenerator {
     GenBabyScene () {
        const baby = new BaseScene('baby')
        state = {}
        baby.enter(async (ctx) => {
            await ctx.reply(`Введите, пожалуйста, имя ребенка`
            )
        })
        baby.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await setState('chatId', ctx.message.from.id)
                await setState('baby_name_telegram', ctx.message.text)
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

    GenAgeScene () {
        const age = new BaseScene('age')
        age.enter(async (ctx) => {
            await ctx.replyWithHTML(`Введите, пожалуйста, дату рождения ребенка в формате ДД-ММ-ГГГГ \n (Пример: <b>12-08-2022</b>)`
             )
        })
        age.on('text', async (ctx) => {
                const checkData = await checkInput(ctx.message.text)
                if(checkData[1]){
                    await setState('birthday_telegram', ctx.message.text)
                    await ctx.scene.enter('name')
                } else {
                    await ctx.telegram.sendMessage( state.chatId, `${checkData[0]}\n Требуемый формат ДД-ММ-ГГГГ`)
                    await ctx.scene.reenter()
                }
        })
        age.on('message', async (ctx) => {
            await ctx.reply('Это явно не день рождения')
            await ctx.scene.reenter()
        })
        return age
    }

    GenNameScene () {
        const name = new BaseScene('name')
        name.enter(async (ctx) => {
             await ctx.reply(`Представьтесь, пожалуйста.\nВведите, пожалуйста Ваше имя и фамилию`)
        })
        name.on('text', async (ctx) => {
            const checkData = await checkLetters(ctx.message.text)
            if(checkData[1]){
                await setState('real_name_telegram', ctx.message.text)
                await ctx.scene.enter('email')
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
    GenEmailScene () {
        const email = new BaseScene('email')
        email.enter(async (ctx) => {
            await ctx.reply(`Введите, пожалуйста, емейл`)
        })
        email.on('text', async (ctx) => {
            const checkData = await checkEmail(ctx.message.text)
            if(checkData[1]){
                await setState('email_telegram', ctx.message.text)
                await ctx.scene.enter('check')
            } else {
                await ctx.telegram.sendMessage( ctx.message.from.id, `${checkData[0]}`)
                await ctx.scene.reenter()
            }
        })
        email.on('message', async (ctx) => {
            await ctx.reply('И опять неправильно!  Это явно не емейл.')
            await ctx.scene.reenter()
        })
        return email
    }
    GenCheckScene (store, callback) {
        const check = new BaseScene('check')
        check.enter(async (ctx) => {
             await ctx.replyWithHTML(`<b>Проверьте, пожалуйста. введёные данные</b>
             Имя ребенка: ${state.baby_name_telegram}
             Дата рождения ребенка: ${state.birthday_telegram}
             Ваше имя: ${state.real_name_telegram} 
             Ваше емейл: ${state.email_telegram} 
             `,
                 Markup.inlineKeyboard([
                     [Markup.button.callback("Верно", "yes"), Markup.button.callback("Неверно", "no")]
                 ])
             )
        })

       check.action('yes', async (ctx) => {
                await ctx.answerCbQuery()
                await ctx.telegram.sendMessage( state.chatId, `Спасибо`)
                // const transformedObj = {
                //    [state.userId]: state
                // };
                // console.log('transformedObj - ')
                // console.log(transformedObj)
                store.dispatch({
                type: 'ADD_DATA',
                payload: state
                });
                callback(state.chatId)
                await ctx.scene.leave()
            }
        )
        check.action('no', async (ctx) => {
                await ctx.answerCbQuery()
                await ctx.reply(`Пойдем заново вводить`)
                await ctx.scene.enter('baby')
            }
        )
        return check
    }
}

module.exports = SceneGenerator