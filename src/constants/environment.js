export let IS_SERVER = typeof window === 'undefined'
export let IS_PRODUCTION = process.env.NODE_ENV === 'production'
export let IS_DEVELOPMENT = process.env.NODE_ENV === 'development'
export let IS_TEST = process.env.NODE_ENV === 'test'



export let SERVER = IS_DEVELOPMENT ?
                'http://localhost:3000/'
              : 'https://arcane-shelf-19658.herokuapp.com/'


export let PROXY_TARGET = IS_DEVELOPMENT ? 'http://localhost:4000' : 'https://still-shelf-30581.herokuapp.com'
export let PROXY_DOMAIN = IS_DEVELOPMENT ? 'localhost' : 'arcane-shelf-19658.herokuapp.com'

export let LOCAL_API = 'http://localhost:3000/api/v1'
export let PROD_API = 'https://arcane-shelf-19658.herokuapp.com/api/v1'
export let API = IS_DEVELOPMENT ? LOCAL_API : PROD_API
