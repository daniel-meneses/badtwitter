export const BASE = 'http://localhost:3000'
export const HOME_PAGE = `${BASE}/home`
export const EXPLORE_PAGE = `${BASE}/explore`
export const REGISTER_PAGE = `${BASE}/signup`
export const LOGIN_PAGE = `${BASE}/login`

export const HOME_FEED = `${BASE}/api/v1/subscriptions/posts?limit=40&subscriptions=true`
export const LIKES = `${BASE}/api/v1/like`
export const TAGS = `${BASE}/api/v1/tags?limit=100&length=4&group_by=title`
export const GLOBAL_FEED = `${BASE}/api/v1/posts?limit=40`
export const NEWS_FEED = `${BASE}/api/feed/news?page=1&limit=40`
export const FOLLOWERS = `${BASE}/api/v1/subscriptions?accepted=true&subscriber=false`
export const SUBSCRIPTIONS = `${BASE}/api/v1/subscriptions?accepted=true&subscriber=true`
export const SELF_PROFILE = `${BASE}/api/v1/posts?user_id=1&limit=40`
export const USER_PROFILE = `${BASE}/api/v1/posts?user_id=4&limit=40`
export const LOGIN = `${BASE}/api/v1/accounts/session`