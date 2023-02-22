const getCommon = require("./commonFunction");
const helenFunction = require("../helenFunction/function");
const callDb = require("../controllers/tutorial.controller");
const firstCalculateWeeksSinceBirth = require('./firstCalculateWeeksSinceBirth')

async function SetNewWeek(helen) {
    const newArrayIntensive = await callDb.findAllIntensive()
    console.log(newArrayIntensive.dataValues)
    try {
        for (let i = 0; i < newArrayIntensive.length; i++) {
            const fullWeek = newArrayIntensive[i].dataValues.index_week
            if (i === newArrayIntensive.length - 1) {
                await helen.telegram.sendMessage(1081994928, `Новая неделя установлена`)
            }
            await callDb.updateNewWeek(newArrayIntensive[i].dataValues.chatId, fullWeek + 1)
        }
    } catch (e) {
        console.log(e)
    }
}
module.exports = SetNewWeek;