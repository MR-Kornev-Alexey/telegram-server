

start - Перезапустить бота
support - Написать в поддержку
help  - Подсказать


start - Перезапустить бота
service- сервисы
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


// Массив, хранящий статусы нажатия кнопок
const buttonStatus = [];

bot.on('callback_query', (ctx) => {
const { callbackQuery } = ctx;
const { data } = callbackQuery;

// Если статус кнопки равен false, то нажатие еще не производилось
if (!buttonStatus[data]) {
buttonStatus[data] = true;
// Выполняем действия, связанные с нажатием кнопки
// ...
}
});


const path = require('path')

app.use(express.static(path.join(__dirname, 'dist')))

app.get('*', function (req, res) {
res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})