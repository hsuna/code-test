//import Cookies from "js-cookie";
import { 
    getSession,
    saveSession,
    removeSession
} from '@/lib/storage'

const TOKEN_KEY:string = 'JC_TOKEN_FACEBOOK'
const USER_KEY:string = 'JC_USER_FACEBOOK'
// const token = tk => tk ? Cookies.set(USER_KEY, tk, { expires: 7200 }) : ( Cookies.get(USER_KEY) || '')
const getToken = ():string => getSession(TOKEN_KEY).token || ''
const setToken = (token:string) => saveSession(TOKEN_KEY, { token, expires: Date.now() })
const expiresToken = (expires:number):boolean => (Date.now() - Number(getSession(TOKEN_KEY).expires || 0)) < expires
const removeToken = () => removeSession(TOKEN_KEY)
const getUserData = ():Record<string, any> => getSession(USER_KEY) || {}
const setUserData = (data:Record<string, any>) => saveSession(USER_KEY, { ...data })
const removeUserData = () => removeSession(USER_KEY)

export {
    getToken,
    setToken,
    expiresToken,
    removeToken,
    getUserData,
    setUserData,
    removeUserData,
}