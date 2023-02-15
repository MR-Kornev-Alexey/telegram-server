const callDb = require("../controllers/tutorial.controller");
const msg = require("../common/messageForGroup")
const group = require("../common/dataGroup")
const arraySend = require("../lib/send_0_56")
const homeworks_0_12 = require("../lib/dataHomeworks_0_12");
const after57 = require("../temp/new-after-57")
const listAfter57 = require("../temp/homeworkafter57")
const checkFile = require("../temp/24-01-2023-before-56")
const alex = require("../temp/alex")
const myasgo = require("../temp/myasgo")
const homeworks_11_13 = require("../temp/11_13")
const homeworks_14_19 = require("../temp/14_19")
const helpHelen = require("../common/helpHelen");
const index13 = require("../temp/13")
const index14 = require("../temp/14")
const index15 = require("../temp/15")
const index16 = require("../temp/16")
const index17 = require("../temp/17")
const index18 = require("../temp/18")
const DateConverter = require('../common/DateConverter');
const sendFileBefore56 = require("../temp/03-02-2023-before56")
const {actionGetOneHomework, finishSent, homeworksList} = require("../homeworks");
const {getWatch} = require("../lib/keyboards");
const convert = new DateConverter()


//"0 6 * * 1-5" // каждый день недели, кроме субботы и воскресения, в 00:00
// Cron.js состоит из шести полей:
//
//     минуты (0-59)
// часы (0-23)
// дни месяца (1-31)
// месяцы (1-12)
// дни недели (0-7, где 0 и 7 - воскресенье)
// команда

exports.openDreamNewUser = async (ctx, user) => {
    await callDb.saveDreamNew(user).then(
        await ctx.reply(
            `Доступ открыт`
        )
    ).catch(e => {
        console.log(e)
        }
    )
}

exports.startStep = async (ctx) => {
    await checkUserHelen(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы уже подружились со мной.\nЖдите ДЗ согласно графику.`,
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПодружитесь, пожалуйста со мной, отправив мне слово дружба`,
            )
        }
    }).catch(e => {
        console.log(e)
    })
}
exports.firstStep = async (ctx) => {
    switch (ctx.message.text) {
        case '/support':
            ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\nhttps://t.me/mrk_service`)
            break
        case '/help':
            await ctx.replyWithHTML(helpHelen.help)
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHLnBju3AHWWk_-r_jjHgXlXAl16HJugACwxMAAm3oEEqGY8B94dy6NC0E')
            break
        case "Дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        case "дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        case "/homeworks":
            await ctx.replyWithHTML(`<b>Домашние задания следует смотреть в Helen Bot.</b>\n\n` +
                `Вам сюда https://t.me/mrk_new_bot`)
            break
        default :
            await mainCheckAdmin(ctx)
    }
}
async function nextStep(ctx) {
    // await ctx.replyWithHTML(`<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>`)
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
        case "/look20":
            await ctx.replyWithHTML(`<b>Команда look20</b>`)
            // await lookForSent(ctx)
            await ctx.scene.enter('look');
            break
        case "/all":
            await ctx.replyWithHTML(`<b>Команда all</b>`)
            break
        case "/find":
            await ctx.replyWithHTML(`<b>Команда find</b>`)//поиск незарегестрированных в ДЗ
            await findHelenForSend(checkFile)
            break
        case "/sending":
            await ctx.replyWithHTML(`<b>Команда sending</b>`)
            await transmitterHomeworks(ctx, arraySend)
            break
        case "/list":
            await ctx.replyWithHTML(`<b>Команда list</b>`) //создание листа для рассылки
            await createList(ctx, arraySend)
            break
        case "/test20":
            await ctx.replyWithHTML(`<b>Команда test20</b>`) //создание тестового листа для рассылки
            await createListOFSending (ctx, arraySend)
            break
        case "/message":
            await ctx.replyWithHTML(`<b>Команда message</b>`)
            break
        case "/convert":
            await ctx.replyWithHTML(`<b>Команда convert</b>`)//Из общей в интесив
            await convertUserIntensive()
            break
        case "/sorting":
            await ctx.replyWithHTML(`<b>Команда sorting</b>`)
            await sortingBabyAfter56week()
            break
        case "/users":
            await ctx.replyWithHTML(`<b>Команда users</b>`)
            await checkUsersForReal(ctx, checkFile)
            break
        case "/users57":
            await ctx.replyWithHTML(`<b>Команда users57</b>`)
            await checkUsersForReal(ctx, after57)
            break
        case "/access":
            await ctx.replyWithHTML(`<b>Команда access</b>`)
            await openAccessAll()
            break
        case "/i20":
            await ctx.replyWithHTML(`<b>Команда i20</b>`)
            await sendUsersIntensive2_0(ctx, sendFileBefore56, await calcNowDate())
            // await sendUsersIntensive2_0(ctx, alex, await calcNowDate())
            break
        case "/send_one":
            await ctx.replyWithHTML(`<b>Команда send_one</b>`)
            await sendUsersIntensive2_0(ctx, alex, await calcNowDate())
            // await sendUsersIntensive2_0(ctx, alex, await calcNowDate())
            break
        case "/i57":
            await ctx.replyWithHTML(`<b>Команда i57</b>`)
            await sendUsersIntensive2_0_14(ctx, after57, 21, await calcNowDate())
            // await sendUsersIntensive2_0_14(ctx, alex, 13, await calcNowDate())
            // await sendUsersIntensive2_0_14(ctx, myasgo , 13, await calcNowDate())
            break
        default:
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQtjx4Mrk8muB2BSyhVHqSko2ZZrQgACzBgAAntYUEmwTZrmztcawi0E')
            await ctx.replyWithHTML(`<b>Непонятная команда\n Повторите, пожалуйста, ввод. </b>`)
    }
}

 mainCheckAdmin = async (ctx) => {
    const isAdmin = await checkUserAdmin(ctx.message.from);
    if (isAdmin) {
        await nextStep(ctx)
    } else {
        switch (ctx.message.text) {
            default:
                await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQtjx4Mrk8muB2BSyhVHqSko2ZZrQgACzBgAAntYUEmwTZrmztcawi0E')
                await ctx.reply('Я это слово пока еще не знаю.\nПока я отравляю только ДЗ\nМожете написать в поддержку\nhttps://t.me/mrk_service')
        }
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
async function calcNowDate(){
    const allMonths = ["января", "февраля", "марта", "апреля" , "мая" , "июня" , "июля" , "августа" , "сентября" , "октября" , "ноября" , "декабря" ]
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();
    return day + " " + allMonths[month] + " " + year + " года"

}

async function transmitterOneToMore(ctx, array, message, userId) {
    // console.log("array.length -- ", array.length)
    for (let i = 0; i < array.length; i++) {
        ctx.telegram.getChatMember(array[i].id, userId).then(async (chatMember) => {
            // console.log("chatMember ----", chatMember.status)
            if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                // console.log('User is not available')
            } else {
                // console.log(array[i])
                await ctx.replyWithHTML(
                    `<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n В ${array[i].title} отправлено`)
                await ctx.telegram.sendMessage(array[i].id, `Привет участникам группы ${array[i].title}.\n${message}\n`)
            }
        })

    }

}

async function openAccessAll(){
    const oldArray = await callDb.findAll()
    const newArray = oldArray.map(({
                                       dataValues: {
                                           chatId,
                                       }
                                   }) => {
        return {
            chatId: chatId,
        }
    });
    for (let i = 0; i < newArray.length; i++) {
       await callDb.inputTrue(newArray[i].chatId)
    }
}

async function calculateAllIndexOfLink(fullWeek) {
    const today = new Date();
    const dayOfWeek = today.getUTCDay();
      // console.log("dayOfWeek ----- ", dayOfWeek )
    let indexLink = null
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-01";
    } else if (dayOfWeek <= 5) {
        indexLink = (fullWeek <= 9 ? "0" + fullWeek : fullWeek) + "-0" + dayOfWeek;
    }
    // console.log("indexLink --- ", indexLink)
    return indexLink
}


async function calculateLinkForSending(fullWeek, array) {
    let indexLink = await calculateAllIndexOfLink(fullWeek)
    let object = array.find(obj => obj.id === indexLink)
    // console.log('object ----', object)
    return object
}

async function calculateIndexForSending(fullWeek, array) {
    let indexLink = calculateAllIndexOfLink(fullWeek)
    // console.log(indexLink)
    // console.log(object)
    return array.find(obj => obj.id === indexLink)
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
    let diffDays = Math.floor(Math.abs((birthdate.getTime() - today.getTime()) / (oneDay)));
    return Math.floor(diffDays / 7);
}

async function gatDataForSend(arraySend) {
    const newData = await callDb.findAllIntensive()
    const data = []
    for (let i = 0; i < newData.length; i++) {
        const fullMonth = await calculateMonthsSinceBirth(newData[i].dataValues.birthday_telegram)
        const fullWeek = await calculateWeeksSinceBirth(newData[i].dataValues.birthday_telegram)
        if (fullWeek <= 56) {
            const linkVideo = await calculateLinkForSending(fullWeek, arraySend)
            data.push({
                numberMonth: fullMonth,
                numberWeek: fullWeek,
                link: linkVideo.link,
                tittle: linkVideo.title,
                id: linkVideo.id,
                chatId: newData[i].dataValues.chatId,
                name: newData[i].dataValues.real_name_telegram,
                birthday: newData[i].dataValues.birthday_telegram,

            })
        }
    }
    console.log(data)
    // return data
}

async function transmitterMessageNew(ctx, arraySend, message) {
    const newArrayIntensive = await gatDataForSend(arraySend);
    const data = newArrayIntensive.filter(user => user.status !== 'left' && user.status !== 'kicked' && user.status !== 'restricted');
    const promises = data.map(async user => {
        return ctx.telegram.sendMessage(user.chatId,
            `Доброго времени суток ${user.name}\n ` +
            `Вашему ребенку ${user.numberMonth} мес.?\n + ${message}`
        )
    });
    await Promise.all(promises);
    await ctx.replyWithHTML(`<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n Сообщениe успешно отправлено`);
}


async function checkUsersForReal(ctx, arraySend) {
    let allErrors = []
    for (let i = 0; i < arraySend.length; i++) {
        try {
            await ctx.telegram.getChat(arraySend[i].chatId);
            // console.log(chat);
        } catch (error) {
            if (error.response.error_code === 400 && error.response.description.includes('chat not found')) {
                console.log(`Chat with id ${arraySend[i].chatId} - ${arraySend[i].name} not found.`);
                allErrors.push(`Chat with id ${arraySend[i].chatId}  - ${arraySend[i].name} not found.`)

            } else {
                throw error;
            }
        }
    }
    console.log(allErrors);
}

async function sendUsersIntensive2_0(ctx, newArrayIntensive, date ) {
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try {
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId, `❤️Доброго времени суток ${newArrayIntensive[i].name}\n\nДЗ от ${date} (${newArrayIntensive[i].indexWeek})\n` +
                                `\n` +
                                `${newArrayIntensive[i].link}\n`
                            )
                            await callDb.saveSandingToDB(newArrayIntensive[i], newArrayIntensive[i].link, newArrayIntensive[i].indexVideo)
                            await ctx.replyWithHTML(`${newArrayIntensive[i].name} отправлено`)
                        } catch (error) {
                            if (error.response.error_code === 403) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else if (error.response.error_code === 400) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else {
                                console.log(error);
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                } else {
                    console.log(error);
                }
            }

        }, 20000 * i)
    }
    await ctx.replyWithHTML(`Отправка закончена`)
}

exports.sendUsersIntensiveTest = async (ctx) => {
    const date= await calcNowDate()
    const newArrayIntensive = await createListOFSending(ctx, arraySend)
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try {
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await ctx.telegram.sendMessage(newArrayIntensive[i].chatId, `Доброго времени суток ${newArrayIntensive[i].name}\n\nДЗ от ${date} (${newArrayIntensive[i].indexWeek})\n` +
                                `\n` +
                                `${newArrayIntensive[i].link}\n`
                            )
                            await callDb.saveSandingToDB(newArrayIntensive[i], newArrayIntensive[i].link, newArrayIntensive[i].indexVideo)
                            await ctx.reply(`${newArrayIntensive[i].name} отправлено`)
                        } catch (error) {
                            if (error.response.error_code === 403) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else if (error.response.error_code === 400) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else {
                                console.log(error);
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                } else {
                    console.log(error);
                }
            }

        }, 10000 * i)
    }
    await ctx.reply(`Отправка закончена`)
}

//ssh root@80.78.245.91
async function sendUsersIntensive2_0_14(ctx, newArrayIntensive, number, dayData ) {
    await callDb.saveIndex57(number)
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try {
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        try {
                             switch (newArrayIntensive[i].numberMonth) {
                                 case 13 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index13[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index13[number].link, index13[number].index)
                                     break
                                 case 14 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index14[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index14[number].link, index14[number].index)
                                     break
                                 case 15 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index15[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index15[number].link, index15[number].index)
                                     break
                                 case 16 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index16[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index16[number].link, index16[number].index)
                                     break
                                 case 17 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index17[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index17[number].link, index17[number].index)
                                     break
                                 case 18 :
                                     await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                         `❤️ Доброго времени суток ${newArrayIntensive[i].name}\n\n` +
                                         `ДЗ от ${ dayData }\n\n ` +
                                         `${index18[number].link}`
                                     )
                                     await callDb.saveSandingToDB(newArrayIntensive[i], index18[number].link, index18[number].index)
                                     break
                                 default:
                                     await ctx.replyWithHTML(`ошибка отправки ${newArrayIntensive[i].name} `)
                             }
                            await ctx.replyWithHTML(` отправлено ${newArrayIntensive[i].name}`)
                        } catch (error) {
                            if (error.response.error_code === 403) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else if (error.response.error_code === 400) {
                                console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                            } else {
                                console.log(error);
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                } else {
                    console.log(error);
                }
            }

        }, 20000 * i)
    }
    await ctx.replyWithHTML(`Отправка закончена`)
}

async function transmitterHomeworks(ctx, arraySend) {
    const newArrayIntensive = await gatDataForSend(arraySend)
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try {
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        if (newArrayIntensive[i].linkSending !== "false") {
                            try {
                                await ctx.telegram.sendMessage(newArrayIntensive[i].chatId, `Привет ${newArrayIntensive[i].name}\n Тестовая рассылка.\n` +
                                    `Вашему ребенку ${newArrayIntensive[i].numberMonth} мес.?\n` +
                                    `${newArrayIntensive[i].linkSending}`
                                )
                                await ctx.replyWithHTML(`${newArrayIntensive[i].name} отправлено`)
                            } catch (error) {
                                if (error.response.error_code === 403) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                } else if (error.response.error_code === 400) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                } else {
                                    console.log(error);
                                }
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                } else {
                    console.log(error);
                }
            }

        }, 20000 * i)
    }
    console.log("newArrayIntensive ---", newArrayIntensive)
}


async function sortingBabyAfter56week() {
    const newData = await callDb.findAllIntensiveAll()
    const data = []
    for (let i = 0; i < newData.length; i++) {
        const fullMonth = await calculateMonthsSinceBirth(newData[i].dataValues.birthday_telegram)
        const fullWeek = await calculateWeeksSinceBirth(newData[i].dataValues.birthday_telegram)
        if (fullWeek > 56 || fullWeek < 3) {
            data.push({
                numberMonth: fullMonth,
                numberWeek: fullWeek,
                chatId: newData[i].dataValues.chatId,
                name: newData[i].dataValues.real_name_telegram,
                birthday: newData[i].dataValues.birthday_telegram,
            })
        }
    }
    console.log(data)
}

async function convertUserIntensive() {
    const oldArray = await callDb.findAllHomeworks()
    const newArray = oldArray.map(({
                                       dataValues: {
                                           real_name_telegram,
                                           first_name_telegram,
                                           chatId,
                                           baby_name_telegram,
                                           birthday_telegram,
                                           email_telegram,
                                           assess_homeworks
                                       }
                                   }) => {
        return {
            name: real_name_telegram,
            chatId: chatId,
            babyName: baby_name_telegram,
            birthdayBaby: birthday_telegram,
            email: email_telegram,
            first_name_telegram: first_name_telegram,
            assess:	assess_homeworks
        }
    });
    for (let i = 0; i < newArray.length; i++) {
        // await callDb.createUserForTest(newArray[i])
        const user = await callDb.checkUserForIntensive(newArray[i].chatId)
        if (user) {
            console.log("найден ---", newArray[i].name ,"----", newArray[i].chatId)
        } else {
            console.log("не найден ---", newArray[i].name, "----", newArray[i].chatId)
            if(newArray[i].assess){
                await callDb.createUserForIntensive(newArray[i])
                // await callDb.createUserForTest(newArray[i])
            }
        }
    }
    console.log(newArray)
}

async function findHelenForSend(arraySend) {
    const newData = await callDb.findAllHelen()
    const dataHelen = []
    for (let i = 0; i < newData.length; i++) {
        dataHelen.push(newData[i].dataValues.chatId)
    }
    // console.log("dataHelen ---", dataHelen)
    const noFind = []
    for (let i = 0; i < arraySend.length; i++) {
        console.log(arraySend[i].chatId)
        let object = dataHelen.find(item => item === arraySend[i].chatId)
        // console.log('object', object)
        if (object) {
            // console.log('object ---- найден', object)
        } else {
            // console.log('object ---- не найден', object)
            noFind.push(arraySend[i])
        }

    }
    console.log("noFind ---", noFind)
}

async function createListBefore56 (newData) {
    const noSending = [5749279828, 5210099858, 1321902346 , 1251040108,  542927509,  11770275, 1430019107,  768625232, 1321902346, 145003601]
    const dataBefore56 = []
    for (let i = 0; i < newData.length; i++) {
        const fullMonth = await calculateMonthsSinceBirth(newData[i].dataValues.birthday_telegram)
        const fullWeek = await calculateWeeksSinceBirth(newData[i].dataValues.birthday_telegram)
        // console.log("fullMonth ---", fullMonth)
        // console.log("fullWeek ---", fullWeek)
        if (fullWeek <= 62) {
            const linkVideo = await calculateLinkForSending(fullWeek, arraySend)
            const isElementFound = noSending.includes(newData[i].dataValues.chatId)
            if(!isElementFound){
                dataBefore56.push({
                    numberMonth: fullMonth,
                    numberWeek: fullWeek,
                    indexVideo: linkVideo.index,
                    link: linkVideo.link,
                    indexWeek: linkVideo.id,
                    chatId: newData[i].dataValues.chatId,
                    name: newData[i].dataValues.real_name_telegram,
                    birthday: newData[i].dataValues.birthday_telegram,
                })
            }
        }
    }
    console.log("dataBefore56 ---", dataBefore56)
    return dataBefore56
}

async function createList () {
    const newData = await callDb.findAllIntensive() // формирование реального списка
    // const newData = await callDb.findAllTest() // формирование тестового списка
    const listBefore56 = await createListBefore56(newData)
    console.log("listBefore56 ---", listBefore56)
    const listAfter56 = await createListOFSendingAfter56Week(newData)
    console.log("listAfter56 ---", listAfter56)
}

exports.createListOFSending = async () => {  //command is list
    const newData = await callDb.findAllIntensive() // формирование реального списка
    // const newData = await callDb.findAllTest() // формирование тестового списка
    return await createListBefore56(newData)
}



async function createListOFSendingAfter56Week(newArray) {  //command is list57
    // const newArray = await callDb.findAll()
    const dataAfter57 = []
    for (let i = 0; i < newArray.length; i++) {
        const fullMonth = await calculateMonthsSinceBirth(newArray[i].dataValues.birthday_telegram)
        const fullWeek = await calculateWeeksSinceBirth(newArray[i].dataValues.birthday_telegram)
        if (fullMonth === 13 || fullMonth === 14 ) {
            dataAfter57.push({
                numberMonth: fullMonth,
                numberWeek: fullWeek,
                chatId: newArray[i].dataValues.chatId,
                name: newArray[i].dataValues.real_name_telegram,
                birthday: newArray[i].dataValues.birthday_telegram,
                link: ""
            })
        }
    }
    // console.log("dataAfter57 ---", dataAfter57)
    return dataAfter57
}

 checkUserHelen = (data) => {
    return new Promise((resolve, reject) => {
        callDb.findOneHelen(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    console.log("idCheck ----", idCheck, "Пользователь найден")
                    resolve(true); //Пользователь найден
                } else {
                    console.log("Пользователь не найден")
                    callDb.createHelen(data);
                    resolve(false); //Пользователь не найден
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}