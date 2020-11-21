



export const reqStart = (type: string) => ({type: `${type}_START`})
export const reqSuccess = (type: string) => ({type: `${type}_SUCCESS`})
export const reqFail = (type: string, error: any) => ({type: `${type}_FAIL`, error})
