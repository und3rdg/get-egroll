import { getFileInfo } from './get'

export function init(isTest = false) {
    console.log(`init(${isTest})`)
    try {
        (async () => {
            const x = await getFileInfo(isTest)
        })()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

init()
