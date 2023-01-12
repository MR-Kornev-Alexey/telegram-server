

start - Перезапустить бота
homeworks - Домашние задания
registration - Регистрация
check - Проверить данные
support - Написать в поддержку
help  - Подсказать


nYEw-3Xv3mAq

async function finishSent (data){
const result = await callDb.searchWatch(data)
if (result === []){
return data.urlLink + '\nВы видео уже смотрели\n'
} else {
return data.urlLink+ '\nОтметить как просмотренное\n'
}

}
exports.searchWatch = async (req, res) =>{
await dataBot.HomeworksMark.findAll({ where: { userId: req.userId , content: req.urlLink} })
.then(data => {
return data
})
.catch(err => {
console.log(err)
});
}; получаю данные из БД с помощью searchWatch и если возвращается пустой объект result то одно действие , а если непустой то другое Это не работает и как исправить ?  