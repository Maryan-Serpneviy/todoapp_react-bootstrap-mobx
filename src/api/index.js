import makeRequest from '~/helpers/request'

const BASE_URL = 'https://jsonplaceholder.typicode.com'
const USERS = 'users'
const COMMENTS = 'comments'

const getUsers = () => makeRequest(`${BASE_URL}/${USERS}`)
const getComments = () => makeRequest(`${BASE_URL}/${COMMENTS}`)

export { getUsers, getComments }
