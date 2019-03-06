const staticsBaseURL = 'http://example.com'

const baseURL0 = 'https://jsonplaceholder.typicode.com/'
// const baseURL1 = 'https://amazon-shop.herokuapp.com/api/'
// const baseURL1 = 'hhttps://tashkent-ms.herokuapp.com/api'
const baseURL1 = 'https://tashkent-ms.herokuapp.com/api'
// const baseURL1 = '192.168.43.187:8000/api'

export default {
    staticsBaseURL,

    apisauce: {
        baseURL: baseURL1,

        headers: {
            'Accept': 'application/json',
            // 'Cache-Control': 'no-cache',
            'Content-Type': 'application/json',
            // 'Authorization': 'Token 5cd7b816c4884448f2e3828361820aee44452195'
        }
    },
}
