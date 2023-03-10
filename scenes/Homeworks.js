const {Scenes: {BaseScene}, Markup} = require('telegraf');
const {
    startHomeworkMenu,
    actionHomeworkMenuMove,
    actionHomeworkMenuEmo,
    actionHomeworkMenuSpeak,
    returnHomeworkMenu,
    homeworksList,
    actionGetOneHomework,
    finishSent
} = require('../homeworks/index');
const {getClose, getWatch} = require("../lib/keyboards");

const homeworks_0_12 = require("../lib/dataHomeworks_0_12");
const homeworks_14_30 = require("../lib/dataHomeworksMore");
const callDb = require("../controllers/tutorial.controller")


class HomeworksGenerator {
        GenStartScene() {
        const start = new BaseScene('start')
        start.enter(async (ctx) => {
            const user = ctx.scene.state.user;
            console.log(user)
           await callDb.getOneUser(user)
                .then(async (result) => {
                    // console.log(result)
                    if(result.access_all){
                        await startHomeworkMenu(ctx)
                    } else {
                        await ctx.telegram.sendMessage(result.chatId, 'У вас нет доступа к домашним заданиям.\n' +
                            'Вы можете написать в Службу поддержки\n https://t.me/mrk_service',
                            await getClose()
                        ).then(r => {
                        })
                    }
                }).catch(e => {
                        console.log(e)
                    }
                )

        })
        start.action('mov_menu', async ctx => {
            await ctx.answerCbQuery()
            await actionHomeworkMenuMove(ctx)
        });

        start.action('emo_menu', async ctx => {
            await ctx.answerCbQuery()
            await actionHomeworkMenuEmo(ctx)
        });

        start.action('spk_menu', async ctx => {
            await ctx.answerCbQuery()
            await actionHomeworkMenuSpeak(ctx).then(r => {
            });
        });
        start.action('close', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });

        start.action('close_video', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });

        start.action('start', ctx => {
            returnHomeworkMenu(ctx).then(r => {
            });
        });
        start.action('watch', ctx => {
            const chatId = ctx.update.callback_query.message.chat.id
            const linkID = ctx.update.callback_query.message.text
            // console.log('chatId --' , chatId , 'linkID ---', linkID )
            let object = homeworks_0_12.find(obj => obj.link === linkID);
            // console.log(object)
            callDb.recordLink(chatId, object.id , linkID).then(async res => {
                await ctx.telegram.sendMessage(chatId, await finishSent( true , linkID), await getWatch(true)).then(r => {
                })
            }).catch(e =>{
                console.log(e)
            }
            )

        });
        start.action(/(\d+)/, async ctx => {
            // Extract the dynamic part of the action id
            const actionId = ctx.update.callback_query.data
            const newId = ctx.update.callback_query.data
            // console.log("The newId  id is:", newId);
            // const action = id.substring(0, 4)
            let lastFour = actionId.substring(actionId.length - 4);
            // console.log("The action id is:", lastFour);
            // const resultWatch = callDb.searchWatch({ newIndex,userId })
            if (lastFour === 'link') {
                const userId = ctx.update.callback_query.from.id
                if (userId) {
                    try {
                        const urlLink = await actionGetOneHomework(actionId)
                        // console.log("The urlLink id is:", urlLink);
                        const result = await callDb.searchWatch({userId,urlLink})
                        // console.log("result  --  ",result)
                        await ctx.telegram.sendMessage(userId, await finishSent(result,urlLink), await getWatch(result) ).then(r => {
                        })
                    }catch (e) {
                        console.log(e)
                    }
                } else {}

            } else {
                homeworksList(ctx, newId).then(r => {
                });
            }

        });
        return start
    }
}

module.exports = HomeworksGenerator