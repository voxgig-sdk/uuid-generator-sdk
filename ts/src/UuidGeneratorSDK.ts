// UuidGenerator Ts SDK

import { DecodeEntity } from './entity/DecodeEntity'
import { TimestampFirstEntity } from './entity/TimestampFirstEntity'
import { Version1Entity } from './entity/Version1Entity'
import { Version3Entity } from './entity/Version3Entity'
import { Version4Entity } from './entity/Version4Entity'
import { Version5Entity } from './entity/Version5Entity'

export type * from './UuidGeneratorTypes'


import { inspect } from 'node:util'

import type { Context, Feature } from './types'

import { config } from './Config'
import { UuidGeneratorEntityBase } from './UuidGeneratorEntityBase'
import { Utility } from './utility/Utility'


import { BaseFeature } from './feature/base/BaseFeature'


const stdutil = new Utility()


class UuidGeneratorSDK {
  _mode: string = 'live'
  _options: any
  _utility = new Utility()
  _features: Feature[]
  _rootctx: Context

  constructor(options?: any) {

    this._rootctx = this._utility.makeContext({
      client: this,
      utility: this._utility,
      config,
      options,
      shared: new WeakMap()
    })

    this._options = this._utility.makeOptions(this._rootctx)

    const struct = this._utility.struct
    const getpath = struct.getpath
    const items = struct.items

    if (true === getpath(this._options.feature, 'test.active')) {
      this._mode = 'test'
    }

    this._rootctx.options = this._options

    this._features = []

    const featureAdd = this._utility.featureAdd
    const featureInit = this._utility.featureInit

    items(this._options.feature, (fitem: [string, any]) => {
      const fname = fitem[0]
      const fopts = fitem[1]
      if (fopts.active) {
        featureAdd(this._rootctx, this._rootctx.config.makeFeature(fname))
      }
    })

    if (null != this._options.extend) {
      for (let f of this._options.extend) {
        featureAdd(this._rootctx, f)
      }
    }

    for (let f of this._features) {
      featureInit(this._rootctx, f)
    }

    const featureHook = this._utility.featureHook
    featureHook(this._rootctx, 'PostConstruct')
  }


  options() {
    return this._utility.struct.clone(this._options)
  }


  utility() {
    return this._utility.struct.clone(this._utility)
  }


  async prepare(fetchargs?: any) {
    const utility = this._utility
    const struct = utility.struct
    const clone = struct.clone

    const {
      makeContext,
      makeFetchDef,
      prepareHeaders,
      prepareAuth,
    } = utility

    fetchargs = fetchargs || {}

    let ctx: Context = makeContext({
      opname: 'prepare',
      ctrl: fetchargs.ctrl || {},
    }, this._rootctx)

    const options = this._options

    // Build spec directly from SDK options + user-provided fetch args.
    const spec: any = {
      base: options.base,
      prefix: options.prefix,
      suffix: options.suffix,
      path: fetchargs.path || '',
      method: fetchargs.method || 'GET',
      params: fetchargs.params || {},
      query: fetchargs.query || {},
      headers: prepareHeaders(ctx),
      body: fetchargs.body,
      step: 'start',
    }

    ctx.spec = spec

    // Merge user-provided headers over SDK defaults.
    if (fetchargs.headers) {
      const uheaders = fetchargs.headers
      for (let key in uheaders) {
        spec.headers[key] = uheaders[key]
      }
    }

    // Apply SDK auth (apikey, auth prefix, etc.)
    const authResult = prepareAuth(ctx)
    if (authResult instanceof Error) {
      return authResult
    }

    return makeFetchDef(ctx)
  }


  async direct(fetchargs?: any) {
    const utility = this._utility
    const fetcher = utility.fetcher
    const makeContext = utility.makeContext

    const fetchdef = await this.prepare(fetchargs)
    if (fetchdef instanceof Error) {
      return fetchdef
    }

    let ctx: Context = makeContext({
      opname: 'direct',
      ctrl: (fetchargs || {}).ctrl || {},
    }, this._rootctx)

    try {
      const fetched = await fetcher(ctx, fetchdef.url, fetchdef)

      if (null == fetched) {
        return { ok: false, err: ctx.error('direct_no_response', 'response: undefined') }
      }
      else if (fetched instanceof Error) {
        return { ok: false, err: fetched }
      }

      const status = fetched.status

      // No body responses (204 No Content, 304 Not Modified) and explicit
      // zero content-length must skip JSON parsing — fetched.json() would
      // throw `Unexpected end of JSON input` on an empty body.
      const headers = fetched.headers
      const contentLength = headers && 'function' === typeof headers.get
        ? headers.get('content-length')
        : (headers || {})['content-length']
      const noBody = 204 === status || 304 === status || '0' === String(contentLength)

      let json: any = undefined
      if (!noBody) {
        try {
          json = 'function' === typeof fetched.json ? await fetched.json() : fetched.json
        }
        catch (parseErr) {
          // Body wasn't valid JSON — surface the raw response rather than
          // throwing. data stays undefined; callers can inspect status/headers.
          json = undefined
        }
      }

      return {
        ok: status >= 200 && status < 300,
        status,
        headers: fetched.headers,
        data: json,
      }
    }
    catch (err: any) {
      return { ok: false, err }
    }
  }



  _decode?: DecodeEntity

  // Idiomatic facade: `client.decode.list()` / `client.decode.load({ id })`.
  get decode(): DecodeEntity {
    return (this._decode ??= new DecodeEntity(this, undefined))
  }

  /** @deprecated Use `client.decode` instead. */
  Decode(data?: any) {
    const self = this
    return new DecodeEntity(self,data)
  }


  _timestamp_first?: TimestampFirstEntity

  // Idiomatic facade: `client.timestamp_first.list()` / `client.timestamp_first.load({ id })`.
  get timestamp_first(): TimestampFirstEntity {
    return (this._timestamp_first ??= new TimestampFirstEntity(this, undefined))
  }

  /** @deprecated Use `client.timestamp_first` instead. */
  TimestampFirst(data?: any) {
    const self = this
    return new TimestampFirstEntity(self,data)
  }


  _version_1?: Version1Entity

  // Idiomatic facade: `client.version_1.list()` / `client.version_1.load({ id })`.
  get version_1(): Version1Entity {
    return (this._version_1 ??= new Version1Entity(this, undefined))
  }

  /** @deprecated Use `client.version_1` instead. */
  Version1(data?: any) {
    const self = this
    return new Version1Entity(self,data)
  }


  _version_3?: Version3Entity

  // Idiomatic facade: `client.version_3.list()` / `client.version_3.load({ id })`.
  get version_3(): Version3Entity {
    return (this._version_3 ??= new Version3Entity(this, undefined))
  }

  /** @deprecated Use `client.version_3` instead. */
  Version3(data?: any) {
    const self = this
    return new Version3Entity(self,data)
  }


  _version_4?: Version4Entity

  // Idiomatic facade: `client.version_4.list()` / `client.version_4.load({ id })`.
  get version_4(): Version4Entity {
    return (this._version_4 ??= new Version4Entity(this, undefined))
  }

  /** @deprecated Use `client.version_4` instead. */
  Version4(data?: any) {
    const self = this
    return new Version4Entity(self,data)
  }


  _version_5?: Version5Entity

  // Idiomatic facade: `client.version_5.list()` / `client.version_5.load({ id })`.
  get version_5(): Version5Entity {
    return (this._version_5 ??= new Version5Entity(this, undefined))
  }

  /** @deprecated Use `client.version_5` instead. */
  Version5(data?: any) {
    const self = this
    return new Version5Entity(self,data)
  }




  static test(testoptsarg?: any, sdkoptsarg?: any) {
    const struct = stdutil.struct
    const setpath = struct.setpath
    const getdef = struct.getdef
    const clone = struct.clone
    const setprop = struct.setprop

    const sdkopts = getdef(clone(sdkoptsarg), {})
    const testopts = getdef(clone(testoptsarg), {})
    setprop(testopts, 'active', true)
    setpath(sdkopts, 'feature.test', testopts)

    const testsdk = new UuidGeneratorSDK(sdkopts)
    testsdk._mode = 'test'

    return testsdk
  }


  tester(testopts?: any, sdkopts?: any) {
    return UuidGeneratorSDK.test(testopts, sdkopts)
  }


  toJSON() {
    return { name: 'UuidGenerator' }
  }

  toString() {
    return 'UuidGenerator ' + this._utility.struct.jsonify(this.toJSON())
  }

  [inspect.custom]() {
    return this.toString()
  }

}




const SDK = UuidGeneratorSDK


export {
  stdutil,

  BaseFeature,
  UuidGeneratorEntityBase,

  UuidGeneratorSDK,
  SDK,
}


