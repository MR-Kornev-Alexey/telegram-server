module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("telegram", {
        chatId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_telegram: {
            type: Sequelize.STRING
        },
        role_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'user'
        },
        first_name_telegram: {
            type: Sequelize.STRING
        },
        last_name_telegram: {
            type: Sequelize.STRING
        },
        baby_name_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'данные не загружены'
        },
        birthday_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'data not entered'
        },
        pay_telegram:
             {type: Sequelize.INTEGER,
                    defaultValue: 0
        },
        real_name_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'data not entered'
        },
        email_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'data not entered'
        },
        access_all: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        access_dev_0_12: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        access_dev_1_3: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        access_emo:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        access_speak: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        access_dream: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });

    return Tutorial;
};