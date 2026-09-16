

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


describe('TimestampFirstEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('UUID_GENERATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UuidGeneratorSDK.test()
    const ent = testsdk.TimestampFirst()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'timestamp_first.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"timestamp_first","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /generate/timestamp-first","json":"{\"operationId\":\"generateTimestampFirstSingle\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"maxItems\":1,\"minItems\":1,\"type\":\"array\"}}},\"description\":\"Successfully generated UUID(s)\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generate/timestamp-first","segments":[{"lit":"generate"},{"lit":"timestamp-first"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":10,"kind":"param","name":"count","orig":"count","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /generate/timestamp-first/count/{count}","json":"{\"operationId\":\"generateTimestampFirstMultiple\",\"parameters\":[{\"description\":\"Number of UUIDs to generate (1-100)\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"example\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successfully generated UUIDs\"},\"400\":{\"description\":\"Invalid count parameter\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generate/timestamp-first/count/{count}","segments":[{"lit":"generate"},{"lit":"timestamp-first"},{"lit":"count"},{"var":"count"}],"select":{"exist":["count"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["count"]]},"key$":"timestamp_first","name__orig":"timestamp_first","Name":"TimestampFirst","name_":"timestamp_first","name-":"timestamp-first","NAME":"TIMESTAMP_FIRST","index$":1}, {"active":true,"entity":"timestamp_first","key$":"BasicTimestampFirstFlow","kind":"basic","name":"BasicTimestampFirstFlow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"timestamp_first_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"timestamp_first_ref01","srcdatavar":"timestamp_first_ref01_data","suffix":"_dt0"},"match":{"id":"timestamp_first01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-timestamp_first_ref01"}}],"index$":1}]}, 'TimestampFirst')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let timestamp_first_ref01_data = Object.values(setup.data.existing.timestamp_first)[0] as any

    // LIST
    const timestamp_first_ref01_ent = client.TimestampFirst()
    const timestamp_first_ref01_match: any = {}

    const timestamp_first_ref01_list = (await timestamp_first_ref01_ent.list(timestamp_first_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/timestamp_first/TimestampFirstTestData.json')

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
    ['timestamp_first01','timestamp_first02','timestamp_first03','count01','count02','count03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID': idmap,
    'UUID_GENERATOR_TEST_LIVE': 'FALSE',
    'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID']

  const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID']
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
  
