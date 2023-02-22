async function convertBirthdate(date) {
    const oldDay = Number(date.substring(0, 2));
    const oldMonth = Number(date.substring(3, 5));
    const oldYear = Number(date.substring(6));
    return new Date(oldYear, oldMonth - 1, oldDay)
}
module.exports = convertBirthdate