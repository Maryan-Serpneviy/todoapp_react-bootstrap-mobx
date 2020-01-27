export const sortDirect = (array, prop) => {
    return array.sort((a, b) => {
        if (a[prop] > b[prop]) return 1
        else if (a[prop] < b[prop]) return -1
        return 0
    })
}

export const sortReverse = (array, prop) => {
    return array.sort((a, b) => {
        if (a[prop] < b[prop]) return 1
        else if (a[prop] > b[prop]) return -1
        return 0
    })
}
