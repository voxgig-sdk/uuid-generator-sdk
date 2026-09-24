
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UuidGeneratorSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = UuidGeneratorSDK.test()
    equal(testsdk instanceof UuidGeneratorSDK, true,
      'UuidGeneratorSDK.test() must return a client synchronously')
  })

})
