const {Markup} = require('telegraf')
async function getMainMenu() {
    return Markup.keyboard([
        ['Поддержка']
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
    getClose
};