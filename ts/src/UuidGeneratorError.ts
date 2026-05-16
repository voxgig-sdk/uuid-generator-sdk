
import { Context } from './Context'


class UuidGeneratorError extends Error {

  isUuidGeneratorError = true

  sdk = 'UuidGenerator'

  code: string
  ctx: Context

  constructor(code: string, msg: string, ctx: Context) {
    super(msg)
    this.code = code
    this.ctx = ctx
  }

}

export {
  UuidGeneratorError
}

