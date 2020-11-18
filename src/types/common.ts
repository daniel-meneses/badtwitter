

export type FetchRequest = {
    isFetching?: boolean,
    didSucceed?: boolean,
    didFail?: boolean,
    error?: null | { error: string }
}

export interface User {
    alias: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    userId: number;
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

export type Subscription = {
    id: number;
    subjectId: number;
    insertedAt: string;
    updatedAt: string;
}

export type Subscriptions = {
    [id: string] : Subscription;
}