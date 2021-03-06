import 'mocha'
import axios from 'axios'
import { expect } from 'chai'
import { getDownloadInfo, isUpdateInstalled } from './getInfo'
import {mockGithubHost} from './hardcoded'

export const useAxios = axios.create({ baseURL: mockGithubHost })

describe('getInfo()', async () => {
    it('should return object', async () => {
        expect(await getDownloadInfo(useAxios)).to.have.keys('version', 'url', 'shouldUpdate')
    })
    it(`should return url: ${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/`, async () => {
        const fileInfo = await getDownloadInfo(useAxios)
        expect(fileInfo.url).to.eql(
            `${mockGithubHost}/GloriousEggroll/proton-ge-custom/releases/download/5.21-GE-1/Proton-5.21-GE-1.tar.gz`
        )
    })
    it('should return version: "Proton-5.21-GE-1"', async () => {
        const fileInfo = await getDownloadInfo(useAxios)
        expect(fileInfo.version).to.eql('Proton-5.21-GE-1')
    })
    it('should return true, varsion is already installed', async () => {
        expect(isUpdateInstalled('Proton-5.21-GE-1')).to.eq(true)
    })
    it('should return false, missing version', async () => {
        expect(isUpdateInstalled('Proton-1.11-GE-1')).to.eq(false)
    })

    it('should return false, update already installed', async () => {
        const fileInfo = await getDownloadInfo(useAxios)
        expect(fileInfo.shouldUpdate).to.eql(false)
    })
})
