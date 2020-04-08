export let IS_SERVER = typeof window === 'undefined'
export let IS_PRODUCTION = process.env.NODE_ENV === 'production'
export let IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export let IS_TEST = process.env.NODE_ENV === 'test'
export let PROD_URL = 'https://still-shelf-30581.herokuapp.com/api/v1'
export let LOCAL_URL = 'http://localhost:4000/api/v1'
export let API = IS_DEVELOPMENT ? LOCAL_URL : PROD_URL
