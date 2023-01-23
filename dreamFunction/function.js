const callDb = require("../controllers/tutorial.controller");
const diffTime = require("../common/differentMonths");
const {Markup} = require("telegraf");
const commonFunction = require("../common/commonFunction")

// exports.checkAndReplyDream = (ctx) => {
//     commonFunction.checkUser(ctx.message.from)
//         .then(async (result) => {
//             if (result) {
//                 callDb.getOne(ctx.message.from).then(async (result) => {
//                         ctx.replyWithMarkdown(
//                             `Добрый день ${ctx.message.from.first_name ? ctx.message.from.first_name : 'незнакомец'}!\n` +
//                             `Проверьте Ваши данные:\n` +
//                             `*Имя ребенка* - ${result.baby_name_telegram}\n`+
//                             `*Дата рождения ребенка* - ${result.birthday_telegram}\n` +
//                             `*Число полных месяцев* - ${diffTime.calculating(result.birthday_telegram)}\n` +
//                             `*Ваши Имя и Фамилия* - ${result.real_name_telegram}\n` +
//                             `Вы живете в  ${result.location}\n` +
//                             `*Ваш email* - ${result.email_telegram}`,
//                             {
//                                 reply_markup: {
//                                     inline_keyboard: [
//                                         [
//                                             { text: 'Изменить имя ребенка', callback_data: 'data1' }
//                                         ],
//                                         [
//                                             { text: 'Изменить дату рождения ребенка', callback_data: 'data2' }
//                                         ],
//                                         [
//                                             { text: 'Изменить имя', callback_data: 'data3' }
//                                         ],
//                                         [
//                                             { text: 'Изменить локацию', callback_data: 'data4' }
//                                         ],
//                                         [
//                                             { text: 'Изменить email', callback_data: 'data5' }
//                                         ],
//                                         [
//                                          { text: 'Все верно', callback_data: 'data6' }
//                                         ]
//                                     ]
//                                 }
//                             }
//                         )
// //++++++++++++++++++++++++++++++++++++++
// //                         bot.on('callback_query', async (callbackQuery) => {
// //                             // console.log('callback_query event', callbackQuery);
// //                             const action = callbackQuery.update.callback_query.data;
// //                             // console.log('callback_query data ---- ', callbackQuery.from.id);
// //                             const userId = callbackQuery.from.id;
// //                             const ctx = callbackQuery;
// //                             if (action === 'right') {
// //                                 // console.log('right action -- ' + result.chatId);
// //                                 await ctx.answerCbQuery();
// //                                 await ctx.telegram.sendSticker(userId, 'CAACAgIAAxkBAAEHK09julSXNlyU_2jfoNEsGktOpMn6rQACsAEAAhZCawpyXcYrBVvoaC0E')
// //                             } else if (action === 'update') {
// //                                 // console.log('update action');
// //                                 await ctx.answerCbQuery();
// //                                 await ctx.telegram.sendMessage(userId, `Пойдем обновлять данные`)
// //                                 await ctx.scene.enter('baby');
// //                             }
// //                         });
// //=====================================
//                     }
//                 )
//
//             } else {
//                 await ctx.scene.enter('baby');
//             }
//         }).catch(e => {
//         console.log(e)
//     })
// }