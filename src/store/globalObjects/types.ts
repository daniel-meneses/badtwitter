

export interface IUser {
  alias: string;
  avatar: string;
  bio: string;
  first_name: string;
  last_name: string;
  user_id: number;
}

export interface IPost {
  id: number;
  user_id: number;
  post: any;
  created: string;
  likes: number;
}
