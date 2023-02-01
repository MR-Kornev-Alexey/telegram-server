const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Telegraf, Markup, Scenes, session} = require('telegraf')
// const environment = process.env.NODE_ENV || 'development';
// const config = require(`./token/config.${environment}.json`);
// const bot = new Telegraf(config.token);
// "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_dream = "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"// dream bot
const token_dev = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" // main bot
const bot = new Telegraf(token_dev);
const dream = new Telegraf(token_dream);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_helen = "5815175979:AAGXqlzqxeq9LCigysbmxrqmhVrsD76LGos" //helen_bot
// const token_helen = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" //main_bot
const helen = new Telegraf(token_helen);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const {createStore} = require('redux');

const HomeworksGenerator = require('./scenes/Homeworks')
const HomeSendGenerator = require('./scenes/Send')

const SceneGenerator = require('./scenes/Scenes')
const curScene = new SceneGenerator()
const ageScene = curScene.GenAgeScene()
const ageEditScene = curScene.GenEditAgeScene()
const nameScene = curScene.GenNameScene()
const nameEditScene = curScene.GenEditNameScene()
const babyScene = curScene.GenBabyScene()
const babyEditScene = curScene.GenBabyEditScene()
const emailScene = curScene.GenEmailScene()
const emailEditScene = curScene.GenEditEmailScene()
const locationScene = curScene.GenLocationScene()
const locationEditScene = curScene.GenEditLocationScene()
const checkScene = curScene.GenCheckScene()
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const homeScene = new HomeworksGenerator()
const sendScene = new HomeSendGenerator()
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const dreamStartSceneGenerator = require('./scenes/dreamStart')
const dreamScene = new dreamStartSceneGenerator()
const dreamStartScene = dreamScene.GenDreamStartScene()
const dreamBeginScene = dreamScene.GenDreamBeginScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const LookHomeworkSceneGenerator = require('./scenes/LookHomeworks')
const lookSceneCommon = new LookHomeworkSceneGenerator()
const lookScene = lookSceneCommon.GenLookScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const ScanHomeworkSceneGenerator = require('./scenes/ScanHomeworksScenes')
const scanHomeScene =  new ScanHomeworkSceneGenerator()
const sendingHome = sendScene.GenHomeScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const startScene = homeScene.GenStartScene()
const scanScene = scanHomeScene.GenScanScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const callDb = require("./controllers/tutorial.controller")
const diffTime = require("./common/differentMonths")
const {sendHelp, sendHelpHelen} = require("./lib/help")
const {getClose , getMainMenu, getMainMenuFirst, getService} = require('./lib/keyboards')
const HelenFunction = require('./helenFunction/function')
const dreamFunction = require('./dreamFunction/function')
const getCommon = require('./common/commonFunction')

function dataReducer(state = {data: []}, action) {
    switch (action.type) {
        case 'ADD_DATA':
            return {...state, data: [...state.data, action.payload]};
        default:
            return state;
    }
}

const app = express();
const store = createStore(dataReducer);

const stage = new Scenes.Stage([ageScene,
    nameScene, babyScene, checkScene, emailScene,
    startScene, sendingHome, locationScene, babyEditScene,
    ageEditScene, nameEditScene, emailEditScene, locationEditScene, scanScene, lookScene, dreamStartScene, dreamBeginScene])
bot.use(session())
bot.use(stage.middleware())
dream.use(session())
dream.use(stage.middleware())
helen.use(session())
helen.use(stage.middleware())

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

async function checkUser(data) {
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
//const cron = require('node-cron');
//
// cron.schedule('0 8 * * 1,5', () => {
//   console.log('Running task every Monday and Friday at 8 AM Moscow time');
// });

const cron = require('node-cron');

cron.schedule('*/10 * * * *', () => {
    console.log('Running task every 10 minutes');
});

const updateKeyboard = (newButtons) => {
    return Markup.keyboard(newButtons).oneTime().resize()
}
const regButton = [
    ['⌛ Домашние задания', '🌒 Работа со сном'],
    ['✉️  Рассылка', '🪄 Сервисы'],
    ['❔️ Помощь', '✏ Поддержка' ]
]

const newButtons = [
    ['🪄 Сервисы', '👶 Ваши данные'],
    ['❔️ Помощь', '✏ Поддержка' ]
]

bot.start(async (ctx) => {
    await checkUser(ctx.message.from).then(async (result) => {
        if (result) {
            await getCommon.getServiceNew(ctx, ctx.message.from.id)
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПриветстую Вас в Helen Bot.\n Для функциональной работы прошу Вас пройти регистрацию.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Регистрация', callback_data: 'data_reg' }
                            ]
                        ]
                    }
                }
            )
        }
    }).catch(e => {
        console.log(e)
    })

})
bot.action('data_reg', async (ctx) => {
    await ctx.scene.enter('baby');
});
bot.action('close_service', async (ctx) => {
    const chatId = ctx.update.callback_query.from.id
    const messageId = ctx.update.callback_query.message.message_id
    ctx.answerCbQuery()
    await ctx.telegram.deleteMessage(chatId, messageId)
});

bot.action('homeworks_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    await ctx.scene.enter('start', { user });
});
bot.action('sending_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    await ctx.scene.enter('scan', { user });
});
bot.action('dream_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    await ctx.scene.enter('dream_begin', { user });
});


bot.command('check', async (ctx) => {
    await ctx.scene.enter('check');
});
bot.command('service', async (ctx) => {
     await getCommon.getServiceNew(ctx, ctx.message.from.id)
});
bot.command('homeworks', async ctx => {
    const user =  ctx.message.from.id
    await ctx.scene.enter('start', { user });
    // await ctx.scene.enter('start');
});
bot.hears('⌛ Домашние задания', async ctx => {
    await ctx.scene.enter('start');
});
// bot.hears('look20', async ctx => {
//     await ctx.scene.enter('look');
// });




bot.hears('🌒 Работа со сном', async ctx => {
    ctx.reply(`Доступ к методикам сна` )
    // await ctx.scene.enter('dream_start');
});
bot.hears('✉️  Рассылка', async ctx => {
      await ctx.scene.enter('scan');
});

bot.command('support', async (ctx) => ctx.reply(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`,
    await getClose()
))

bot.hears('✏ Поддержка', async (ctx) => ctx.reply(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`
))

dream.start(async (ctx) => {
    await checkUser(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы можете проверить свои данные, нажав на "Проверить данные" в меню`, await getMainMenu()
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПриветстую вас в Helen Bot.\n Для функциональной работы прошу Вас пройти регистрацию.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: 'Регистрация', callback_data: 'data_reg' }
                            ]
                        ]
                    }
                },
                await getMainMenuFirst())
        }
    }).catch(e => {
        console.log(e)
    })

})
// dream.start(async (ctx) => {
//     await checkUser(ctx.message.from.id).then(async (result) => {
//         if (result) {
//             await ctx.scene.enter('dream_start');
//         } else {
//             await ctx.replyWithHTML(
//                 `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n Для доступа к методикам по сну пройдите,пожалуйста регистрацию`,
//                 {
//                     reply_markup: {
//                         inline_keyboard: [
//                             [
//                                 { text: 'Регистрация', callback_data: 'data_reg' }
//                             ]
//                         ]
//                     }
//                 },
//                 await getMainMenuDream()
//             )
//         }
//     }).catch(e => {
//         console.log(e)
//     })
//
// })

dream.action('data_reg', async (ctx) => {
    await ctx.scene.enter('baby');
});
// dream.action('/dream', async (ctx) => {
//
//     await ctx.scene.enter('dream_start');
// });
// dream.action('close_dream', async ctx => {
//     const chatId = ctx.update.callback_query.from.id
//     const messageId = ctx.update.callback_query.message.message_id
//     ctx.answerCbQuery()
//     await ctx.telegram.deleteMessage(chatId, messageId)
// });
dream.command('check', async (ctx) => {
    await ctx.scene.enter('check');
});
dream.command('support', async (ctx) => ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`
))
dream.hears('✏ Поддержка', async (ctx) => ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`)
)

//++++++++++++++++++++++++++++++++++++++++++++++++++
helen.start(async (ctx) => {
    await HelenFunction.startStep (ctx)
})
helen.on('message', async (ctx) => {
    // console.log(ctx.message)
    await HelenFunction.firstStep(ctx)
})
//+++++++++++++++++++++++++++++++++++++++++++++++++++
// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome! Alexey! Node"});
});
// const path = require('path');
// const public = path.join(__dirname, 'public');
// app.get('/', function(req, res) {
//     res.sendFile(path.join(public, 'index.html'));
// });
//
// app.use('/', express.static(public));


const db = require("./models");
const helpHelen = require("./common/helpHelen");
const {message} = require("telegraf/filters");

db.sequelize.sync()
    .then(() => {
        console.log("Synced db.");
    })
    .catch((err) => {
        console.log("Failed to sync db: " + err.message);
    });


//++++++++++++++++++++++Enable graceful stop+++++++++++++++++++++++++++++++++++
bot.help(sendHelp);
bot.launch();
helen.launch();
dream.launch();
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
process.once('SIGINT', () => helen.stop('SIGINT'));
process.once('SIGTERM', () => helen.stop('SIGTERM'));
process.once('SIGINT', () => dream.stop('SIGINT'));
process.once('SIGTERM', () => dream.stop('SIGTERM'));
//============================================================================

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
