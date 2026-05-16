
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { UuidGeneratorSDK } from '..'


describe('exists', async () => {

  test('test-mode', async () => {
    const testsdk = await UuidGeneratorSDK.test()
    equal(null !== testsdk, true)
  })

})
