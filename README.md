

start - Перезапустить бота
support - Написать в поддержку
help  - Подсказать


start - Перезапустить бота
homeworks - Домашние задания
check - Проверить данные
support - Написать в поддержку
help  - Подсказать

start - Перезапустить бота
dream - Работа со сном
check - Проверить данные
support - Написать в поддержку
help  - Подсказать

/group в группы интенсива 
/alles все до кучи
/intensiv участникам интенсива  в ручную 
/super
/stern
/sama


nYEw-3Xv3mAq

Дорогие участники и участницы! 
Сегодня 17 01 23  Вам было 2 раза отправлены домашние задания. 
Произошел сбой и ссылки на видео слетели и вам пришло undefined 
Они отправляются по новому алгоритму и уже должны быть без номеров.
Кто не получил сегодня домашнее задание - прошу написать мне и срочно подружиться с ботом @mrk_new_bot 


const result = await callDb.searchWatch({userId,urlLink})

exports.searchWatch = async (req, res) =>{
await dataBot.Tutorial.findAll( { where: { userId: req.userId, content: req.urlLink }})
.then(res => {
if (res) {
return true
} else {
return false
}

        })
        .catch(err => {
            console.log(err)
            return err;
        });
}; получить result  =  true если запись есть и false если записи нет  