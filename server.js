const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Telegraf, Markup, Scenes, session} = require('telegraf')
// const environment = process.env.NODE_ENV || 'development';
// const config = require(`./token/config.${environment}.json`);
// const bot = new Telegraf(config.token);
// "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_dev = "5858592661:AAGdzbUERIMeXsAANjKkONyCZDk56TDnON0"// test bot
// const token_dev = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" // main bot
const bot = new Telegraf(token_dev);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const token_helen = "5815175979:AAGXqlzqxeq9LCigysbmxrqmhVrsD76LGos" //helen_bot
// const token_helen = "5739415913:AAG0e8F6BtVEFHusoIRix8wvkKN23RZpcsc" //main_bot
const helen = new Telegraf(token_helen);
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
const {createStore} = require('redux');
const SceneGenerator = require('./scenes/Scenes')
const HomeworksGenerator = require('./scenes/Homeworks')
const HomeSendGenerator = require('./scenes/Send')
const curScene = new SceneGenerator()
const homeScene = new HomeworksGenerator()
const sendScene = new HomeSendGenerator()
const sendingHome = sendScene.GenHomeScene()
const startScene = homeScene.GenStartScene()
const ageScene = curScene.GenAgeScene()
const nameScene = curScene.GenNameScene()
const babyScene = curScene.GenBabyScene()
const emailScene = curScene.GenEmailScene()
const callDb = require("./controllers/tutorial.controller")
const diffTime = require("./common/differentMonths")
const {sendHelp, sendHelpHelen} = require("./lib/help")
const {getClose} = require('./lib/keyboards')
const HelenFunction = require('./helenFunction/function')

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


const checkScene = curScene.GenCheckScene(store, function (id) {
    callDb.updateUser(id, store.getState().data).then(result => {
        if (result === 123) {
            bot.telegram.sendMessage(id, `Успешное обновление`).then(r => {
            })
            bot.telegram.sendSticker(id, 'CAACAgIAAxkBAAEHK4pjuoKkGSffpgZH7FAMCxqOvdItxgACCh0AAsGoIEkIjTf-YvDReC0E').then(r => {
            })
        } else {
            bot.telegram.sendMessage(id, `Ошибка записи. Пожалуйста, повторите обновление данных`).then(r => {
            })
        }

    })
});


const stage = new Scenes.Stage([ageScene, nameScene, babyScene, checkScene, emailScene, startScene, sendingHome])
bot.use(session())
bot.use(stage.middleware())

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

bot.start(async (ctx) => {
    await checkUser(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы можете проверить свои данные, нажав на "Проверить данные" в меню`,
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПройдите,пожалуйста процедуру регистрации, нажав "Регистрация ребенка" в меню`,
            )
        }
    }).catch(e => {
        console.log(e)
    })

})


helen.start(async (ctx) => {
    await HelenFunction.checkUserHelen(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы уже подружились со мной.\nЖдите ДЗ согласно графику.`,
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПодружитесь, пожалуйста со мной, отправив мне слово дружба`,
            )
        }
    }).catch(e => {
        console.log(e)
    })
})

helen.on('message', async (ctx) => {
    // console.log(ctx.message)
    switch (ctx.message.text) {
        case '/support':
            ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\nhttps://t.me/mrk_service`)
            break
        case '/help':
            await ctx.replyWithHTML(helpHelen.help)
            await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHLnBju3AHWWk_-r_jjHgXlXAl16HJugACwxMAAm3oEEqGY8B94dy6NC0E')
            break
        default :
            await HelenFunction.mainCheckAdmin(ctx)
    }
})

helen.start(async (ctx) => {
    checkUser(ctx.message.from).then(async (result) => {
        if (result) {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nВы можете проверить свои данные, нажав на "Проверить данные" в меню`,
            )
        } else {
            await ctx.replyWithHTML(
                `<b>Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\nПройдите,пожалуйста процедуру регистрации, нажав "Регистрация ребенка" в меню`,
            )
        }
    }).catch(e => {
        console.log(e)
    })

})


async function checkAndReply(ctx) {
    checkUser(ctx.message.from)
        .then(async (result) => {
            if (result) {
                callDb.getOne(ctx.message.from).then(async (result) => {
                        // console.log('result -- ');
                        // console.log(result);
                        await ctx.replyWithHTML(
                            `<b>${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!</b>\n` +
                            `<b>Ваши данные:</b>\n` +
                            `<b>Имя ребенка</b> - ${result.baby_name_telegram}\n` +
                            `<b>Дата рождения ребенка</b> - ${result.birthday_telegram}\n` +
                            `<b>Число полных месяцев</b> - ${diffTime.calculating(result.birthday_telegram)}\n` +
                            `<b>Ваши Имя и Фамилия</b> - ${result.real_name_telegram}\n` +
                            `<b>Ваш емейл</b> - ${result.email_telegram}`,
                            Markup.inlineKeyboard([
                                [Markup.button.callback("Верно", "right"), Markup.button.callback("Изменить", "update")]
                            ])
                        )
//++++++++++++++++++++++++++++++++++++++
                        bot.on('callback_query', async (callbackQuery) => {
                            // console.log('callback_query event', callbackQuery);
                            const action = callbackQuery.update.callback_query.data;
                            // console.log('callback_query data ---- ', callbackQuery.from.id);
                            const userId = callbackQuery.from.id;
                            const ctx = callbackQuery;
                            if (action === 'right') {
                                // console.log('right action -- ' + result.chatId);
                                await ctx.answerCbQuery();
                                await ctx.telegram.sendSticker(userId, 'CAACAgIAAxkBAAEHK09julSXNlyU_2jfoNEsGktOpMn6rQACsAEAAhZCawpyXcYrBVvoaC0E')
                            } else if (action === 'update') {
                                // console.log('update action');
                                await ctx.answerCbQuery();
                                await ctx.telegram.sendMessage(userId, `Пойдем обновлять данные`)
                                await ctx.scene.enter('baby');
                            }
                        });
//=====================================
                    }
                )

            } else {
                await ctx.scene.enter('baby');
            }
        }).catch(e => {
        console.log(e)
    })
}


bot.command('support', async (ctx) => ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`
))
bot.command('registration', async (ctx) => {
    await checkAndReply(ctx);
});

bot.command('check', async (ctx) => {
    await checkAndReply(ctx);
});
bot.command('homeworks', async ctx => {
    await ctx.scene.enter('start');
});
bot.command('new', async ctx => {
    await ctx.scene.enter('home');
});

bot.command('support', async (ctx) => ctx.replyWithHTML(`Вы можете написать в Службу поддержки Бота\n https://t.me/mrk_service`,
    await getClose()
))

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({message: "Welcome! Alexey! Node"});
});

const db = require("./models");
const helpHelen = require("./common/helpHelen");

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
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));
process.once('SIGINT', () => helen.stop('SIGINT'));
process.once('SIGTERM', () => helen.stop('SIGTERM'));
//============================================================================

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
