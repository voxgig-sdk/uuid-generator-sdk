

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UuidGeneratorSDK, BaseFeature, config, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DecodeEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('UUID_GENERATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UuidGeneratorSDK.test()
    const ent = testsdk.Decode()
    assert(null != ent)
  })


  test('validate', async (t) => {
    if (null == (config as any).feature?.validate) {
      t.skip('feature not present in this SDK: validate')
      return
    }
    const client = UuidGeneratorSDK.test(undefined, { feature: { validate: { active: true } } })
    await assert.rejects(client.Decode().load({"id":1} as any),
      (err: any) => 'validate_failed' === err.code)
  })



  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'decode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"decode":{"a":true,"h":"Decode","n":"decode","r":false,"t":"`$OBJECT`","key$":"decode","index$":0},"encode":{"a":true,"h":"Encode","n":"encode","r":false,"t":"`$OBJECT`","key$":"encode","index$":1},"id":{"a":true,"h":"Id","n":"id","r":false,"t":"`$STRING`","key$":"id","index$":2}},"id":{"field":"id","name":"id"},"name":"decode","op":{"load":{"input":"data","name":"load","points":[{"a":true,"co":{"id":"GET /decode/{uuid}","source":"openapi3","version":2},"g":{"params":[{"a":true,"ex":"b01eb720-171a-11ea-b949-73c91bba743d","k":"param","n":"id","or":"uuid","r":true,"t":"`$STRING`","index$":0}]},"k":"http","m":"GET","o":"/decode/{uuid}","q":{"exist":["id"]},"r":{"param":{"uuid":"id"}},"rs":{"kind":"json","media":"application/json"},"s":[{"lit":"decode"},{"var":"id"}],"t":{"req":"`reqdata`","res":"`body.decode`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"decode","name__orig":"decode","Name":"Decode","name_":"decode","name-":"decode","NAME":"DECODE","index$":0}, {"active":true,"entity":"decode","key$":"BasicDecodeFlow","kind":"basic","name":"BasicDecodeFlow","param":{},"step":[{"a":true,"d":{},"i":{"ref":"decode_ref01","srcdatavar":"decode_ref01_data","suffix":"_dt0"},"m":{"id":"decode01"},"o":"load","s":[],"v":[{"apply":"TextFieldMark","def":{"mark":"Mark01-decode_ref01"}}],"index$":0}]}, 'Decode', {"GET /decode/{uuid}":{"protocol":"http","parameters":[{"name":"uuid","in":"path","required":true,"description":"The UUID to decode","schema":{"type":"string","format":"uuid","example":"b01eb720-171a-11ea-b949-73c91bba743d"},"index$":0}]}}, { strict: LIVE_STRICT, t })
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let decode_ref01_data = Object.values(setup.data.existing.decode)[0] as any

    // LOAD
    const decode_ref01_ent = client.Decode()
    const decode_ref01_match_dt0: any = {}
    decode_ref01_match_dt0.id = decode_ref01_data.id
    const decode_ref01_data_dt0 = (await decode_ref01_ent.load(decode_ref01_match_dt0)).data()
    assert(decode_ref01_data_dt0.id === decode_ref01_data.id)


  })
})



// main.kit.test.live.strict is true (the default is true): a live
// request that fails, or a live test missing an input it needs,
// fails the test.
// An account with no record for a test to read skips it either way.
const LIVE_STRICT = true

function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/decode/DecodeTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = UuidGeneratorSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['decode01','decode02','decode03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UUID_GENERATOR_TEST_DECODE_ENTID': idmap,
    'UUID_GENERATOR_TEST_LIVE': 'FALSE',
    'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['UUID_GENERATOR_TEST_DECODE_ENTID']

  const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UUID_GENERATOR_TEST_DECODE_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new UuidGeneratorSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.UUID_GENERATOR_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  
