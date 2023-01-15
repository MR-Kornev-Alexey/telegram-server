const callDb = require("../controllers/tutorial.controller");
const msg = require("../common/messageForGroup")
const group = require("../common/dataGroup")

async function nextStep(ctx) {
     await ctx.replyWithHTML(`<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>`)
     switch (ctx.message.text) {
         case "/group":
             await ctx.replyWithHTML(`<b>Команда group для всех наших групп</b>`)
             console.log(ctx)
             await ctx.telegram.sendMessage('-1001677650896', `Тестовая сообщение.\n`)
             break
         case "/intensive23":
             await ctx.replyWithHTML(`<b>Команда intensive23</b>`)
             await transmitterOneToMore(ctx, group.intensive23, msg.intensive23, group.helenBotId)
             break
         case "/intensive22":
             await ctx.replyWithHTML(`<b>Команда intensive22</b>`)
             await transmitterOneToMore(ctx, group.intensive22, msg.intensive22, group.helenBotId)
             break
         case "/intensiveAll":
             await ctx.replyWithHTML(`<b>Команда intensive22</b>`)
             break
         case "/all":
             await ctx.replyWithHTML(`<b>Команда all</b>`)
             break
         default:
             await ctx.replyWithHTML(`<b>Непонятная команда</b>`)
     }
}

exports.mainCheckAdmin = async (ctx) => {
    const isAdmin = await checkUserAdmin(ctx.message.from);
    if(isAdmin){
       await nextStep(ctx)
    }else {
        await ctx.reply('И опять неправильно!\nЭто бот для отправки ДЗ\nhttps://t.me/mrk_service')
    }
}
async function checkUserAdmin(data) {
    // console.log(data)
    try {
        const user = await callDb.findUserByPk(data.id);
        if (user && user.role_telegram === "admin") {
            return true;
        }
        return false;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
async function transmitterOneToMore(ctx, array, message, userId){
    console.log("array.length -- ",array.length)
    for (let i = 0; i < array.length; i++) {
        ctx.telegram.getChatMember(array[i].id, userId).then(async (chatMember) => {
            console.log("chatMember ----", chatMember.status)
            if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                console.log('User is not available')
            } else {
                console.log(array[i])
                await ctx.replyWithHTML(
                    `<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n В ${array[i].title} отправлено`)
                     await ctx.telegram.sendMessage(array[i].id, `Привет участникам группы ${array[i].title}.\n${message}\n`)
            }
        })

    }

}
