const {Scenes: {BaseScene}, Markup} = require('telegraf');
const {getClose, getWatch} = require("../lib/keyboards");
const callDb = require("../controllers/tutorial.controller")
const homeworks_0_12 = require("../lib/dataHomeworks_0_12");

class HomeSendGenerator {
    GenHomeScene() {
        const scheme = {
            0: "-0-2-",
            1: "-0-2-",
            2: "-0-2-",
            3: "-3-4-",
            4: "-3-4-",
            5: "-5-6-",
            6: "-5-6-",
            7: "-7-8-",
            8: "-7-8-",
            9: "-9-10-",
            10: "-9-10",
            11: "-11-13-",
            12: "-11-13-",
            13: "-11-13-",
            14: "-14-18-",
            15: "-14-18-",
            16: "-14-18-",
            17: "-14-18-",
            18: "-14-18-",
            19: "-19-24-",
            20: "-19-24-",
            21: "-19-24-",
            22: "-19-24-",
            23: "-19-24-",
            24: "-19-24-"
        }
        const kind = ['mov', 'spk', 'emo']



        function gatDataFromDb() {
            return callDb.searchSend().then(dataFromDb => {
                return Promise.all(dataFromDb.map(item => {
                    return calcMonth(item.dataValues.birthday_telegram)
                        .then(numberMonth => {
                            return {
                                numberMonth,
                                chatId: item.dataValues.chatId,
                                name: item.dataValues.real_name_telegram,
                                birthday: item.dataValues.birthday_telegram
                            }
                        })
                }))
            })
        }

        async function findLink(kind, scheme) {
            const index = kind + scheme + 1
            console.log('index = kind +  scheme ------', index)
            let object = homeworks_0_12.find(obj => obj.id === index)
            return object.link
        }

        // async function gatDataForSend() {
        //     const newData = await callDb.searchSend();
        //     const data = []
        //     for (let i = 0; i < newData.length; i++) {
        //         const fullMonth = await calcMonth(newData[i].dataValues.birthday_telegram)
        //         for (let j = 0; j < kind.length; j++) {
        //             data.push({
        //                 numberMonth: fullMonth,
        //                 chatId: newData[i].dataValues.chatId,
        //                 name: newData[i].dataValues.real_name_telegram,
        //                 birthday: newData[i].dataValues.birthday_telegram,
        //                 marker: `${kind[j]}${scheme[fullMonth]}`,
        //                 indexVideo: await findLink(kind[j], scheme[fullMonth])
        //             })
        //         }
        //     }
        //     console.log(data)
        //     return data
        // }

        const home = new BaseScene('home')
        home.enter(async (ctx) => {
                // const array = await gatDataFromDb()
                const array = await gatDataForSend()
                for (let i = 0; i < array.length; i++) {
                    ctx.telegram.getChatMember(array[i].chatId, array[i].chatId).then(async (chatMember) => {
                        // console.log("chatMember ----", chatMember.status)
                        if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                            console.log('User is not available')
                        } else {
                            console.log(array[i])
                            await ctx.replyWithHTML(
                                `<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n Все отправлено`)
                            await ctx.telegram.sendMessage(array[i].chatId, `Привет ${array[i].name}\n Тестовая рассылка.\n` +
                                `Вашему ребенку ${array[i].numberMonth} мес.\n` +
                                `${array[i].indexVideo}`
                            )
                        }
                    })

                }
            }
        )
        return home
    }
}

module.exports = HomeSendGenerator