

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


describe('Version1Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('UUID_GENERATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UuidGeneratorSDK.test()
    const ent = testsdk.Version1()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE
    for (const op of ['list', 'load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'version_1.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"version_1","op":{"list":{"input":"data","name":"list","points":[{"active":true,"args":{},"contract":{"id":"GET /generate/v1","json":"{\"operationId\":\"generateV1Single\",\"parameters\":[],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"example\":\"b01eb720-171a-11ea-b949-73c91bba743d\",\"format\":\"uuid\",\"type\":\"string\"},\"maxItems\":1,\"minItems\":1,\"type\":\"array\"}}},\"description\":\"Successfully generated UUID(s)\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generate/v1","segments":[{"lit":"generate"},{"lit":"v1"}],"select":{},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"list"},"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":10,"kind":"param","name":"count","orig":"count","reqd":true,"type":"`$INTEGER`","index$":0}]},"contract":{"id":"GET /generate/v1/count/{count}","json":"{\"operationId\":\"generateV1Multiple\",\"parameters\":[{\"description\":\"Number of UUIDs to generate (1-100)\",\"in\":\"path\",\"name\":\"count\",\"required\":true,\"schema\":{\"example\":10,\"maximum\":100,\"minimum\":1,\"type\":\"integer\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"type\":\"array\"}}},\"description\":\"Successfully generated UUIDs\"},\"400\":{\"description\":\"Invalid count parameter\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generate/v1/count/{count}","segments":[{"lit":"generate"},{"lit":"v1"},{"lit":"count"},{"var":"count"}],"select":{"exist":["count"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["count"]]},"key$":"version_1","name__orig":"version_1","Name":"Version1","name_":"version_1","name-":"version-1","NAME":"VERSION_1","index$":2}, {"active":true,"entity":"version_1","key$":"BasicVersion1Flow","kind":"basic","name":"BasicVersion1Flow","param":{},"step":[{"active":true,"data":{},"input":{},"match":{},"op":"list","spec":[],"valid":[{"apply":"ItemExists","def":{"ref":"version_1_ref01"}}],"index$":0},{"active":true,"data":{},"input":{"ref":"version_1_ref01","srcdatavar":"version_1_ref01_data","suffix":"_dt0"},"match":{"id":"version_101"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-version_1_ref01"}}],"index$":1}]}, 'Version1')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let version_1_ref01_data = Object.values(setup.data.existing.version_1)[0] as any

    // LIST
    const version_1_ref01_ent = client.Version1()
    const version_1_ref01_match: any = {}

    const version_1_ref01_list = (await version_1_ref01_ent.list(version_1_ref01_match)).map((e: any) => e.data())



  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/version_1/Version1TestData.json')

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
    ['version_101','version_102','version_103','count01','count02','count03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UUID_GENERATOR_TEST_VERSION_1_ENTID': idmap,
    'UUID_GENERATOR_TEST_LIVE': 'FALSE',
    'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['UUID_GENERATOR_TEST_VERSION_1_ENTID']

  const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UUID_GENERATOR_TEST_VERSION_1_ENTID']
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
  
