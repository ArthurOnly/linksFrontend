import {setAccount,setToken,setRefreshToken, removeAccount, removeRefreshToken, removeToken, getAccount} from '../helpers/account'
import { SIGN_UP, SIGN_IN, SIGN_OUT, INIT_ACC, REFRESH_TOKEN } from '../actions/account.actions'

const initialState = {
    account: null
}

export default function(state = initialState,action){
    const {type,payload} = action
    switch(type){
        case SIGN_IN:
        case SIGN_UP:{
            const response = payload.data
            const account = response ? response.data : null
            const metadata = response ? response.metadata : null

            const token = metadata ? metadata.token : null
            const refreshToken = metadata ? metadata.refreshToken : null

            if(account) setAccount(account)
            if(token) setToken(token)
            if(refreshToken) setRefreshToken(refreshToken)

            return { ...state,account: account}}

        case SIGN_OUT:
            removeAccount()
            removeToken()
            removeRefreshToken()

            return { ...state,account: null}
        
        case REFRESH_TOKEN:{
            const response = payload.data
            const metadata = response ? response.metadata : null

            const token = metadata ? metadata.token : null
            if(token) setToken(token)

            return state
        }
        
        case INIT_ACC:
            const account = getAccount()
            return { ...state, account: account}
        default:
            return state
    }
}