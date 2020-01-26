export function sortDirect(array, prop) {
    return array.sort((a, b) => {
        if (a[prop] > b[prop]) return 1
        else if (a[prop] < b[prop]) return -1
        return 0
    })
}

export function sortReverse(array, prop) {
    return array.sort((a, b) => {
        if (a[prop] < b[prop]) return 1
        else if (a[prop] > b[prop]) return -1
        return 0
    })
}
