import 'mocha'
import { expect } from 'chai'
import { getFileInfo } from './get'

const mockGithubHost = 'http://mock.undg.xyz'

describe('getInfo()',  async () => {

    it('should return object', async () => {
        expect(await getFileInfo(true)).to.have.keys('version', 'url')
    })
    it(`should return url: ${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/`, async () => {
        const fileInfo = await getFileInfo(true)
        expect(fileInfo.url).to.eql(`${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/5.21-GE-1/Proton-5.21-GE-1.tar.gz`)
    })
})
