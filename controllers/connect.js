const callDb = require("./tutorial.controller");

module.exports = async function getOnekUser(data) {
    return new Promise((resolve, reject) => {
        callDb.getOneUser(data.id)
            .then((idCheck) => {
                if (idCheck) {
                    return idCheck
                } else {
                    // console.log("Пользователь не найден")
                    return '' //Пользователь не найден
                }
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            });
    });
}