const help = require("../common/help")
const helpHelen = require("../common/helpHelen")
exports.sendHelp = async (ctx) => {
    await ctx.replyWithHTML(help.help)
    await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHLnBju3AHWWk_-r_jjHgXlXAl16HJugACwxMAAm3oEEqGY8B94dy6NC0E').then(r => {
    })
}

exports.sendHelpHelen = async (ctx) => {
    await ctx.replyWithHTML(helpHelen.help)
    await ctx.telegram.sendSticker(ctx.message.from.id, 'CAACAgIAAxkBAAEHLnBju3AHWWk_-r_jjHgXlXAl16HJugACwxMAAm3oEEqGY8B94dy6NC0E')
}
