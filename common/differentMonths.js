function monthDiff(d1, d2) {
    let months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
}

diffInMonths = (from, to) => {
    let months = to.getMonth() - from.getMonth() + (12 * (to.getFullYear() - from.getFullYear()))
    if (to.getDate() < from.getDate()) {
        const newFrom = new Date(to.getFullYear(), to.getMonth(), from.getDate())
        if (to < newFrom && to.getMonth() === newFrom.getMonth() && to.getFullYear() % 4 !== 0) {
            months--
        }
    }
    return months
}

exports.calculating = (d1) =>{
// Извлекаем день, месяц и год
    const oldDay = Number(d1.substring(0, 2));
    const oldMonth = Number(d1.substring(3, 5)) - 1;
    const oldYear = Number(d1.substring(6));
    console.log(oldYear,"  ",oldMonth,"   ", oldDay)
    const fromNew  = new Date(oldYear,oldMonth, oldDay)
    console.log(fromNew)
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const to  = new Date(year,month, day)
    return diffInMonths(fromNew, to);
}