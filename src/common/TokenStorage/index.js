import {TokenGetException} from './Exception'

export {
    TokenGetException
}

export default {
    get: () => {
        return localStorage.getItem('token')
        // return AsyncStorage.getItem('token')
        //   .then(result => {
        //     if (!result) {
        //       throw new TokenGetException()
        //     }
        //
        //     return result
        //   })
    },

    set: value => {
        return localStorage.setItem('token', value)
    }
}
