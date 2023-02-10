const getCommon = require("./commonFunction");
const helenFunction = require("../helenFunction/function");
const callDb = require("../controllers/tutorial.controller");
const index13 = require("../temp/13");
const index14 = require("../temp/14");
const index15 = require("../temp/15");
const index16 = require("../temp/16");
const index17 = require("../temp/17");
const index18 = require("../temp/18");
const after57_2 = require("../temp/new-after-57")
const alex = require("../temp/alex")


async function sendUsersAfter57_2(ctx) {
    const dayData = await getCommon.calcNowDate()
    const newArrayIntensive = after57_2
    await  callDb.getNumberIndex_2().then(result => {
        const number = result.indexSent + 1
        // console.log(number)
            for (let i = 0; i < newArrayIntensive.length; i++) {
                setTimeout(() => {
                    try {
                        ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                            // console.log("chatMember ----", chatMember.status)
                            if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                                console.log('User is not available')
                            } else {
                                try {
                                    if (i === newArrayIntensive.length - 1) {
                                        await callDb.saveIndex57_2(number)
                                    }
                                    switch (newArrayIntensive[i].numberMonth) {
                                        case 13 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index13[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index13[number].link, index13[number].index)
                                            break
                                        case 14 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index14[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index14[number].link, index14[number].index)
                                            break
                                        case 15 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index15[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index15[number].link, index15[number].index)
                                            break
                                        case 16 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index16[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index16[number].link, index16[number].index)
                                            break
                                        case 17 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index17[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index17[number].link, index17[number].index)
                                            break
                                        case 18 :
                                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                                `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                                `ДЗ от ${ dayData }( ${number} )\n ` +
                                                `${index18[number].link}`
                                            )
                                            await callDb.saveSandingToDB(newArrayIntensive[i], index18[number].link, index18[number].index)
                                            break
                                        default:
                                            await ctx.replyWithHTML(`ошибка отправки ${newArrayIntensive[i].name} `)
                                    }
                                    await ctx.telegram.sendMessage(1081994928, `ДЗ ${newArrayIntensive[i].name} отправлено`).then(r => {})
                                } catch (error) {
                                    console.log(error);
                                }
                            }
                        })
                    } catch (error) {
                        console.log(error);
                    }

                }, 10000 * i)
            }

    }
    )
}
module.exports = sendUsersAfter57_2;