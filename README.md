

start - Перезапустить бота
homeworks - Домашние задания
registration - Регистрация
check - Проверить данные
support - Написать в поддержку
help  - Подсказать

nYEw-3Xv3mAq

объект [
{
numberMonth: 13,
chatId: 366526740,
name: 'Петров Иван',
birthday: '13-12-2021'
},
{
numberMonth: 12,
chatId: 542927509,
name: 'Анастасия Жулина',
birthday: '21-12-2021'
},
{
numberMonth: 5,
chatId: 1081994928,
name: 'Корнев Алексей',
birthday: '11-08-2022'
},
{
numberMonth: 7,
chatId: 1395807346,
name: 'Просто Кент',
birthday: '13-06-2022'
},
{
numberMonth: 12,
chatId: 5749279828,
name: 'Жулина Анастасия',
birthday: '21-12-2021'
}
]
 формируется в следующей функции

async function gatDataForSend() {
const newData = await callDb.searchSend();
const data = []
for (let i = 0; i < newData.length; i++) {
const fullMonth = await calcMonth(newData[i].dataValues.birthday_telegram)
data.push({
numberMonth: fullMonth,
chatId: newData[i].dataValues.chatId,
name: newData[i].dataValues.real_name_telegram,
birthday: newData[i].dataValues.birthday_telegram
})
}
console.log(data)
return data
}
есть         const scheme = {
0: "-0-2-",
1: "-0-2-",
2: "-0-2-",
3: "-3-4-",
4: "-3-4-",
5: "-5-6-",
6: "-5-6-",
7: "-7-8-",
8: "-7-8-",
9: "-9-10-",
10: "-9-10",
11: "-11-13-",
12: "-11-13-",
13: "-11-13-",
14: "-14-18-",
15: "-14-18-",
16: "-14-18-",
17: "-14-18-",
18: "-14-18-",
19: "-19-24-",
20: "-19-24-",
21: "-19-24-",
22: "-19-24-",
23: "-19-24-",
24: "-19-24-"
}
const kind = ['mov','spk', 'emo' ]
как сформировать новый объект вида

[
{
numberMonth: 13,
chatId: 366526740,
name: 'Петров Иван',
birthday: '13-12-2021'
indexVideo: 'mov-11-13-'
},
{
numberMonth: 13,
chatId: 366526740,
name: 'Петров Иван',
birthday: '13-12-2021'
indexVideo: 'spk-11-13-'
},
{
numberMonth: 13,
chatId: 366526740,
name: 'Петров Иван',
birthday: '13-12-2021'
indexVideo: 'emo-11-13-'
}
...
]
где indexVideo: 'emo-11-13-' формировался  из объектов в соответствии  numberMonth: 13, - 
то есть  числу месяцев 13 соответствует "-11-13-" в объекте scheme ,