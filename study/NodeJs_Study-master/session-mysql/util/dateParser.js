function dateParser(date) {
    const dateStr = date.toString()
    let dateArr = dateStr.split(' ')
    let newArr = []
    for (let i=1; i<5; i++) {
        newArr.push(dateArr[i])
    }
    let result = newArr.join('-')
    return result
}

module.exports = {
    dateParser
}