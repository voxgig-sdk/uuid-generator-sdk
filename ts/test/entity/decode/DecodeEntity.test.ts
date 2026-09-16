

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { UuidGeneratorSDK, BaseFeature, stdutil } from '../../..'

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


// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
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


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'decode.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[{"active":true,"name":"decode","req":false,"type":"`$OBJECT`","index$":0},{"active":true,"name":"encode","req":false,"type":"`$OBJECT`","index$":1},{"active":true,"name":"id","req":false,"type":"`$STRING`","index$":2}],"id":{"field":"id","name":"id"},"name":"decode","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"b01eb720-171a-11ea-b949-73c91bba743d","kind":"param","name":"id","orig":"uuid","reqd":true,"type":"`$STRING`","index$":0}]},"contract":{"id":"GET /decode/{uuid}","json":"{\"operationId\":\"decodeUuid\",\"parameters\":[{\"description\":\"The UUID to decode\",\"in\":\"path\",\"name\":\"uuid\",\"required\":true,\"schema\":{\"example\":\"b01eb720-171a-11ea-b949-73c91bba743d\",\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"decode\":{\"content\":{\"clock\":\"14665 (usually random)\",\"node\":\"73:c9:1b:ba:74:3d (local multicast)\",\"time\":\"2019-12-05 04:49:57.961296.0 UTC\"},\"variant\":\"DCE 1.1, ISO/IEC 11578:1996\",\"version\":\"1 (time and node based)\"},\"encode\":{\"SIV\":\"234103610387309579079392911688732406845\",\"STR\":\"b01eb720-171a-11ea-b949-73c91bba743d\"}},\"properties\":{\"decode\":{\"properties\":{\"content\":{\"description\":\"Version-specific content (varies by UUID version)\",\"properties\":{\"clock\":{\"description\":\"Clock sequence (for version-1 UUIDs)\",\"type\":\"string\"},\"node\":{\"description\":\"Node identifier (for version-1 UUIDs)\",\"type\":\"string\"},\"time\":{\"description\":\"Timestamp (for version-1 UUIDs)\",\"type\":\"string\"}},\"type\":\"object\"},\"variant\":{\"description\":\"UUID variant\",\"type\":\"string\"},\"version\":{\"description\":\"UUID version and type\",\"type\":\"string\"}},\"type\":\"object\"},\"encode\":{\"properties\":{\"SIV\":{\"description\":\"UUID as a single integer value\",\"type\":\"string\"},\"STR\":{\"description\":\"UUID in string format\",\"format\":\"uuid\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully decoded UUID\"},\"400\":{\"description\":\"Invalid UUID format\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/decode/{uuid}","rename":{"param":{"uuid":"id"}},"segments":[{"lit":"decode"},{"var":"id"}],"select":{"exist":["id"]},"transform":{"req":"`reqdata`","res":"`body.decode`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[]},"key$":"decode","name__orig":"decode","Name":"Decode","name_":"decode","name-":"decode","NAME":"DECODE","index$":0}, {"active":true,"entity":"decode","key$":"BasicDecodeFlow","kind":"basic","name":"BasicDecodeFlow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"decode_ref01","srcdatavar":"decode_ref01_data","suffix":"_dt0"},"match":{"id":"decode01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-decode_ref01"}}],"index$":0}]}, 'Decode')
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
  
