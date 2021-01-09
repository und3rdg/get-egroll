import 'mocha'
import { expect } from 'chai'
import { mockGithubHost } from './hardcoded'
import { download } from './download'
import axios from 'axios'
export const useAxios = axios.create({ baseURL: mockGithubHost })

describe('downloading file form server', () => {
    describe('check if download link to file is correct', () => {
        it('should return false, file on server is not exist', async () => {
            const dl = await download(
                '/GloriousEggroll/proton-ge-custom/releases/download/5.21-GE-1/bullshit-file-name.tar.gz',
                useAxios
            )
            expect(dl.check).to.be.false
        })
        it('should return true, link is correct, file on server exist', async () => {
            const dl = await download(
                '/GloriousEggroll/proton-ge-custom/releases/download/5.21-GE-1/Proton-5.21-GE-1.tar.gz',
                useAxios
            )
            expect(dl.check).to.be.true
        })
    })
})
