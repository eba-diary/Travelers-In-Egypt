export const CMS_BASE_URI = 'cdn.contentful.com'
export const API_BASE_URI = process.env.NODE_ENV === 'dev' ? 'http://localhost:8080' : process.env.API_BASE_URI