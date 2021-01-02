import { getDownloadInfo } from './getInfo'

export function init(isTest = false) {
    console.log(`init(${isTest})`)
    try {
        (async () => {
            const info = await getDownloadInfo(isTest)
            console.log(`is ${info.version} installed? [${!info.shouldUpdate ? "YES" : "NO"}]`)
        })()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

init()
