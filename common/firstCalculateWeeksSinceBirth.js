const convertBirthdate = require('./convertBirthdate')
async function firstCalculateWeeksSinceBirth(date) {
    const birthdate = await convertBirthdate(date)
    // console.log(birthdate)
    const today = new Date()
    const oneDay = 24 * 60 * 60 * 1000;
    let diffDays = Math.floor(Math.abs((birthdate.getTime() - today.getTime()) / (oneDay)));
    return Math.floor(diffDays / 7);
}

module.exports = firstCalculateWeeksSinceBirth