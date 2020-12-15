

export interface User {
    id: number;
    alias: string;
    firstName: string;
    lastName: string;
    avatar: string;
    bio: string;
    deviceId: string;
    private: boolean;
}

export interface UserMap {
    [id: string] : User;
}

export interface Tag {
    name: string;
    count: number;
}

export interface Trending {
    name: string;
    count: number;
}

export interface LinkPreview {
    title: string,
    description: string,
    image: string,
    url: string,
}

export interface NewsArticle {
    id: string;
    author: string;
    title: string;
    description: string;
    imageLarge: string;
    imageSmall: string;
    url: string;
    date: string;
    tag: string;
  }

export interface Subscription {
    id: number;
    accepted: boolean;
    userId: number;
    subjectId: number;
    createdAt: string;
}

export interface SubscriptionMap {
    [id: string] : Subscription;
}


export interface Post {
    id: number;
    likes: number;
    post: string;
    userId: number;
    createdAt: string;
    linkPreview: LinkPreview | null;
    tags: Tag[] | null;
}

export interface PostMap {
    [id: string] : Post;
}

export type FetchRequest = {
    isFetching?: boolean,
    didSucceed?: boolean,
    didFail?: boolean,
    error?: null | { error: string }
}

export interface Feed {
    timeline: number[];
    nextCursor?: string | null;
}

export interface Likes {
    likes: number[]
}