

export interface UserResponse {
    id: number;
    alias: string;
    first_name: string;
    last_name: string;
    bio: string;
    avatar: string;
    private: boolean;
    device_id: string;
}

export interface TagResponse {
    name: string,
    count: number,
}

export interface SubscriptionResponse {
    id: number;
    accepted: boolean;
    user: UserResponse;
    subject: UserResponse;
    created_at: string;
}

export interface PostResponse {
    id: number;
    post: string;
    user: UserResponse;
    created_at: string;
    likes: number;
}

export interface FeedResponse {
    users: UserResponse[],
    posts: PostResponse[],
    after_cursor: string,
}