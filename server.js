const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Telegraf, Markup, Scenes, session} = require('telegraf')
const cron = require('node-cron');
const HelenFunction = require('./helenFunction/function')
// const environment = process.env.NODE_ENV || 'development';
// const config = require(`./token/config.${environment}.json`);
// const bot = new Telegraf(config.token);
// "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_dream = "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"// dream bot
const token_dev = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" // main bot
const token_super = "5810660881:AAEtp2JduLoeBpiHBXDCfJKKbSWw3fiArVU" // superHelen bot
const bot = new Telegraf(token_dev);
const dream = new Telegraf(token_dream);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_helen = "5815175979:AAGXqlzqxeq9LCigysbmxrqmhVrsD76LGos" //helen_bot
// const token_helen = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" //main_bot
const helenFunction = require('./helenFunction/function');
const getCommon = require('./common/commonFunction')
const sendUsersNew = require('./common/SentUser');
const sendAfter57 = require('./common/SentUserAfter57')
const sendAfter57_2 = require('./common/SentUserAfter57_2')
const setNewWeek = require('./common/SetNewWeek')
const sendDreamBot = require('./common/SentAllUserDreamBot')
const helen = new Telegraf(token_super);

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
const EmoSceneGenerator = require('./scenes/EmoCourse')
const EmoSceneCommon = new EmoSceneGenerator()
const emoScene = EmoSceneCommon.GenEmoScene()
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const LookHomeworkSceneGenerator = require('./scenes/LookHomeworks')
const lookSceneCommon = new LookHomeworkSceneGenerator()
const lookScene = lookSceneCommon.GenLookScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const ScanHomeworkSceneGenerator = require('./scenes/ScanHomeworksScenes')
const scanHomeScene =  new ScanHomeworkSceneGenerator()
const sendingHome = sendScene.GenHomeScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const webinarWebinarSceneGenerator = require('./scenes/LookWebinars')
const webinarScene =  new webinarWebinarSceneGenerator()
const lookWebinar= webinarScene.GenWebinarScene()
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const startScene = homeScene.GenStartScene()
const scanScene = scanHomeScene.GenScanScene()
const callDb = require("./controllers/tutorial.controller")
const {sendHelp} = require("./lib/help")
const {getClose , getMainMenu, getMainMenuFirst, getService} = require('./lib/keyboards')


//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// cron.schedule('0 6 * * 1', async () => {
//     await setNewWeek(helen)
// });
// cron.schedule('15 6 * * 1-5', async () => {
//     await sendUsersNew(helen)
// });
// cron.schedule('50 6 * * 1-5', async () => {
//     await sendAfter57_2(helen)
// });
// sendUsersNew(helen).then( r =>{})
// setNewWeek(helen).then(r => {})
// cron.schedule('0 7 * * 1-5', async () => {
//     await sendAfter57(helen)
// });

// sendAfter57(helen).then(r => {})
// cron.schedule('*/20 * * * *', () => {
//     helen.telegram.sendMessage(1081994928, `Running task every 20 min`).then(r => {})
// });
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// sendUsersNew(helen).then(r => {})

function dataReducer(state = {data: []}, action) {
    switch (action.type) {
        case 'ADD_DATA':
            return {...state, data: [...state.data, action.payload]};
        default:
            return state;
    }
}
const store = createStore(dataReducer);

const stage = new Scenes.Stage([ageScene,
    nameScene, babyScene, checkScene, emailScene,
    startScene, sendingHome, locationScene, babyEditScene,
    ageEditScene, nameEditScene, emailEditScene, locationEditScene, scanScene, lookScene, dreamStartScene, dreamBeginScene, lookWebinar, emoScene])
bot.use(session())
bot.use(stage.middleware())
dream.use(session())
dream.use(stage.middleware())
helen.use(session())
helen.use(stage.middleware())



async function checkUser(data) {
    return new Promise((resolve, reject) => {
        callDb.findOne(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    // console.log("???????????????????????? ????????????")
                    resolve(true); //???????????????????????? ????????????
                } else {
                    // console.log("???????????????????????? ???? ????????????")
                    callDb.create(data);
                    resolve(false); //???????????????????????? ???? ????????????
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}


bot.start(async (ctx) => {
    try{
        await checkUser(ctx.message.from).then(async (result) => {
            if (result) {
                await getCommon.getServiceNew(ctx, ctx.message.from.id)
            } else {
                await ctx.replyWithHTML(
                    `<b>???????????? ???????? ${ctx.message.from.first_name ? ctx.message.from.first_name : '????????????????????'}!</b>\n???????????????????? ?????? ?? Helen Bot.\n ?????? ???????????????????????????? ???????????? ?????????? ?????? ???????????? ??????????????????????.`,
                    {
                        reply_markup: {
                            inline_keyboard: [
                                [
                                    { text: '??????????????????????', callback_data: 'data_reg' }
                                ]
                            ]
                        }
                    }
                )
            }
        }).catch(e => {
            console.log(e)
        })
    }catch (e) {
        console.log(e)
    }
})
bot.action('data_reg', async (ctx) => {
    try {
        await ctx.scene.enter('baby');
    }catch (e) {
        console.log(e)
    }
});

bot.action('close_service', async (ctx) => {
    const chatId = ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    if (chatId) {
        try {
            const messageId = ctx.update.callback_query.message.message_id
            await ctx.telegram.deleteMessage(chatId, messageId)
        }catch (e) {
            console.log(e)
        }
    } else {}
});

bot.action('homeworks_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    if (user) {
        try {
            await ctx.scene.enter('start', { user });
        }catch (e) {
            console.log(e)
        }
    } else {}
});
bot.action('webinar_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    if (user) {
        try {
            await ctx.scene.enter('webinar', { user });
        }catch (e) {
            console.log(e)
        }
    } else {}
});
bot.action('emo_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    if (user) {
        try {
            await ctx.scene.enter('emo', { user });
        }catch (e) {
            console.log(e)
        }
    } else {}
});
bot.action('sending_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    if (user) {
        try {
            await ctx.scene.enter('scan', { user });
        }catch (e) {
            console.log(e)
        }
    } else {}
});
bot.action('dream_button', async (ctx) => {
    const user =  ctx.update.callback_query.from.id
    ctx.answerCbQuery()
    console.log(user)
    if (user) {
        try {
            await ctx.scene.enter('dream_begin', { user });
        }catch (e) {
            console.log(e)
        }
    } else {}
});

bot.action('open_dream_new_user', async (ctx) => {
    const text =  ctx.update.callback_query.message.text
    ctx.answerCbQuery()
    if (text) {
        try {
            const startIndex = text.indexOf("id-") + 3;
            const endIndex = text.indexOf("-id");
            const chatId = text.substring(startIndex, endIndex);
            await HelenFunction.openDreamNewUser(ctx, chatId)
            await ctx.telegram.sendMessage(chatId, `?????? ???????????? ????????????.\n ??????????????????????, ???????????????????? ?????? ???????????????? \/start`)
        }catch (e) {
            console.log(e)
        }
    } else {}
});



bot.command('check', async (ctx) => {
    await ctx.scene.enter('check');
});
bot.command('send_dream', async (ctx) => {
    await sendDreamBot.sendUsersDreamBotJSON(ctx)
});
bot.command('service', async (ctx) => {
     await getCommon.getServiceNew(ctx, ctx.message.from.id)
});
bot.command('homeworks', async ctx => {
    const user =  ctx.message.from.id
    await ctx.scene.enter('start', { user });
    // await ctx.scene.enter('start');
});
bot.hears('??? ???????????????? ??????????????', async ctx => {
    await ctx.scene.enter('start');
});

bot.hears('???? ???????????? ???? ????????', async ctx => {
    ctx.reply(`???????????? ?? ?????????????????? ??????` )
    // await ctx.scene.enter('dream_start');
});
bot.hears('??????  ????????????????', async ctx => {
      await ctx.scene.enter('scan');
});

bot.command('support', async (ctx) => ctx.reply(`???? ???????????? ???????????????? ?? ???????????? ?????????????????? ????????\n https://t.me/mrk_service`,
    await getClose()
))

bot.hears('??? ??????????????????', async (ctx) => ctx.reply(`???? ???????????? ???????????????? ?? ???????????? ?????????????????? ????????\n https://t.me/mrk_service`
))

dream.start(async (ctx) => {
    await checkUser(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>???????????? ???????? ${ctx.message.from.first_name ? ctx.message.from.first_name : '????????????????????'}!</b>\n???? ???????????? ?????????????????? ???????? ????????????, ?????????? ???? "?????????????????? ????????????" ?? ????????`, await getMainMenu()
            )
        } else {
            await ctx.replyWithHTML(
                `<b>???????????? ???????? ${ctx.message.from.first_name ? ctx.message.from.first_name : '????????????????????'}!</b>\n???????????????????? ?????? ?? Helen Bot.\n ?????? ???????????????????????????? ???????????? ?????????? ?????? ???????????? ??????????????????????.`,
                {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                { text: '??????????????????????', callback_data: 'data_reg' }
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

dream.action('data_reg', async (ctx) => {
    await ctx.scene.enter('baby');
});

dream.command('check', async (ctx) => {
    await ctx.scene.enter('check');
});
dream.command('support', async (ctx) => ctx.replyWithHTML(`???? ???????????? ???????????????? ?? ???????????? ?????????????????? ????????\n https://t.me/mrk_service`
))
dream.hears('??? ??????????????????', async (ctx) => ctx.replyWithHTML(`???? ???????????? ???????????????? ?? ???????????? ?????????????????? ????????\n https://t.me/mrk_service`)
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


const app = express();
const loginRouter = require('./admin/loginRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const path = require('path');
const publicAll = path.join(__dirname, './public');
const publicRouter = express.Router();
const adminRouter = express.Router();

publicRouter.get('*', function(req, res) {
    res.sendFile(path.join(publicAll, 'index.html'));
});
// ?????????????? / ????  *
// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'dist', 'index.html'))
// })

adminRouter.use((req, res, next) => {
    if (!req.user) {
        return res.status(401).send('You need to be authenticated to access this page Brother');
    }
    next();
});
adminRouter.get('/', (req, res) => {
    res.send('Welcome to the admin page');
});


app.use(cors({
    origin: "http://localhost:8080"
}));
app.use(express.static(publicAll));
app.use('/public', publicRouter);
app.use('/admin', adminRouter);

app.use((err, req, res, next) => {
    console.error(err)
    const error = process.env.NODE_ENV === 'production' ? 'Sorry, an error has occurred!' : err
    res.status(500).send({ error })
});



// app.use(loginRouter.loginRouter);


const db = require("./models");
const arraySend = require("./lib/send_0_56");

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
