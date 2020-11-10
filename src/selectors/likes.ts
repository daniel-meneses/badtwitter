



export const postIsLiked = (state: any, postId: number): boolean => {
    let { likes } = state.likes;
    let allLikes = likes.postIds
    let isLiked = allLikes.includes(postId);
    return isLiked
} 