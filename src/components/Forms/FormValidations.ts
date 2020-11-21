

export const cannotStartWithSpace = (label: string, text: string): string => {
  return text.charAt(0) === " " ? `${label} cannot start with a space` : ''
}

export const cannotBeBlank = (label: string, text: string): string => {
  return text.length === 0 ? `${label} cannot be blank` : ''
}

export const min6Characters = (label: string, text: string): string => {
  return text.length < 6 ? `${label} must be at least 6 characters` : ''
}

export const max20Characters = (label: string, text: string): string => {
  return text.length > 20 ? `${label} must be less than 20 characters` : ''
}

export const max200Characters = (label: string, text: string): string => {
  return text.length > 200 ? `${label} must be less than 200 characters` : ''
}

export const mustOnlyContainLetters = (label: string, text: string): string => {
  let regex = /^[a-zA-Z]+$/
  return !regex.test(text) ? `${label} must only contain letters` : ''
}

export const emailFormat = (text: string): string => {
  var formatRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{1,}))$/;
  return !formatRegex.test(text) ? 'Invalid email format' : ''
}
