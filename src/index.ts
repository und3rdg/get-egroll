import { AxiosInstance } from 'axios'
import { getDownloadInfo, useAxios } from './getInfo'

export function init(axios: AxiosInstance = useAxios) {
    try {
        ;(async () => {
            const info = await getDownloadInfo(axios)
            console.log(`is ${info.version} installed? [${!info.shouldUpdate ? 'YES' : 'NO'}]`)
        })()
        return true
    } catch (err) {
        console.error(err)
        return false
    }
}

init()
