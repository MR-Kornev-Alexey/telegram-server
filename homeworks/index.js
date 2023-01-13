const homeworks_0_12 = require("../lib/dataHomeworks_0_12")
const callDb = require("../controllers/tutorial.controller")
const isEmpty = require("../lib/isEmpty")
const {getClose, getWatch} = require("../lib/keyboards");

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
                ],
                [   {text: "Закрыть", callback_data: "close" }
                ]
            ]
        },
        parse_mode: "markdown"
    }
}


async function startHomeworkMenu(ctx) {
    let startMessage = `ДОМАШНИЕ ЗАДАНИЯ\n выберите раздел`;
    await ctx.telegram.sendMessage(ctx.chat.id, startMessage, await keyStart()
    )
}



async function returnHomeworkMenu (ctx) {
    const msg = ctx.update.callback_query.message
    let editedMessage = `ДОМАШНИЕ ЗАДАНИЯ\n выберите раздел`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage,await keyStart()
        )
}

async function createList(input) {
    let buttons = [];
    const letters = ['01','02','03','04','05','06','07','08','09','10','11','12']
    const  menu = input.substring(0, 3)
    for (let i = 0; i <= 10; i += 2) {
        buttons.push([
            {text: `Задание номер ${i+1}`, callback_data: `${letters[i]}-` + input + `-link`},
            {text: `Задание номер ${i + 2 }`, callback_data: `${letters[i+1]}-` + input + `-link`}
        ]);
    }
    buttons.push(
        [
            {text: "Вернуться назад", callback_data: menu +'_menu'}
        ]
    )
    buttons.push(
        [
            {text: "Закрыть", callback_data: 'close'}
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
   const name = [
        'от 0 до 2 мес.',
        'от 3 до 4 мес.',
        'от 5 до 6 мес.',
        'от 7 до 8 мес.',
        'от 9 до 10 мес.',
        'от 11 до 13 мес.',
        'от 14 до 18 мес.',
        'от 19 до 24 мес.',
        'от 24 до 30 мес.'
    ]
    const numbers = [
        '-00-02',
        '-03-04',
        '-05-06',
        '-07-08',
        '-09-10',
        '-11-13',
        '-14-18',
        '-19-24',
        '-24-30'
    ]
    for (let i = 0; i < 8; i += 2) {
        buttons.push([
            {text: name[i], callback_data: input + numbers[i]},
            {text: name[i+1], callback_data: input + numbers[i+1]}
        ]);
    }
    buttons.push(
        [
            {text: "от 25 до 30 мес.", callback_data: input  + '-25-30'}
        ]
    )
    buttons.push(
        [
            {text: "Вернуться назад", callback_data: 'start'}
        ]
    )
    buttons.push(
        [
            {text: "Закрыть", callback_data: 'close'}
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
    const months = {
        '-00-02' : 'от 0 до 2 мес.',
        '-03-04' : 'от 3 до 4 мес.',
        '-05-06' : 'от 5 до 6 мес.',
        '-07-08' : 'от 7 до 8 мес.',
        '-09-10' : 'от 7 до 10 мес.',
        '-11-13' : 'от 11 до 13 мес.',
        '-14-18' : 'от 14 до 18 мес.',
        '-19-24' : 'от 19 до 24 мес.',
        '-25-30' : 'от 25 до 30 мес.',
    }
    if (Object.keys(months).includes(add1)) {
        // console.log(`The value for key "${add1}" is "${months[add1]}"`);
        // console.log(months[add1])
        return months[add1]
    } else {
        // console.log(`Key "${add1}" was not found in the object`);
        return ""
    }

}


async function createTittle(name) {
    const menu = name.substring(0,3)
    const add = await searchAdd(name)
    // console.log(menu)
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

async function homeworksList(ctx,newId) {
    const msg = ctx.update.callback_query.message
     await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, await createTittle(newId), await createList(newId)
    )
}

async function actionHomeworkMenuMove(ctx) {
    const msg = ctx.update.callback_query.message
    let editedMessage = `Двигательная активность`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('mov')
    )
}
async function actionHomeworkMenuEmo(ctx) {
    const msg = ctx.update.callback_query.message
    let editedMessage = `Эмоциональное развитие`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('emo')

        )
}
async function actionHomeworkMenuSpeak(ctx) {
    const msg = ctx.update.callback_query.message
    let editedMessage = `Речевое  развитие`;
    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await createMenu('spk')

        )
}
async function actionGetOneHomework(id) {
    console.log("index  of homeworks",id)
    const kind = id.substring(3, 6)
    // console.log('kind --- in one ---- ', kind);
    const number = id.substring(0, 2)
    // console.log('number --- in one ---- ', number);
    const homework = id.substring(7,12)
    // console.log('homework --- in one ---- ', homework);
    const homework1 = id.substring(7,9)
    // console.log('homework1 --- in one ---- ', +homework1);
    const homework2 = id.substring(10, 12)
    // console.log('homework2 --- in one ---- ', +homework2);
    const newIndex = kind + '-' + +homework1 + '-' + +homework2 + '-'+ +number
    if(homework === '25-30' ){
        return "Домашние задания для этого возраста в процессе..."
    }else {
        let emo_object = homeworks_0_12.find(obj => obj.id === newIndex);
        if (emo_object){
            return emo_object.link
        }else {
            return "Ошибка поиска. Обратитесь, пожалуйста в службу поддержки "
        }
    }
}

async function finishSent (data,link){
    if (!data){
       return link
    } else {
        return '❤️Вы это видео уже смотрели❤️\n' + link
    }
}
module.exports = {
    startHomeworkMenu,
    actionHomeworkMenuMove,
    actionHomeworkMenuEmo,
    actionHomeworkMenuSpeak,
    returnHomeworkMenu,
    homeworksList,
    actionGetOneHomework,
    finishSent
};