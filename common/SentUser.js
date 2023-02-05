const getCommon = require("./commonFunction");
const helenFunction = require("../helenFunction/function");
const callDb = require("../controllers/tutorial.controller");

async function sendUsers(helen) {
    const date= await getCommon.calcNowDate()
    const newArrayIntensive = await helenFunction.createListOFSending()
    for (let i = 0; i < newArrayIntensive.length; i++) {
        setTimeout(() => {
            try {
                helen.telegram.getChatMember(newArrayIntensive[i].chatId, newArrayIntensive[i].chatId).then(async (chatMember) => {
                    // console.log("chatMember ----", chatMember.status)
                    if (chatMember.status === 'left' || chatMember.status === 'kicked' || chatMember.status === 'restricted') {
                        console.log('User is not available')
                    } else {
                        // console.log(newArrayIntensive[i])
                        try {
                            await helen.telegram.sendMessage(newArrayIntensive[i].chatId, `❤️ Доброго времени суток ${newArrayIntensive[i].name}\nДЗ от ${date} (${newArrayIntensive[i].indexWeek})\n` +
                                `\n` +
                                `${newArrayIntensive[i].link}\n`
                            )
                            await callDb.saveSandingToDB(newArrayIntensive[i], newArrayIntensive[i].link, newArrayIntensive[i].indexVideo)
                            helen.telegram.sendMessage(1081994928, `ДЗ ${newArrayIntensive[i].name} отправлено`).then(r => {})
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
module.exports = sendUsers;