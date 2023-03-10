const db = require("../models");
const {regexpToText} = require("nodemon/lib/utils");
const dataBot = db.tutorials;
const Op = db.Sequelize.Op;


// const { Op } = require('sequelize');


const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

exports.deleteAfter7Days = async () => {
    await dataBot.HomeworksMark.destroy({
        where: {
            createdAt: {
                [Op.lt]: sevenDaysAgo
            }
        }
    });
}



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
    const user = await dataBot.Intensive.findByPk(id);
    return user.dataValues;
}
exports.checkUserEmo = async (id) => {
    let user = await dataBot.EmoCourse.findByPk(id);
    if (!user) {
        const newUser = {
            registrationDate: new Date(),
            lastOptionOpenDate: new Date(),
            chatId: id
        };
        user = await dataBot.EmoCourse.create(newUser);
    }
    return user.dataValues;
};
exports.checkUserWebinar = async (id) => {
    const user = await dataBot.Tutorial.findByPk(id);
    return user.dataValues;
}
exports.checkUserMain = async (id) => {
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
exports.createUserForTest = async (data) => {
    const newUser = {
        email_telegram: data.email,
        real_name_telegram: data.name,
        baby_name_telegram: data.babyName,
        birthday_telegram: data.birthdayBaby,
        chatId: data.chatId,
        first_name_telegram: data.first_name_telegram,
    };
    await dataBot.Test.create(newUser)
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
exports.findAllDream = async (req, res) => {
    return await dataBot.Tutorial.findAll({ where: { access_dream: true }})
        .then(user => {
            // console.log(user)
            return user;
        })
        .catch(err => {
            console.log(err)
            return err;
        });
};
exports.findAllTest = async (req, res) => {
    return await dataBot.Test.findAll({ where: { send: true }})
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
exports.findAllIntensive2_0 = async (req, res) => {
    return await dataBot.Intensive.findAll({ where: { number: "number-2" }} )
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
exports.findAllHomeworks = async (req, res) => {
    return await dataBot.Tutorial.findAll( { where: { source: '3months'}})
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
        console.log(`???????????????????????? ?? id = ${data}`);
        console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`???????????????????????? ???? ????????????`);
        return null;
    }
}
// Find a single Tutorial with an id
async function findAndLogUser(data) {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)
    const user = await dataBot.Tutorial.findByPk(data);
    if (user) {
        // console.log(`???????????????????????? ?? id = ${data}`);
        // console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`???????????????????????? ???? ????????????`);
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
        console.log(`???????????????????????? ?? id = ${chatId}`);
        console.log(user.dataValues);
         return dataBot.HomeworksMark.update(newUserWatch)
        // return user.dataValues;
    } else {
        const newUserWatch = {
            userId: chatId,
            idHomework: videoId,
            content: linkID,
        };
        console.log(`???????????????????????? ???? ????????????`);
        console.log('newUserWatch = ')
        console.log(newUserWatch)
        return  await dataBot.HomeworksMark.create(newUserWatch)
            .catch(err => {
                console.log(err)
            })
    }
}

exports.changeIndexOfWeek= async (id, week)=> {
    console.log(id , week)
}
exports.saveDreamNew = async (id) => {
    await dataBot.Tutorial.update({ access_all: true, access_dream: true }, {
        where: { chatId: id }
    })
}

exports.saveWebinar = async (id, data) => {
    await dataBot.Tutorial.update({ choice_webinar: data}, {
        where: { chatId: id }
    })
}

exports.inputTrue = async (id) => {
    await dataBot.Tutorial.update({ assess_homeworks: true }, {
        where: { chatId: id }
    })

}

exports.getOneUser = async (data) => {
    // console.log('findAndLogUser(data)  - ' + data)
    // console.log(data)
    const user = await dataBot.Tutorial.findByPk(data);
    if (user) {
        // console.log(`???????????????????????? ?? id = ${data}`);
        // console.log(user.dataValues);
        return user.dataValues;
    } else {
        // console.log(`???????????????????????? ???? ????????????`);
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

exports.updateNewWeek = (id, week) => {
    console.log(id, week);
    dataBot.Intensive.update({ index_week: week}, {
        where: { chatId: id }
    })
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
            // ?????????? result ???????????????? ???????????????????? ?? ??????, ?????????????? ?????????? ???????? ??????????????????
            if (result[0] > 0) {
                // ???????? ?????????????????? ???????? ???? ???????? ????????????, ???????????? ?????? ???????????? ??????????????
                // console.log('???????????? ?????????????? ??????????????????');
                return 123;
            } else {
                // ???????? ???? ???????? ???????????? ???? ???????? ??????????????????, ???????????? ??????-???? ?????????? ???? ??????
                // console.log( '?????????????????? ???????????? ?????? ???????????????????? ????????????');
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
exports.getNumberIndex = async () => {
    try {
        const record = await dataBot.IndexOfSend57.findOne({
            where: { id: 1 }
        });
        return record.dataValues;
    } catch (error) {
        console.error(error);
        return false;
    }
};
exports.getNumberIndex_2 = async () => {
    try {
        const record = await dataBot.IndexOfSend57.findOne({
            where: { id: 2 }
        });
        return record.dataValues;
    } catch (error) {
        console.error(error);
        return false;
    }
};

exports.saveIndex57 = async (data) => {
    await dataBot.IndexOfSend57.update({ indexSent: data }, {
        where: { id: 1 }
    })
        .catch(err => {
            console.log(err)
        })

}
exports.saveIndex57_2 = async (data) => {
    await dataBot.IndexOfSend57.update({ indexSent: data }, {
        where: { id: 2 }
    })
        .catch(err => {
            console.log(err)
        })

}

exports.saveSandingToDB =  async (user, link, index) => {
    const newSending = {
        chatId: user.chatId,
        name:  user.name,
        birthday: user.birthday,
        numberMonth: user.numberMonth,
        numberWeek: user.numberWeek,
        link: link,
        indexVideo: index,
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