/* eslint-disable curly */
export const sortDirect = (array: (number | string)[], prop: string) => {
    return array.sort((a: number | string, b: number | string): number => {
        if (a[prop] > b[prop]) return 1
        else if (a[prop] < b[prop]) return -1
        return 0
    })
}

export const sortReverse = (array: (number | string)[], prop: string) => {
    return array.sort((a: number | string, b: number | string): number => {
        if (a[prop] < b[prop]) return 1
        else if (a[prop] > b[prop]) return -1
        return 0
    })
}
