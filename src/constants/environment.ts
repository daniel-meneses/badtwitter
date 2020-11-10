export let IS_SERVER = typeof window === 'undefined'
export let IS_PRODUCTION = process.env.NODE_ENV === 'production'
export let IS_DEVELOPMENT = process.env.NODE_ENV === 'development'

export let IS_CYPRESS = process.env.ENV == 'CY_TEST'

export let PROXY_TARGET = IS_PRODUCTION
                            ? 'https://still-shelf-30581.herokuapp.com'
                            : 'http://localhost:4000'
export let PROXY_DOMAIN = IS_PRODUCTION
                            ? 'arcane-shelf-19658.herokuapp.com'
                            : 'localhost'

export let LOCAL_API = 'http://localhost:3000/api/v1'
export let PROD_API = 'https://arcane-shelf-19658.herokuapp.com/api/v1'
export let API = IS_PRODUCTION ? PROD_API : LOCAL_API


export let STUB_REQ_CYPRESS_TEST = IS_CYPRESS
