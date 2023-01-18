const callDb = require("../controllers/tutorial.controller");
const msg = require("../common/messageForGroup")
const group = require("../common/dataGroup")
const arraySend = require("../lib/send_0_56")
const homeworks_0_12 = require("../lib/dataHomeworks_0_12");
const after57 = require("../lib/14-18")
const checkFile = require("../temp/18-01-2023-14-18")
const alex = require("../temp/alex")

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
        case "/intensiveAll":
            await ctx.replyWithHTML(`<b>Команда intensive22</b>`)
            break
        case "/all":
            await ctx.replyWithHTML(`<b>Команда all</b>`)
            break
        case "/sending":
            await ctx.replyWithHTML(`<b>Команда sending</b>`)
            await transmitterHomeworks(ctx, arraySend)
            break
        case "/list":
            await ctx.replyWithHTML(`<b>Команда list</b>`) //создание листа для рассылки
            await createListOFSending(ctx, arraySend)
            break
        case "/message":
            await ctx.replyWithHTML(`<b>Команда message</b>`)
            break
        case "/convert":
            await ctx.replyWithHTML(`<b>Команда convert</b>`)//Из общей в интесивe
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
        case "/i20":
            await ctx.replyWithHTML(`<b>Команда i20</b>`)
            // await sendUsersIntensive2_0(ctx, alex)
            await sendUsersIntensive2_0(ctx, checkFile)
            break
        case "/i20_14":
            await ctx.replyWithHTML(`<b>Команда i20_14</b>`)
            await sendUsersIntensive2_0_14(ctx, checkFile)
            // await sendUsersIntensive2_0(ctx, checkFile)
            break
        case "Дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        case "дружба":
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
            await ctx.replyWithHTML(`<b>Спасибо</b>`)
            break
        default:
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQtjx4Mrk8muB2BSyhVHqSko2ZZrQgACzBgAAntYUEmwTZrmztcawi0E')
            await ctx.replyWithHTML(`<b>Непонятная команда\n Повторите, пожалуйста, ввод. </b>`)
    }
}
exports.mainCheckAdmin = async (ctx) => {
    const isAdmin = await checkUserAdmin(ctx.message.from);
    if (isAdmin) {
        await nextStep(ctx)
    } else {
        switch (ctx.message.text) {
            case "Дружба":
                await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
                await ctx.replyWithHTML(`<b>Спасибо</b>`)
                break
            case "дружба":
                await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHUQljx4G5gd7Xn9qG7_HilIy-1YYXQgACCh0AAsGoIEkIjTf-YvDReC0E')
                await ctx.replyWithHTML(`<b>Спасибо</b>`)
                break
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

async function transmitterOneToMore(ctx, array, message, userId) {
    console.log("array.length -- ", array.length)
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

async function calculateAllIndexOfLink(fullWeek){
    const today = new Date();
    const dayOfWeek = today.getUTCDay();
    // "id": "01-03",
    let indexLink = null
    if (fullWeek <= 9) {
        indexLink = "0" + fullWeek + "-04"//"-0" + dayOfWeek
    } else {
        indexLink = fullWeek + "-04"// "-0" + dayOfWeek
    }
    console.log(indexLink)
    return indexLink
}


async function calculateLinkForSending(fullWeek, array) {
    let indexLink = await calculateAllIndexOfLink(fullWeek)
    let object =  array.find(obj => obj.id === indexLink)
    console.log('object ----', object)
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
    let diffDays = Math.round(Math.abs((birthdate.getTime() - today.getTime()) / (oneDay)));
    return Math.round(diffDays / 7);
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


async function checkUsersForReal (ctx , arraySend) {
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

async function sendUsersIntensive2_0 (ctx, newArrayIntensive){
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try{
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        if (newArrayIntensive[i].linkSending !== "false") {
                            try {
                                await ctx.telegram.sendMessage(newArrayIntensive[i].chatId, `Доброго времени суток ${newArrayIntensive[i].name}\nРассылка от 18-01-2022.\n ` +
                                    `Вашему ребенку ${newArrayIntensive[i].numberMonth} мес.?\n` +
                                    `Немного дополнительной информации:\n` +
                                    `Общий групповой чат для Интенсива 2023:\n` +
                                    `https://t.me/+QXSTJdjmutw5MTM8\n\n` +
                                    `Куратор группы Анастасия:\n` +
                                    `https://t.me/curator_courses\n\n` +
                                    `Собственно, домашнее задание на сегодня\n` +
                                    `${newArrayIntensive[i].link}\n\n` +
                                    `И последнее, анализ показал, что боты нужно разделить\n` +
                                    `Поэтому прошу Вас подружиться с еще одним ботом. Для этого прошу зайти в него и запустить, нажав пуск\n`+
                                    `https://t.me/helen_root_bot\n` +
                                    `И наберите слово дружба`
                                    
                                )
                                await ctx.replyWithHTML(`${newArrayIntensive[i].name} отправлено`)
                            } catch (error) {
                                if (error.response.error_code === 403) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                }
                                else if (error.response.error_code === 400) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                }
                                else {
                                    console.log (error);
                                }
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                }
                else {
                    console.log (error);
                }
            }

        }, 20000 * i)
    }
    await ctx.replyWithHTML(`Отправка закончена`)
}

async function sendUsersIntensive2_0_14 (ctx, newArrayIntensive){
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try{
                ctx.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        if (newArrayIntensive[i].linkSending !== "false") {
                            try {
                                await ctx.telegram.sendMessage(newArrayIntensive[i].chatId,
                                    `❤️ Повторно ❤️\n` +
                                    `Доброго времени суток ${newArrayIntensive[i].name}\nРассылка от 18-01-2022.\n ` +
                                    `Вашему ребенку ${newArrayIntensive[i].numberMonth} мес.?\n` +
                                    `Немного дополнительной информации:\n` +
                                    `На данном этапе у вас рассылка ДЗ будет 3 раза в неделю, далее нагрузка будет увеличиваться.\n` +
                                    `Если Вам этого недостаточно или оно вам сложно, то Вы может взять еще ДЗ в разделе ДЗ в чат боте или в Web-приложении\n` +
                                    `Общий групповой чат для Интенсива 2023:\n` +
                                    `https://t.me/+QXSTJdjmutw5MTM8\n\n` +
                                    `Куратор группы Анастасия:\n` +
                                    `https://t.me/curator_courses\n\n` +
                                    `Собственно, домашнее задание на сегодня\n` +
                                    `${newArrayIntensive[i].link}\n\n` +
                                    `И последнее, анализ показал, что боты нужно разделить\n` +
                                    `Поэтому прошу Вас подружиться с еще одним ботом. Для этого прошу зайти в него и запустить, нажав пуск\n`+
                                    `https://t.me/helen_root_bot\n` +
                                    `И наберите слово дружба`

                                )
                                await ctx.replyWithHTML(`${newArrayIntensive[i].name} отправлено`)
                            } catch (error) {
                                if (error.response.error_code === 403) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                }
                                else if (error.response.error_code === 400) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                }
                                else {
                                    console.log (error);
                                }
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                }
                else {
                    console.log (error);
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
            try{
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
                                }
                                else if (error.response.error_code === 400) {
                                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                                }
                                else {
                                    console.log (error);
                                }
                            }
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                }
                else {
                    console.log (error);
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
        if (fullWeek > 56 || fullWeek < 3 ) {
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
    const oldArray = await callDb.findAll()
    const newArray = oldArray.map(({
                                       dataValues: {
                                           real_name_telegram,
                                           first_name_telegram,
                                           chatId,
                                           baby_name_telegram,
                                           birthday_telegram,
                                           email_telegram
                                       }
                                   }) => {
        return {
            name: real_name_telegram,
            chatId: chatId,
            babyName: baby_name_telegram,
            birthdayBaby: birthday_telegram,
            email: email_telegram,
            first_name_telegram: first_name_telegram,
        }
    });
    for (let i = 0; i < newArray.length; i++) {
        const user = await callDb.checkUserForIntensive(newArray[i].chatId)
        if (user) {
            console.log("найден ---")
        } else {
            console.log(" не найден ---")
            await callDb.createUserForIntensive(newArray[i])
        }
    }
    // console.log(newArray)
}

async function createListOFSending (ctx, arraySend) {  //command is list
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
                indexVideo: linkVideo.index,
                link: linkVideo.link,
                indexWeek: linkVideo.id,
                chatId: newData[i].dataValues.chatId,
                name: newData[i].dataValues.real_name_telegram,
                birthday: newData[i].dataValues.birthday_telegram,
            })
        }
    }
    await ctx.replyWithHTML(` готово `)
    console.log("newData ---", data)
}

exports.checkUserHelen = (data) => {
    return new Promise((resolve, reject) => {
        callDb.findOneHelen(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    console.log("idCheck ----",idCheck, "Пользователь найден")
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