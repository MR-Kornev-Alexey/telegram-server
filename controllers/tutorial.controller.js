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
    dataBot.create(newUser)
        .catch(err => {
        console.log(err)
        })
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {

};

// Find a single Tutorial with an id
async function findAndLogUser(data) {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)
    const user = await dataBot.findByPk(data);
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

    return dataBot.update(targetItem, {
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