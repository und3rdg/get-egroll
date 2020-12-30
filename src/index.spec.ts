import { expect } from 'chai'
import 'mocha'
import { init } from './index'

describe('testing test', () => {
    it('should have init function', () => {
        expect(init(true)).to.eq(true)
    })
})
