
export function isObjectEmpty(data: any): boolean {
  if (data != null ) {
    if (Array.isArray(data)) {
      return !data.length
    } else {
      return !Object.keys(data).length
    }
  }
  return true
}
