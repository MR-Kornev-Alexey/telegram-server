const getCommon = require("./commonFunction");
const helenFunction = require("../helenFunction/function");
const callDb = require("../controllers/tutorial.controller");
const arraySend = require("../lib/send_0_56");
const fs = require('fs');
const file = require('../temp/dream')

const textOfSend = 'По  многочисленным просьбам мы оперативно сделали weб-приложение.\n' +
    'Оно по функционалу аналогично ЧАТ-БОТУ , но меньше проблем с зависанием, когда одновременно работают несколько пользователей.\n'+
    'Технические работы по улучшению бота активно ведутся.\n'+
    'Переход на web-приложение по ссылке http://mrk.digital/'

async function nextFunction(helen) {
    helen.telegram.sendMessage(1081994928, `Рассылка закончена`).then(r => {})
}
async function  nextFunctionWriteFile(data){
    try{
        fs.writeFile('dream.txt', data, (error) => {
            if (error) {
                console.error(error);
                return;
            }
            console.log('Data saved successfully');
        })
    } catch (e) {
       console.log(e)
    }
}

exports.createListDream = async () => {  //command is list
    const newData = await callDb.findAllDream() // формирование реального списка
    const dataBefore56 = []
    for (let i = 0; i < newData.length; i++) {

                dataBefore56.push({
                 chatId: newData[i].dataValues.chatId,
                name: newData[i].dataValues.real_name_telegram,
                birthday: newData[i].dataValues.birthday_telegram,
            })
        if (i === newData.length - 1) {
            await nextFunctionWriteFile(JSON.stringify(dataBefore56))
        }
    }
    // console.log("dataFoSend  ---", dataBefore56)
    // return dataBefore56
}
//const data = JSON.parse(jsonString)

exports.sendUsersDreamBotJSON = async (helen) => {
    const date= await getCommon.calcNowDate()
    const newArrayIntensive = file
    console.log(newArrayIntensive)
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(async () => {
            try {
                if (i === newArrayIntensive.length - 1) {
                    await nextFunction(helen);
                }
                helen.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await helen.telegram.sendMessage(newArrayIntensive[i].chatId, `❤️ Доброго времени суток ${newArrayIntensive[i].name}\nРассылка от ${date} ` +
                                `\n` +
                                `${textOfSend}\n`
                            )
                            helen.telegram.sendMessage(1081994928, `Рассылка для  ${newArrayIntensive[i].name} отправлена`).then(r => {
                            })
                        } catch (error) {
                            console.log(error);
                        }
                    }
                })
            } catch (error) {
                if (error.response.error_code === 400) {
                    console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
                } else {
                    console.log(error);
                }
            }

        }, 10000 * i)
    }
}

exports.sendUsersDreamBot = ( helen ) => {
    // const date= await getCommon.calcNowDate()
    // const newArrayIntensive = await callDb.findAllDream()
    // console.log(newArrayIntensive)
    // for (let i = 0; i < newArrayIntensive.length; i++) {
    //     setTimeout(async () => {
    //         try {
    //             if (i === newArrayIntensive.length - 1) {
    //                 await nextFunction(helen);
    //             }
    //             helen.telegram.getChatMember(newArrayIntensive[i].dataValues.chatId, newArrayIntensive[i].dataValues.chatId).then(async (chatMember) => {
    //                 // console.log("chatMember ----", chatMember.status)
    //                 if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
    //                     console.log('User is not available')
    //                 } else {
    //                     // console.log(newArrayIntensive[i])
    //                     try {
    //                         await helen.telegram.sendMessage(newArrayIntensive[i].dataValues.chatId, `❤️ Доброго времени суток ${newArrayIntensive[i].dataValues.real_name_telegram}\nРассылка от ${date} ` +
    //                             `\n` +
    //                             `${textOfSend}\n`
    //                         )
    //                         helen.telegram.sendMessage(1081994928, `Рассылка для  ${newArrayIntensive[i].dataValues.real_name_telegram} отправлена`).then(r => {
    //                         })
    //                     } catch (error) {
    //                         console.log(error);
    //                     }
    //                 }
    //             })
    //         } catch (error) {
    //             if (error.response.error_code === 400) {
    //                 console.log(`Failed to send message to user ${newArrayIntensive[i].name} with chatId ${newArrayIntensive[i].chatId}. Error: ${error.response.description}`);
    //             } else {
    //                 console.log(error);
    //             }
    //         }
    //
    //     }, 10000 * i)
    // }
}