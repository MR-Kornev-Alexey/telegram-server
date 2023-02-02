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
exports.getServiceNew = async (ctx, dataUser) => {
    //ctx.message.from.id
    const user = await callDb.getOneUser(dataUser)
    console.log(user)
    if (!user.access_all) {
        await ctx.reply(
            `У Вас временно закрыт доступ к сервисам БОТа\nСкоро мы их откроем, наберитесь терпения.\nЕсли в течение часа мы не откроем - напишите в Службу поддержки\n
            Но прежде чем отправить сообщение, перегрузите, пожалуйста БОТ\nhttps://t.me/mrk_service`,
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
}
exports.sendServiceNewUser = async (ctx, dataUser) => {
    const user = await callDb.getOneUser(dataUser)
    console.log(user)
    await ctx.telegram.sendMessage( 1081994928, `Новая регистрация или изменение данных\n Пользователь ${user.real_name_telegram}`)
}