

export interface FetchRequest {
    isFetching: boolean,
    didSucceed: boolean,
    didFail: boolean,
    error: null | object 
}

export interface User {
    alias: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    userId: number;
}

export interface Users {
    [id: string]: User
}

export interface Post {
    id: number;
    likes: number;
    post: string;
    userId: number;
    created: string;
}

export interface Posts {
    [id: string]: Post
}

export interface Feed {
    timeline: number[];
    nextCursor?: string | null;
}

export interface Likes {
    likes: number[]
}

export interface Follower {
    id: number;
    userId: number;
}

export interface Followers {
    [id: string] : Follower;
}

export interface Subscription {
    id: number;
    subjectId: number;
}

export interface Subscriptions {
    [id: string] : Subscription;
}