const db = require("../models");
const {regexpToText} = require("nodemon/lib/utils");
const dataBot = db.tutorials;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.createHelen = (data) => {
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
    dataBot.Helen.create(newUser)
        .catch(err => {
            console.log(err)
        })
};
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
exports.checkUserForIntensive= async (id) => {
    const user = await dataBot.Intensive.findByPk(id);
    return !!user;
}
exports.checkUserForCommon = async (id) => {
    const user = await dataBot.Tutorial.findByPk(id);
    return user.dataValues;
}
exports.createUserForIntensive = async (data) => {
    const newUser = {
        email_telegram: data.email,
        real_name_telegram: data.name,
        baby_name_telegram: data.babyName,
        birthday_telegram: data.birthdayBaby,
        chatId: data.chatId,
        first_name_telegram: data.first_name_telegram,
    };
    await dataBot.Intensive.create(newUser)
        .catch(err => {
            console.log(err)
        })
}

exports.findAllIntensive = async (req, res) => {
    return await dataBot.Intensive.findAll({ where: { send: true }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findAllHelen = async (req, res) => {
    return await dataBot.Helen.findAll()
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};

exports.findAllIntensiveAll = async (req, res) => {
    return await dataBot.Intensive.findAll()
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};


// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
    return await dataBot.Tutorial.findAll()
        .then(user => {
            // console.log(data)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};

exports.searchWatch = async (req, res) => {
    const { userId, urlLink } = req;
    const record = await dataBot.HomeworksMark.findOne({
        where: { userId, content: urlLink }
    });
    return !!record;
}
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
async function findAndLogUserHelen(data) {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)

    const user = await dataBot.Helen.findByPk(data);
    if (user) {
        console.log(`Пользователь с id = ${data}`);
        console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`Пользователь не найден`);
        return null;
    }
}
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
        return  await dataBot.HomeworksMark.create(newUserWatch)
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
exports.findUserByPk = async (data) => {
    try {
        // console.log(user)
        return await dataBot.Tutorial.findByPk(data);
    } catch (err) {
        console.log(err);
        throw err;
    }
};
exports.findOneHelen = (data) => {
    return new Promise((resolve, reject) => {
        findAndLogUserHelen(data)
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

exports.getInDB = async (id, index) => {
    return new Promise((resolve, reject) => {
        dataBot.Tutorial.update(index, {
            where: { chatId: id }
        })
            .then(result => {
                if (result[0] > 0) {
                    resolve(123);
                } else {
                    reject(456);
                }
            })
            .catch(err => {
                console.log(err);
                reject(456);
            });
    });
}

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


exports.getNumber = async () => {
    try {
         return await dataBot.IndexOfSend57.findByPk(1);
    } catch (err) {
        console.log(err);
        throw err;
    }
};

exports.saveIndex57 = async (data) => {
    await dataBot.IndexOfSend57.update({
        indexSent: data
    })
        .catch(err => {
            console.log(err)
        })

}

exports.saveSandingToDB =  async (user, link) => {
    const newSending = {
        chatId: user.chatId,
        name:  user.name,
        birthday: user.birthday,
        numberMonth: user.numberMonth,
        numberWeek: user.numberWeek,
        link: link,
        indexVideo: user.indexVideo,
        indexWeek: user.numberWeek
    };
    await dataBot.Sending.create(newSending)
        .catch(err => {
            console.log(err)
        })

}

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {

};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {

};

// Find all published Tutorials
exports.findAllPublished = (req, res) => {

};