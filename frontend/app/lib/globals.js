export const CMS_BASE_URI = 'cdn.contentful.com'
export const API_BASE_URI = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8080' : process.env.API_BASE_URI
export const API_VERSION = 'v1'
