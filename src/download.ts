import axios, { AxiosInstance } from 'axios'
import { githubHost } from './hardcoded'
export const useAxios = axios.create({ baseURL: githubHost })

export async function download(url: string, axios: AxiosInstance = useAxios) {
    return {
        check: await check(url, axios)
    }
}

async function check(url: string, axios: AxiosInstance = useAxios) {
    try {
        const res = await axios.get(url)
        const code = res.status
        return code === 200
    } catch (e) {
        return false
    }
}
