const db = require("../models");
const dataBot = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (data) => {
    // console.log('data_in_create =  ' +  data)
    // console.log(data)
    const newUser = {
        name_telegram: data.username,
        first_name_telegram: data.first_name,
        last_name_telegram: data.last_name,
        chatId: data.id
    };
    // console.log('newUser = ')
    // console.log(newUser)
    dataBot.Tutorial.create(newUser)
        .catch(err => {
        console.log(err)
        })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

exports.searchWatch = async (req, res) =>{
    return await dataBot.HomeworksMark.findAll({ where: { userId: req.userId , content: req.urlLink} })
        .then(data => {
            console.log(data)
            return !(!data || Object.keys(data).length === 0);
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.searchSend = async (req, res) =>{
    return await dataBot.Tutorial.findAll({ where: { access_dev_0_12: true }} )
        .then(data => {
               return data
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
// Find a single Tutorial with an id
async function findAndLogUser(data) {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)
    const user = await dataBot.Tutorial.findByPk(data);
    if (user) {
        // console.log(`Пользователь с id = ${data}`);
        // console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`Пользователь не найден`);
        return null;
    }
}
exports.recordLink = async (chatId, videoId , linkID) => {

    const user = await dataBot.HomeworksMark.findByPk(chatId)
    if (user) {
        const newUserWatch = {
            userId: chatId,
            idHomework: videoId,
            content: linkID,
        };
        console.log(`Пользователь с id = ${chatId}`);
        console.log(user.dataValues);
         return dataBot.HomeworksMark.update(newUserWatch)
        // return user.dataValues;
    } else {
        const newUserWatch = {
            userId: chatId,
            idHomework: videoId,
            content: linkID,
        };
        console.log(`Пользователь не найден`);
        console.log('newUserWatch = ')
        console.log(newUserWatch)
        await dataBot.HomeworksMark.create(newUserWatch)
            .catch(err => {
                console.log(err)
            })
    }
}
exports.getOneUser = async (data) => {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)
    const user = await dataBot.Tutorial.findByPk(data);
    if (user) {
        // console.log(`Пользователь с id = ${data}`);
        // console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`Пользователь не найден`);
        return null;
    }
}

exports.findOne = (data) => {
    return new Promise((resolve, reject) => {
        findAndLogUser(data)
            .then((user) => {
                if (user) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};
exports.updateUser = (id,data) => {
    // console.log("id in update - " + id)
    // console.log(data)
    const targetItem = data.find(item => item.chatId === id)
    // console.log("targetItem  -- ")
    // console.log(targetItem)

    return dataBot.Tutorial.update(targetItem, {
        where: { chatId: id }
    })
        .then(result => {
            // Здесь result содержит информацию о том, сколько строк было обновлено
            if (result[0] > 0) {
                // Если обновлена хотя бы одна строка, значит все прошло успешно
                // console.log('Данные успешно обновлены');
                return 123;
            } else {
                // Если ни одна строка не была обновлена, значит что-то пошло не так
                // console.log( 'Произошла ошибка при обновлении данных');
                return 456;
            }
        })
        .catch(err => {
            console.log(err);
            return 456;
        });
};

exports.getOne = (data) => {
    return new Promise((resolve, reject) => {
        findAndLogUser(data.id)
            .then((user) => {
                resolve(user);
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
};



// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};