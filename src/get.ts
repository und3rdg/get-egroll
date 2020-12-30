import request from 'request'
import { JSDOM } from 'jsdom'

interface IgetFileInfo {
    version: string
    url: string|undefined
}

export async function getFileInfo(isTest = false): Promise<IgetFileInfo> {
    console.log('getFileInfo')

    const github = isTest ? 'http://mock.undg.xyz' : 'https://github.com'
    const releasePageUrl = '/GloriousEggroll/proton-ge-custom/releases/latest'
    const url = await resolveUrl(github, releasePageUrl)

    const version = 'todo'
    return { version, url }
}

function resolveUrl(host: string, releasePageUrl: string): Promise<string|undefined> {
    return new Promise((resolve) => {
        const url = host + releasePageUrl
        request(url, (err, response) => {
            if (err) console.error('err:', err)
            const dom = new JSDOM(response.body)
            const links = dom.window.document.querySelectorAll('a')
            const url = Object.values(links).find(
                (a) => a.href.indexOf('/GloriousEggroll/proton-ge-custom/releases/download/') !== -1
            )
            resolve(host + url?.href)
        })
    })
}
