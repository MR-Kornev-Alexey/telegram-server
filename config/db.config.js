module.exports = {
    HOST: "31.31.198.186",
    USER: "u1343110_bot",
    PASSWORD: "nanaec67",
    DB: "u1343110_bot",
    dialect: "mysql",
    charset: 'utf8mb4',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

//ALTER DATABASE telegrams CHARACTER SET = utf8mb4 COLLATE = utf8mb4_unicode_ci;