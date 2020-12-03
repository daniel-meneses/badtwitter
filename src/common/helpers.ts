



export const parseQuery = (query: string, key: string) => {
    let arr = (query.split('?')[1] || query).split('&')
    let index = arr.findIndex(val => val.includes(key))
    return index >= 0 ? (arr[index].split('=')[1] || null) : null
}

var parseFeed = (feed) => {
    let {posts=[], users=[], after_cursor} = feed;
    let pobj = {}
    let timeline = [];
    posts.map( p => {
        timeline.push(p.id)
        pobj[p.id] = {...p}
    })
    users.map( u => {
        pobj[u.id] = {...u}
    })
    return ({
        timeline,
        posts: pobj,
        users: users,
        cursor: after_cursor
    })
}