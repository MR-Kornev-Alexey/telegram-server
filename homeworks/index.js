async function keyStart (){
    return  {
        reply_markup: {
            inline_keyboard: [
                [
                    {text: "Двигательная активность", callback_data: 'mov_menu'},
                ],
                [
                    {text: "Речевое развитие", callback_data: 'spk_menu'},
                ],
                [
                    {text: "Эмоциональное развитие", callback_data: 'emo_menu'}
                ]
            ]
        },
        parse_mode: "markdown"
    }
}


async function startHomeworkMenu(ctx) {
    let startMessage = `ДОМАШНИЕ ЗАДАНИЯ\n выберите раздел`;
    await ctx.telegram.sendMessage(ctx.chat.id, startMessage, await keyStart()
    ).then(r => {
    })
}



async function returnHomeworkMenu (ctx) {
    const msg = ctx.update.callback_query.message
    let editedMessage = `ДОМАШНИЕ ЗАДАНИЯ\n выберите раздел`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage,await keyStart()
        )
}

async function createList(input) {
    let buttons = [];
    const  menu = input.substring(0, 4)
    for (let i = 0; i <= 10; i += 2) {
        buttons.push([
            {text: `Задание номер ${i+1}`, callback_data: `link_${i+1}_` + input},
            {text: `Задание номер ${i + 2 }`, callback_data: `link_${i+2}_` + input}
        ]);
    }
    buttons.push(
        [
            {text: "Вернуться назад", callback_data: menu +'menu'}
        ]
    )
    // console.log(buttons)
  return {
        reply_markup: {
            inline_keyboard: buttons
        }
    }
}

async function createMenu(input) {
    let buttons = [];
    let name = [
        'от 0 до 2 мес.',
        'от 3 до 4 мес.',
        'от 5 до 6 мес.',
        'от 7 до 8 мес.',
        'от 9 до 10 мес.',
        'от 11 до 13 мес.',
        'от 14 до 18 мес.',
        'от 18 до 24 мес.',
        'от 24 до 30 мес.'
    ]
    let numbers = [
        '_0_2',
        '_3_4',
        '_5_6',
        '_7_8',
        '_9_10',
        '_11_13',
        '_14_18',
        '_18_24',
        '_24_30'
    ]
    for (let i = 0; i < 8; i += 2) {
        buttons.push([
            {text: name[i], callback_data: input + numbers[i]},
            {text: name[i+1], callback_data: input + numbers[i+1]}
        ]);
    }
    buttons.push(
        [
            {text: "от 24 до 30 мес.", callback_data: input  + '_24_30'}
        ]
    )
    buttons.push(
        [
            {text: "Вернуться назад", callback_data: 'start'}
        ]
    )
    // console.log(buttons)
   return {
        reply_markup: {
            inline_keyboard: buttons
        }
    }
}

async function searchAdd(name) {
    const  add1 = name.substring(3)
    console.log(add1)
    const months = {
        _0_2 : 'от 0 до 2 мес.',
        _3_4 : 'от 3 до 4 мес.',
        _5_6 : 'от 5 до 6 мес.',
        _7_8 : 'от 7 до 8 мес.',
        _9_10 : 'от 7 до 10 мес.',
        _11_13 : 'от 11 до 13 мес.',
        _14_18 : 'от 14 до 18 мес.',
        _18_24 : 'от 18 до 24 мес.',
        _25_30 : 'от 24 до 30 мес.',
    }
    if (Object.keys(months).includes(add1)) {
        console.log(`The value for key "${add1}" is "${months[add1]}"`);
        console.log(months[add1])
        return months[add1]
    } else {
        console.log(`Key "${add1}" was not found in the object`);
        return ""
    }

}


async function createTittle(name) {
    const menu = name.substring(0,3)
    const add = await searchAdd(name)
    console.log(menu)
    switch (menu) {
        case 'mov':
          return 'Двигательная активность ' + add
       case 'emo':
           return 'Эмоциональное развитие ' + add
        case 'spk':
            return 'Речевое развитие ' + add
        default:
            return 'Развитие'
    }
}

async function homeworksList(ctx,input) {
    const msg = ctx.update.callback_query.message
    // console.log('callbackQuery.message --- in move ---- ', msg);
    // let editedMessage = `Двигательная активность`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, await createTittle(input), await createList(input)
    )
}

async function actionHomeworkMenuMove(ctx) {
    const msg = ctx.update.callback_query.message
    // console.log('callbackQuery.message --- in move ---- ', msg);
    let editedMessage = `Двигательная активность`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('mov')
    )
}
async function actionHomeworkMenuEmo(ctx) {
    const msg = ctx.update.callback_query.message
    // console.log('callbackQuery.message --- in move ---- ', msg);
    let editedMessage = `Эмоциональное развитие`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('emo')

        )
}
async function actionHomeworkMenuSpeak(ctx) {
    const msg = ctx.update.callback_query.message
    // console.log('callbackQuery.message --- in move ---- ', msg);
    let editedMessage = `Речевое  развитие`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('spk')

        )
}

module.exports = {
    startHomeworkMenu,
    actionHomeworkMenuMove,
    actionHomeworkMenuEmo,
    actionHomeworkMenuSpeak,
    returnHomeworkMenu,
    homeworksList
};