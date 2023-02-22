const {Markup} = require('telegraf')
const callDb = require("../controllers/tutorial.controller");
async function getMainMenu() {
    return Markup.keyboard([
        ['⌛ Домашние задания', '🌒 Работа со сном'],
        ['✉️  Рассылка', '✏ Поддержка']
    ]).oneTime().resize()
}
async function getMainMenuFirst() {
    return Markup.keyboard([
        ['🌒 Работа со сном', '✏ Поддержка'],
        ['❔️  Помощь', '👶 Ваши данные' ]
    ]).oneTime().resize()
}
async function getMainMenuDream() {
    return Markup.keyboard([
        ['️1️⃣ методика', '️2️⃣ методика'],
        ['️3️⃣ методика', '️4️⃣ методика']
    ]).oneTime().resize()
}
async function getClose() {
    return    {
        "reply_markup": {
            "inline_keyboard": [
                [
                    {
                        "text": "Закрыть",
                        "callback_data": "close"
                    }
                ]
            ]
        }
}
}
async function getService(user) {
    let button = []
    try {
         if (user.assess_homeworks) {
            button.push(
                [
                    {
                        "text": "Домашние задания",
                        "callback_data": "homeworks_button"
                    }
                ],
                [
                    {
                        "text": "Рассылка",
                        "callback_data": "sending_button"
                    }
                ]
            )
        }
        if (user. access_dream) {
            button.push(
                [
                    {
                        "text": "Работа со сном",
                        "callback_data": "dream_button"
                    }
                ]
            )
        }
        if (user. access_webinars) {
            button.push(
                [
                    {
                        "text": "Вебинары по развитию",
                        "callback_data": "webinar_button"
                    }
                ]
            )
        }
        button.push(
            [
                {
                    "text": "Закрыть",
                    "callback_data": "close_service"
                }
            ]
        )
        return    {
            reply_markup: {
                inline_keyboard: button
            }
        }
    }catch (e) {
       console.log(e)
    }
    // console.log(user)

}

async function getWatch(result) {
    if(!result){
        return    {
            "reply_markup": {
                "inline_keyboard": [
                    [
                        {
                            "text": "Отметить как просмотренное",
                            "callback_data": "watch"
                        }
                    ],
                    [
                        {
                            "text": "Закрыть",
                            "callback_data": "close_video"
                        }
                    ]
                ]
            }
        }

    } else {
        return    {
            "reply_markup": {
                "inline_keyboard": [
                      [
                        {
                            "text": "Закрыть",
                            "callback_data": "close_video"
                        }
                    ]
                ]
            }
        }
    }

}
module.exports = {
    getWatch,
    getClose,
    getMainMenu,
    getMainMenuDream,
    getMainMenuFirst,
    getService
};