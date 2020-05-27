export let IS_SERVER = typeof window === 'undefined'
export let IS_PRODUCTION = process.env.NODE_ENV === 'production'
export let IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export let IS_TEST = process.env.NODE_ENV === 'test'

export let LOCAL_API = 'http://localhost:4000/api/v1'
export let PROD_API = 'https://still-shelf-30581.herokuapp.com/api/v1'

export let API = IS_DEVELOPMENT ? LOCAL_API : PROD_API
