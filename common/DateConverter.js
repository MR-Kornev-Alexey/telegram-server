class DateConverter {
    calculateWeeksSinceBirth = async (date) => {
        const birthdate = this.convertBirthdate(date);
        const today = new Date()
        const oneDay = 24 * 60 * 60 * 1000;
        let diffDays = Math.floor(Math.abs((birthdate.getTime() - today.getTime()) / (oneDay)));
        return Math.floor(diffDays / 7);
    }
    calculateMonthsSinceBirth = async (birthdate) => {
        const newBirthdate = this.convertBirthdate(birthdate);
        const today = new Date();
        let months = (today.getFullYear() - newBirthdate.getFullYear()) * 12 + today.getMonth() - newBirthdate.getMonth();
        if (today.getDate() < newBirthdate.getDate()) {
            const newFrom = new Date(today.getFullYear(), today.getMonth(), newBirthdate.getDate())
            if (today < newFrom && today.getMonth() === newFrom.getMonth() && today.getFullYear() % 4 !== 0) {
                months--
            }
        }
        return months
    }
    convertBirthdate(date) {
        const oldDay = Number(date.substring(0, 2));
        const oldMonth = Number(date.substring(3, 5));
        const oldYear = Number(date.substring(6));
        return new Date(oldYear, oldMonth - 1, oldDay);
    }
}
module.exports = DateConverter;