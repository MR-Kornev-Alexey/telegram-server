git commit -m "first commit"
start - Перезапустить бота
help  - Подсказать
registration - Регистрация
check - Проверить данные 
homeworks - Домашние задания


    const [oldDay, oldMonth, oldYear] = d1.match(/(\d{2})-(\d{2})-(\d{4})/).slice(1);
    console.log (oldYear,"", oldMonth," ", oldDay)
    const fromNew  = new Date(oldYear,oldMonth, oldDay)


scp file.txt user@example.com:/home/user/upload

Для использования команды scp на сервере должен быть установлен пакет openssh-server, который предоставляет утилиты для удаленного подключения к серверу через SSH.

Чтобы установить этот пакет на Ubuntu, выполните следующую команду:

Copy code
sudo apt install openssh-server
После установки пакета необходимо запустить сервис ssh, чтобы он начал слушать подключения по протоколу SSH:

Copy code
sudo systemctl start ssh
После этого вы сможете подключаться к серверу через SSH и использовать команду scp для копирования файлов между удаленными системами.