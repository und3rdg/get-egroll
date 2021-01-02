import axios, { AxiosInstance } from 'axios'
import fs from 'fs'
import { JSDOM } from 'jsdom'
import { homedir } from 'os'

interface IgetFileInfo {
    version: string | undefined
    url: string | undefined
    shouldUpdate: boolean
}

export const useAxios = axios.create({baseURL: 'https://github.com'})

export async function getDownloadInfo(axios: AxiosInstance = useAxios): Promise<IgetFileInfo> {
    const host = axios.defaults.baseURL // :)
    const releasePageUrl = '/GloriousEggroll/proton-ge-custom/releases/latest'
    const url = await getDownloadUrl({ host, releasePageUrl, axios })

    const version = getVersion(url)

    const shouldUpdate = !isUpdateInstalled(version)

    return { version, url, shouldUpdate }
}

interface IgetDownloadUrl {
    host: string | undefined
    releasePageUrl: string
    axios: AxiosInstance
}

async function getDownloadUrl({ host, releasePageUrl, axios = useAxios }: IgetDownloadUrl): Promise<string | undefined> {
    try {
        const releasePageLink = releasePageUrl
        const response = await axios.get(releasePageLink)
        // @TODO check HTTP status codes. I remember only 418 
        if(response.status <= 200 && response.status >= 302) throw response.statusText

        const dom = new JSDOM(response.data)
        const links = dom.window.document.querySelectorAll('a')
        const url = Object.values(links).find(
            (a) => a.href.indexOf('/GloriousEggroll/proton-ge-custom/releases/download/') !== -1
        )
        if(!url) throw "No download link found"
        return host + url.href
    } catch (err) {
        console.error('err:', err)
        return undefined
    }
}

function getVersion(url: string | undefined): string {
    const fileName = url?.split('/').splice(-1)[0]
    return removeExtension(fileName)
}

function removeExtension(url: string | undefined): string {
    return url?.split('.tar.gz')[0] ?? 'missingUrl'
}

export function isUpdateInstalled(version: string | undefined): boolean {
    const steamDir = homedir() + '/.steam/steam/compatibilitytools.d/'
    const isDirExist = fs.existsSync(steamDir + version)
    return isDirExist
}
