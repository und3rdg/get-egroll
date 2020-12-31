import 'mocha'
import { expect } from 'chai'
import { getDownloadInfo } from './get'

const mockGithubHost = 'http://mock.undg.xyz'

describe('getInfo()', async () => {
    it('should return object', async () => {
        expect(await getDownloadInfo(true)).to.have.keys('version', 'url')
    })
    it(`should return url: ${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/`, async () => {
        const fileInfo = await getDownloadInfo(true)
        expect(fileInfo.url).to.eql(
            `${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/5.21-GE-1/Proton-5.21-GE-1.tar.gz`
        )
    })
    it('should return version: "Proton-5.21-GE-1"', async () => {
        const fileInfo = await getDownloadInfo(true)
        expect(fileInfo.version).to.eql('Proton-5.21-GE-1')
    })
})
