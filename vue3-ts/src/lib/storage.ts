const getLocalStr = (key:string):string|null => localStorage.getItem(key)
const saveLocalStr = (key:string, value:string) => localStorage.setItem(key, value)

const getLocal = (key:string):Record<string, any> => JSON.parse(localStorage.getItem(key) || '{}')
const saveLocal = (key:string, value:Record<string, any>) => localStorage.setItem(key, JSON.stringify(value))
const removeLocal = (key:string) => localStorage.removeItem(key)

const getSession = (key:string):Record<string, any> => JSON.parse(sessionStorage.getItem(key) || '{}')
const saveSession = (key:string, value:Record<string, any>) => sessionStorage.setItem(key, JSON.stringify(value))
const removeSession = (key:string) => sessionStorage.removeItem(key)

export {
	getLocalStr,
	saveLocalStr,
	getLocal,
	saveLocal,
	removeLocal,
	getSession,
	saveSession,
    removeSession
}