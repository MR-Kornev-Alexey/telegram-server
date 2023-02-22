const {Scenes: {BaseScene}} = require('telegraf');
const callDb = require("../controllers/tutorial.controller")
const {getMainMenuDream} = require("../lib/keyboards");
const HelenFunction = require("../helenFunction/function");

class dreamStartSceneGenerator {

    GenDreamBeginScene() {
        const dream_begin = new BaseScene('dream_begin')
        const firstText = 'Вас приветствует чат-бот, готовый помочь в решении ваших проблем со сном ребенка. \n' +
            'Внимательно ознакомьтесь с данной инструкцией.\n' +
            '\n' +
            'Внимание! Если что то не работает, выберите “Меню” (кнопка СИНЕГО цвета расположена в левом нижнем углу)  и нажмите на первую строку - “Перезапустить бота”\n' +
            '\n' +
            'Для работы: \n' +
            'Нажмите кнопку “СТАРТ”\n' +
            'Выберите одну из предложенных 4 методик для КРАТКОГО ознакомления.\n' +
            'Если методика Вас заинтересовала,  нажмите кнопку “➡ Дальше” и, перейдя к подробному видео ознакомьтесь с методикой. Для работы по этой методике нажмите кнопку “ Этапы работы” и начните работать\n' +
            '\n' +
            'Если  вы понимаете, что эта методика Вам не подходит, вернитесь на шаг назад через кнопку ”Назад” и выберите другой вариант\n' +
            '\n' +
            'Внимание! Разделы по работе с дневными снами, ранними пробуждениями, пролонгацией дневных снов, ритуалами, ночными кормлениями и т.д. расположены в разделе “Этапы работы” ' +
            'в каждой из методик.\n' +
            '\n' +
            'Перед началом работы походите по вкладкам меню, для лучшей ориентации.\n'
        const webApp = 'Добрый день!\nПо  многочисленным просьбам мы оперативно сделали weб-приложение.\n' +
            'Оно по функционалу аналогично ЧАТ-БОТУ , но меньше проблем с зависанием, когда одновременно работают несколько пользователей.\n' +
            'Переход по ссылке http://mrk.digital/'

        let buttonStartPressed = false;

        async function startMainDreamMenu(ctx) {
            if (!buttonStartPressed) {
                buttonStartPressed = true;
                try {
                    await ctx.reply(webApp,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [
                                        {text: 'СТАРТ', callback_data: 'start_data_dream'}
                                    ],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream_begin'}]
                                ]
                            }
                        },
                        await getMainMenuDream()
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonStartPressed = false;
                }
            }
        }

        let buttonStartBeginPressed = false;
        dream_begin.enter(
            async (ctx) => {
                if (!buttonStartBeginPressed) {
                    buttonStartBeginPressed = true;
                    try {
                        const user = ctx.scene.state.user;
                        await callDb.getOneUser(user)
                            .then(async (result) => {
                                console.log(result)
                                if (result.access_dream) {
                                    await startMainDreamMenu(ctx)
                                } else {
                                    await ctx.telegram.sendMessage(result.chatId, 'У вас нет доступа к курсу по сну.\n' +
                                        'Напишите в Службу поддержки\n https://t.me/mrk_service',
                                        {
                                            reply_markup: {
                                                inline_keyboard: [
                                                    [{text: "📕 Закрыть", callback_data: 'close_dream_begin'}]
                                                ]
                                            }
                                        }
                                    )
                                }
                            }).catch(e => {
                                    console.log(e)
                                }
                            )
                    } catch (e) {
                        console.log(e)
                    } finally {
                        buttonStartBeginPressed = false;
                    }
                }
            })

        dream_begin.action('close_dream_begin', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                } catch (e) {
                    console.log(e)
                }
            }
        });
        dream_begin.action('start_data_dream', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                    await ctx.scene.enter('dream_start')
                } catch (e) {
                    console.log(e)
                }
            }
        });
        return dream_begin
    }

    GenDreamStartScene() {
        const dream_start = new BaseScene('dream_start')
        const title = [
            `️1️⃣  Методика полного исключения\n`,
            `️2️⃣  Методика интервалов\n`,
            `️️3️⃣  Методика высиживания\n`,
            `️️4️⃣  Методика фейдинга\n`
        ]
        const youtubeLinks = [
            'DMhIQSOkr-Y', 'Y68wA60ctNw', 'oI6GWZepGSw', 'Se27z9svlww'
        ]
        const methods = [
            {
                name: "method_1",
                emoji: "1️⃣",
                title: "Методика полного исключения",
                text: "\n" +
                    "Супер категоричный метод. Подходит в качестве шага отчаянья. Кладем ребенка в кровать и выходим из комнаты. Заходим только утром или для кормления.\n" +
                    "Подходит родителям на грани, это крайняя мера, если мама:\n" +
                    "\n" +
                    "✅ внезапно выходит на работу\n" +
                    "✅ заболела и требуется госпитализация\n" +
                    "✅ вынуждена срочно уехать без ребенка\n" +
                    "\n" +
                    "Если вы еще не пробовали работать по методикам обучения самостоятельному засыпанию и у вас есть время, выберите постепенный подход более мягких методик.\n",
                video: "https://youtu.be/cdey8ZpTD9k",
                number: 1,
            },
            {
                name: "method_2",
                emoji: "2️⃣",
                title: "Методика интервалов",
                text: "\n" +
                    "Быстрый метод с высокой эффективностью. Подходит для здоровых малышей с 4 месяцев. Уже на 2-5 день ребенок меньше плачет и  быстрее засыпает в своей кроватке.\n" +
                    "В основе - жесткая схема увеличения интервалов. Уложив ребёнка в кроватку, родитель выходит из комнаты. " +
                    "Разрешено заходить через определенные промежутки времени, чтобы немного успокоить кроху. Интервалы между заходами удлиняются.\n" +
                    "\n" +
                    "Хорошо подходит для мам которые:\n" +
                    "✅ Совсем не спят\n" +
                    "✅ Находятся на грани нервного срыва\n" +
                    "✅ скоро рождение второго ребенка\n" +
                    "✅ не способны выдержать работу по медленным методикам \n" +
                    "\n" +
                    "Однако следует учитывать что:\n" +
                    "✅ Ребенок много плачет\n" +
                    "✅ Вызывает стресс у родителей, которые не могут долго игнорировать плач ребенка\n" +
                    "✅ Методика не подходит легковозбудимым детям\n" +
                    "✅ Требуется много терпения и воли\n",
                video: "https://youtu.be/cdey8ZpTD9k",
                number: 2,
            },
            {
                name: "method_3",
                emoji: "3️⃣",
                title: "Методика высиживания",
                text: "\n" +
                    "Популярный метод. Подходит для здоровых малышей с 4 месяцев.\n" +
                    "Кладём ребёнка в кроватку и садимся рядом на стул. Малыша успокаиваем поглаживанием, шипением, ритмом дыхания. " +
                    "Постепенно уменьшаем свою помощь, отодвигая стул все дальше и дальше каждые 3 дня. \n" +
                    "\n" +
                    "Плюсы: \n" +
                    "✅ Понятные  и простые действия\n" +
                    "✅ Минимум слез\n" +
                    "✅ Отлично справляются папы и другие члены семьи\n" +
                    "✅ Возможно применение при совместном сне\n" +
                    "\n" +
                    "Минусы: \n" +
                    "✅ Устойчивый результат не ранее через 2-3 недели применения\n" +
                    "✅ Не всегда подходит для тревожных мам, постоянно транслирующих свои эмоции\n" +
                    "✅ Не всегда подходит для родителей, испытывающих очень сильную усталость\n",
                video: "https://youtu.be/cdey8ZpTD9k",
                number: 3,
            },
            {
                name: "method_4",
                emoji: "4️⃣",
                title: "Методика фейдинга",
                text: "\n" +
                    "Самая мягкая из методик.  Суть - постепенно сократить количество необходимой малышу  помощи при засыпании. Параллельно обучив новым способам засыпания. \n" +
                    "\n" +
                    "Методика ОЧЕНЬ долгая и пройдя пару шагов вперед, Вам придется сделать шаг, а то и два назад. Рассчитана на терпеливую маму, которая сможет продолжать работу, " +
                    "не видя стабильного эффекта в первые дни и недели.\n" +
                    "\n" +
                    "Плюсы: \n" +
                    "✅ Относится к мягким методикам\n" +
                    "✅ Практически нет слез\n" +
                    "✅ Процесс обучения максимально комфортный и постепенный для ребенка\n" +
                    "\n" +
                    "Минусы: \n" +
                    "✅ Очень долгий и трудоемкий процесс (1,5-2 месяца)\n" +
                    "✅ Требуется огромное терпение родителей и последовательность действий \n" +
                    "✅ Не подходит тем, кто нуждается в быстром результате \n" +
                    "✅ Из-за длительности  высока вероятность, что процессу что-то помешает (зубки, скачок роста, болезнь, отъезд)\n" +
                    "✅ Не подходит для родителей, которые испытывают сильную усталость\n",
                video: "https://youtu.be/cdey8ZpTD9k",
                number: 4,
            },
        ];
        const dataSixSleepMore = [
            ['jBcB0ixsNVk',
                'GMaFlC6NbY0',
                'yS97syATarA',
                'yp_YZM4qPxE'
            ],// 1 день
            ['Eld5BRMppgU',
                'vkweZ3RIGqk',
                'oZpaU6JBRYM',
                'h6AmOstnLbg'
            ],// 2 день
            [
                'qb9CrD6CGb4',
                'YxMaxRJWgyo',
                'FHHsQabjyaI',
                'q1Il_vqZDfE'
            ] //результаты
        ]
        const rituals = [
            '_SdMNKlvbXg',
            'gjsOW2yskGY',
            'UN_E0sBQko0'
        ]
        const printDreams = [
            'http://elenakorneva.site/pdf/exception.pdf',
            'http://elenakorneva.site/pdf/intervals.pdf',
            'http://elenakorneva.site/pdf/hatching.pdf',
            'http://elenakorneva.site/pdf/feyding.pdf'
        ]
        const dayDreams = [
            'RzVEotFY9fw',
            'bdXHvSrJAZY',
            'YWaoAKTwhT8',
            'EnOCyV4pxqU'
        ]
        const faqArray = [
            // 'P8QZkYbQyDw',
            'jgOurBQPyeA',
            'hMh48kvR2Cc',
            'CKrJC3Mraqo',
            'PZNCYyJAgmQ',
            'nC33KnF8Eb8',
            'WyMx1dK2twU',
            'WC3B2AliqXA',
            '3SxJac3J7p8',
            'l4eRF7nKa_0'
        ]
        let button1Pressed = false;
        dream_start.enter(
            async (ctx) => {
                if (!button1Pressed) {
                    button1Pressed = true;
                    try {
                        await ctx.reply(
                            `♥️ Выберите, пожалуйста, методику ♥️\n`,
                            await keyMain()
                        )
                    } catch (e) {
                        console.log(e)
                    } finally {
                        button1Pressed = false;
                    }
                }
            }
        )

        async function keyMain() {
            try {
                return {
                    reply_markup: {
                        inline_keyboard: [
                            [
                                {text: "️1️⃣ Полного исключения", callback_data: 'method_1'}
                            ],
                            [
                                {text: "️2️⃣ Интервалов", callback_data: 'method_2'}
                            ],
                            [
                                {text: "️3️⃣ Высиживания", callback_data: 'method_3'}
                            ],
                            [{text: "️4️⃣ Фейдинга", callback_data: 'method_4'}
                            ],
                            [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                        ]
                    },
                    parse_mode: "markdown"
                }
            } catch (e) {
                console.log(e)
            }

        }

        let buttonMainPressed = false;

        async function mainMenu(ctx) {
            if (!buttonMainPressed) {
                buttonMainPressed = true;
                try {
                    await ctx.reply(
                        `♥️ Выберите, пожалуйста, методику ♥️\n`,
                        await keyMain()
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonMainPressed = false;
                }
            }
        }

        let buttonDataDreamPressed = false;
        dream_start.action('data_dream', async ctx => {
                if (!buttonDataDreamPressed) {
                    buttonDataDreamPressed = true;
                    try {
                        ctx.answerCbQuery()
                        await mainMenu(ctx)
                            , await getMainMenuDream()
                    } catch (e) {
                        console.log(e)
                    } finally {
                        buttonDataDreamPressed = false;
                    }
                }
            }
        );

        dream_start.action('close_dream', async ctx => {
            const chatId = ctx.update.callback_query.from.id
            const messageId = ctx.update.callback_query.message.message_id
            ctx.answerCbQuery()
            if (chatId) {
                try {
                    await ctx.telegram.deleteMessage(chatId, messageId)
                    await ctx.scene.leave()
                }catch (e) {
                    console.log(e)
                }
            } else {}
        });
        dream_start.action('close_frame', async ctx => {
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

        let buttonReturnFramePressed = false;
        dream_start.action('return_frame', async ctx => {
            if (!buttonReturnFramePressed) {
                buttonReturnFramePressed = true;
                try {
                    await ctx.answerCbQuery()
                    const msg = ctx.update.callback_query.message
                    let editedMessage =
                        `♥️ Выберите, пожалуйста, методику ♥️\n`
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, await keyMain())
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonReturnFramePressed = false;
                }
            }
        });

        let buttonCommonPressed = false;

        async function getMethodCommon(ctx, editedMessage, number) {
            if (!buttonCommonPressed) {
                buttonCommonPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "➡ Дальше", callback_data: 'next_frame_' + number}],
                                    [{text: "⬅️ Назад", callback_data: 'return_frame'}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonCommonPressed = false;
                }
            }
        }

        let buttonNextPressed = false;

        async function nextFiveCScreen(ctx, editedMessage, number) {
            if (!buttonNextPressed) {
                buttonNextPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "Подготовительный этап", callback_data: 'prepare_' + number}],
                                    [{text: "Ритуалы", callback_data: 'rituals_' + number}],
                                    [{text: "Ночной сон", callback_data: 'sleep_dream_' + number}],
                                    [{text: "Дневной сон", callback_data: 'day_dream_' + number}],
                                    [{text: "Удлинение дневных снов", callback_data: 'long_dream_' + number}],
                                    [{text: "Раннее пробуждение", callback_data: 'early_awakening_' + number}],
                                    [{text: "Важные условия для сна", callback_data: 'important_conditions_' + number}],
                                    [{text: "Ночные кормления", callback_data: 'night_feedings_' + number}],
                                    [{
                                        text: "Особенность работы с близнецами, погодками ...",
                                        callback_data: 'twins_' + number
                                    }],
                                    [{text: "Вопросы - ответы", callback_data: 'questions_answers_' + number}],
                                    [{text: "Гайд для печати", callback_data: 'guide_print_' + number}],
                                    [{text: "⬅️ Назад", callback_data: `back_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonNextPressed = false;
                }
            }
        }

        let buttonFourPressed = false;

        async function nextFourCScreen(ctx, editedMessage, number) {
            if (!buttonFourPressed) {
                buttonFourPressed = true;
                try {
                    // console.log(editedMessage)
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "➡ Этапы работы", callback_data: 'five_frame_' + number}],
                                    [{text: "⬅️ Назад", callback_data: 'return_frame'}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]

                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonFourPressed = false;
                }
            }
        }

        let buttonSixPressed = false;

        async function nextSixScreenOne(ctx, editedMessage, number) {
            if (!buttonSixPressed) {
                buttonSixPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "⬅️ Назад", callback_data: `bak6_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonSixPressed = false;
                }
            }
        }

        let buttonSixScreenOnePressed = false;

        async function nextSixScreenOneFaq(ctx, editedMessage, number) {
            if (!buttonSixScreenOnePressed) {
                buttonSixScreenOnePressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "⬅️ Назад", callback_data: `bak9_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonSixScreenOnePressed = false;
                }
            }
        }

        let button7Pressed = false;

        async function nextSevenCScreen(ctx, editedMessage, number) {
            if (!button7Pressed) {
                button7Pressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "⬅️ Назад", callback_data: `bak7_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    button7Pressed = false;
                }
            }
        }

        let buttonPressed = false;

        async function nextEightScreen(ctx, editedMessage, number) {
            if (!buttonPressed) {
                buttonPressed = true;
                try {
                    const msg = ctx.update.callback_query.message;
                    await ctx.telegram.editMessageText(
                        ctx.chat.id,
                        msg.message_id,
                        undefined,
                        editedMessage,
                        {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "⬅️ Назад", callback_data: `bak8_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: "close_dream"}]
                                ]
                            }
                        }
                    );
                } catch (e) {
                    console.log(e);
                } finally {
                    buttonPressed = false;
                }
            }
        }

        let buttonSevenScreenFAQPressed = false;

        async function nextSevenScreenFAQ(ctx, editedMessage, number) {
            if (!buttonSevenScreenFAQPressed) {
                buttonSevenScreenFAQPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    // [{text: "Я сдалась ", callback_data: `faq7_0`}],
                                    [{text: "Стресс и привязанность при плаче", callback_data: `faq7_1`}],
                                    [{text: "Обязательная поддержка родных ", callback_data: `faq7_2`}],
                                    [{text: "Ассоциация на пустышку", callback_data: `faq7_3`}],
                                    [{text: "Как успокоится маме ", callback_data: `faq7_4`}],
                                    [{text: "Какание при засыпании ", callback_data: `faq7_5`}],
                                    [{text: "Пеленание ребенка", callback_data: `faq7_6`}],
                                    [{text: "Рвота при засыпании ", callback_data: `faq7_7`}],
                                    [{text: "Раскачивается во время засыпания", callback_data: `faq7_8`}],
                                    [{text: "Сосание пальчика при засыпании", callback_data: `faq7_9`}],
                                    [{text: "⬅️ Назад", callback_data: `bak6_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonSevenScreenFAQPressed = false;
                }
            }
        }

        let buttonSevenScreenScreenRitualsPressed = false;

        async function nextSevenCScreenRituals(ctx, editedMessage, number) {
            if (!buttonSevenScreenScreenRitualsPressed) {
                buttonSevenScreenScreenRitualsPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "Ритуал на дневное пробуждение", callback_data: `rit7_1`}],
                                    [{text: "Ритуал на засыпание", callback_data: `rit7_2`}],
                                    [{text: "Ритуал на дневной сон", callback_data: `rit7_3`}],
                                    [{text: "⬅️ Назад", callback_data: `bak6_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonSevenScreenScreenRitualsPressed = false;
                }
            }
        }

        let buttonSevenScreenSleepPressed = false;

        async function nextSevenScreenSleep(ctx, editedMessage, number) {
            if (!buttonSevenScreenSleepPressed) {
                buttonSevenScreenSleepPressed = true;
                try {
                    const msg = ctx.update.callback_query.message
                    await ctx.telegram.editMessageText(ctx.chat.id, msg.message_id, undefined, editedMessage, {
                            reply_markup: {
                                inline_keyboard: [
                                    [{text: "Первый день", callback_data: `first_frame_${number}`}],
                                    [{text: "Второй и следующие дни ", callback_data: `second_frame_${number}`}],
                                    [{text: "Первые результаты", callback_data: `results_frame_${number}`}],
                                    [{text: "⬅️ Назад", callback_data: `bak6_frame_${number}`}],
                                    [{text: "📕 Закрыть", callback_data: 'close_dream'}]
                                ]
                            }
                        }
                    )
                } catch (e) {
                    console.log(e)
                } finally {
                    buttonSevenScreenSleepPressed = false;
                }
            }
        }

        dream_start.action(/(\d+)/, async ctx => {
            try {
                await ctx.answerCbQuery()
                const newIdAction = ctx.update.callback_query.data
                console.log("The !!!!!  newIdAction id is:", newIdAction)
                const index = newIdAction[newIdAction.length - 1] - 1;
                const firstFour = newIdAction.substring(0, 4);
                if (firstFour === 'meth') {
                    const editedMessageThree = `${title[index]}\n${methods[index].text}`;
                    await getMethodCommon(ctx, editedMessageThree, index + 1);
                }
                if (firstFour === 'next' || firstFour === 'back') {
                    const editedMessageThree = `https://youtu.be/${youtubeLinks[index]}\n\n${title[index]}\n`;
                    await nextFourCScreen(ctx, editedMessageThree, index + 1);
                } else if (firstFour === 'five' || firstFour === 'bak6') {
                    const editedMessageFour = `${title[index]}\n`;
                    await nextFiveCScreen(ctx, editedMessageFour, index + 1);
                } else if (firstFour === 'prep') {
                    const editedMessageFive = `Подготовительный этап\n https://youtu.be/JchmPK8tgZY\n`;
                    await nextSixScreenOne(ctx, editedMessageFive, index + 1);
                } else if (firstFour === 'long') {
                    const editedMessageFive = `Удлинение дневных снов\n https://youtu.be/Ph2FEDmlTGY\n`;
                    await nextSixScreenOne(ctx, editedMessageFive, index + 1);
                } else if (firstFour === 'earl') {
                    const editedMessageFive = `Ранее пробуждение\n https://youtu.be/dpBecuwLwZk\n`;
                    await nextSixScreenOne(ctx, editedMessageFive, index + 1);
                } else if (firstFour === 'impo') {
                    const editedMessageFive = `Важные условия для сна\n https://youtu.be/ZOuvJq1fHQg\n`;
                    await nextSixScreenOne(ctx, editedMessageFive, index + 1);
                } else if (firstFour === 'nigh') {
                    const editedMessageFive = `Ночные кормления\n https://youtu.be/C4MvX4piprY\n`;
                    await nextSixScreenOne(ctx, editedMessageFive, index + 1);
                } else if (firstFour === 'slee' || firstFour === 'bak7') {
                    const editedMessageFive = `${title[index]}\nНочной сон\n Выберите раздел`;
                    await nextSevenScreenSleep(ctx, editedMessageFive, index + 1);
                }
                if (firstFour === 'firs') {
                    const editedMessageSix = `https://youtu.be/${dataSixSleepMore[0][index]}\n`;
                    await nextSevenCScreen(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'seco') {
                    const editedMessageSix = `https://youtu.be/${dataSixSleepMore[1][index]}\n`;
                    await nextSevenCScreen(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'resu') {
                    const editedMessageSix = `https://youtu.be/${dataSixSleepMore[2][index]}\n`;
                    await nextSevenCScreen(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'ritu' || firstFour === 'bak8') {
                    const editedMessageSix = `Выберите раздел\n  7 экран!\n`;
                    await nextSevenCScreenRituals(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'rit7') {
                    const editedMessageSix = `https://youtu.be/${rituals[index]}\n`;
                    await nextEightScreen(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'day_') {
                    const editedMessageSix = `${title[index]}\nДневной сон\n https://youtu.be/${dayDreams[index]}\n`;
                    await nextSixScreenOne(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'twin') {
                    const editedMessageSix = `Особенность работы с близнецами, двойняшками,тройняшками  погодками\n http://elenakorneva.site/pdf/twins.pdf`;
                    await nextSixScreenOne(ctx, editedMessageSix, index + 1);
                }
                if (firstFour === 'guid') {
                    const editedMessageSix = `${title[index]}\nГайд для печати\n${printDreams[index]}\n`;
                    await nextSixScreenOne(ctx, editedMessageSix, index + 1);
                } else if (firstFour === 'ques' || firstFour === 'bak9') {
                    const editedMessageFive = `Выберите вопрос`;
                    await nextSevenScreenFAQ(ctx, editedMessageFive, index + 1);
                }

                if (firstFour === 'faq7') {
                    const editedMessageSix = `https://youtu.be/${faqArray[index]}\n`;
                    await nextSixScreenOneFaq(ctx, editedMessageSix, index + 1);
                } else {
                    // const editedMessageThree = `https://youtu.be/${youtubeLinks[index]}\n\n${title[index]}\n`;
                    // await nextFourCScreen(ctx, editedMessageThree, index + 1);
                }
            } catch (e) {
                console.log(e)
            }

        });

        let buttonMessagePressed = false;
        dream_start.on('message', async (ctx) => {
                if (!buttonMessagePressed) {
                    buttonMessagePressed = true;
                    try {
                        await ctx.reply('Это я пока не понимаю. Идем в начало?', {
                                reply_markup: {
                                    inline_keyboard: [
                                        [{text: "📕 Закрыть", callback_data: 'close_frame'}]
                                    ]
                                }
                            }
                        )
                        await ctx.scene.reenter()
                    } catch (e) {
                        console.log(e)
                    } finally {
                        buttonMessagePressed = false;
                    }
                }
            }
        )

        return dream_start
    }
}

module.exports = dreamStartSceneGenerator