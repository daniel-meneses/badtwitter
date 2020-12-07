



export const parseQuery = (query: string, key: string) => {
    let arr = (query.split('?')[1] || query).split('&')
    let index = arr.findIndex(val => val.includes(key))
    return index >= 0 ? (arr[index].split('=')[1] || null) : null
}