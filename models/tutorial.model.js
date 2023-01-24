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
        location:{
            type: Sequelize.STRING,
            defaultValue: 'data not entered'
        },
        source:{
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
        },
        intensive: {
            type: Sequelize.STRING,
            defaultValue: 'no'
        }

    });
    const HomeworksWatch = sequelize.define('homeworksWatch', {
        userId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        idHomework: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
    });
    const HomeworksMark = sequelize.define('homeworksMark', {
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: Sequelize.BIGINT,
        },
        idHomework: {
            type: Sequelize.STRING,
        },
        content: {
            type: Sequelize.STRING,
        },
    });
    const SendBlocked = sequelize.define('blocked', {
        message: {
            type: Sequelize.STRING,
        },
        chatIdGroup: {
            type: Sequelize.STRING,
        },
        titleGroup: {
            type: Sequelize.STRING,
        },
        chatIdUser: {
            type: Sequelize.STRING,
        },
        nicknameUser: {
            type: Sequelize.STRING,
        },
        realNameUser: {
            type: Sequelize.STRING,
        }
    });
    const Intensive = sequelize.define("intensive", {
        chatId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_telegram: {
            type: Sequelize.STRING
        },
        first_name_telegram: {
            type: Sequelize.STRING
        },
        last_name_telegram: {
            type: Sequelize.STRING
        },
        baby_name_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'not-data'
        },
        birthday_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'not-data'
        },
        pay_telegram:
            {type: Sequelize.INTEGER,
                defaultValue: 0
            },
        real_name_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'not-data'
        },
        email_telegram: {
            type: Sequelize.STRING,
            defaultValue: 'not-data'
        },
        status: {
            type: Sequelize.STRING,
            defaultValue: 'member'
        },
        note: {
             type: Sequelize.STRING,
            defaultValue: 'note'
        },
        send:{
            type: Sequelize.BOOLEAN,
            defaultValue: true
        },
        news:{
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        number: {
            type: Sequelize.STRING,
            defaultValue: 'number-1'
        },
        add1: {
            type: Sequelize.STRING,
            defaultValue: 'add1'
        },
        add2: {
            type: Sequelize.STRING,
            defaultValue: 'add2'
        }
    });
    const Helen = sequelize.define("helen", {
        chatId: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true
        },
        name_telegram: {
            type: Sequelize.STRING
        },
        first_name_telegram: {
            type: Sequelize.STRING
        },
        last_name_telegram: {
            type: Sequelize.STRING
        }
    });
    const Sending = sequelize.define("sending", {
        chatId: {
            type: Sequelize.BIGINT,
        },
        name: {
            type: Sequelize.STRING
        },
        birthday: {
            type: Sequelize.STRING
        },
       numberMonth: {
            type: Sequelize.INTEGER
        },
        numberWeek: {
            type: Sequelize.INTEGER
        },
        link: {
            type: Sequelize.TEXT
        },
        indexVideo: {
            type: Sequelize.STRING
        },
        indexWeek: {
            type: Sequelize.STRING
        }
    });
    const IndexOfSend57 = sequelize.define("index57", {
        indexSent: {
            type: Sequelize.INTEGER,
        }
    });
    return { Tutorial, HomeworksMark, Intensive, SendBlocked, Helen, Sending, IndexOfSend57};
};