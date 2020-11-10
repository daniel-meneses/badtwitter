








export const getUserById = (state: any, id: number) => {
    let { byId } = state.users;
    let user = byId[id] || null;
    return user
}

export const getCurrentUser = (state: any) => {
    let users = state.users.byId
    let currentId = state.session.session.currentUserId
    let current = users[currentId]
    return current
}

export const isCurrentUser = (state: any, id: number) => {
    let currentUserId = state.session.session.currentUserId
    return id == currentUserId
}