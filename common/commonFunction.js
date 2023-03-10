const callDb = require("../controllers/tutorial.controller");
const {getService} = require("../lib/keyboards");

exports.checkUser = (data) => {
    return new Promise((resolve, reject) => {
        callDb.findOne(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    // console.log("Пользователь найден")
                    resolve(true); //Пользователь найден
                } else {
                    // console.log("Пользователь не найден")
                    callDb.create(data);
                    resolve(false); //Пользователь не найден
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}

let buttonServiceNewPressed = false;
exports.getServiceNew = async (ctx, dataUser) => {
    try {
        if (!buttonServiceNewPressed) {
            buttonServiceNewPressed = true;
            try {
                const user = await callDb.getOneUser(dataUser)
                console.log(user)
                if (!user.access_all) {
                    await ctx.reply(
                   `У Вас временно закрыт доступ к сервисам БОТа\nСкоро мы их откроем - наберитесь терпения.\nЕсли в течение часа мы не откроем - напишите в Службу поддержки.\n
                    Но прежде чем отправить сообщение, перегрузите, пожалуйста БОТ командой \/start\n https://t.me/mrk_service`,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {
                                            "text": "Закрыть",
                                            "callback_data": "close_service"
                                        }
                                    ]
                                ]
                            }
                        })
                } else {
                    await ctx.reply(
                        `Вы можете выбрать сервис, нажав на соответсвующую кнопку`,
                        await getService(user)
                    )
                }
            } catch (e) {
                console.log(e)
            } finally {
                buttonServiceNewPressed = false;
            }
        }
    } catch (e) {
        console.log(e)
    }
    //ctx.message.from.id


}
exports.sendServiceNewUser = async (ctx, dataUser) => {
    const user = await callDb.getOneUser(dataUser)
    console.log(user)
    try {
        await ctx.telegram.sendMessage(1081994928, `Новая регистрация или изменение данных\n Пользователь ${user.real_name_telegram}\nid-${user.chatId}-id`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                "text": "Открыть доступ к ЧатБоту по сну",
                                "callback_data": "open_dream_new_user"
                            }
                        ]
                    ]
                }
            })
        await ctx.telegram.sendMessage(5749279828, `Новая регистрация или изменение данных\n Пользователь ${user.real_name_telegram}\nid-${user.chatId}-id`,
            {
                reply_markup: {
                    inline_keyboard: [
                        [
                            {
                                "text": "Открыть доступ к ЧатБоту по сну",
                                "callback_data": "open_dream_new_user"
                            }
                        ]
                    ]
                }
            })
        // await ctx.telegram.sendMessage(user.chatId, `${user.real_name_telegram}\nВам доступ открыт.\nПерегрузите, пожалуйста БОТ командой \/start`)
    } catch (e) {
        console.log(e)
    }
}
exports.calcNowDate = async () => {
    try {
        const allMonths = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"]
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();
        return day + " " + allMonths[month] + " " + year + " года"
    } catch (e) {
        console.log(e)
    }

}