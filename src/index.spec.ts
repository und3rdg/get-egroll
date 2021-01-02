import { expect } from 'chai'
import 'mocha'
import { init } from './index'
import { useAxios} from './getInfo.spec'

describe('testing test', () => {
    it('should replaced github.com with testing host mock.undg.xyz', () => {
        expect(useAxios.defaults.baseURL).to.eql('http://mock.undg.xyz')
    })
    it('should have init function', () => {
        expect(init(useAxios)).to.eq(true)
    })
})
