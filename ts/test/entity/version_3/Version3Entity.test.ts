

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


describe('Version3Entity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
  afterEach(liveDelay('UUID_GENERATOR_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = UuidGeneratorSDK.test()
    const ent = testsdk.Version3()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE
    for (const op of ['load']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'version_3.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":[],"name":"version_3","op":{"load":{"input":"data","name":"load","points":[{"active":true,"args":{"params":[{"active":true,"example":"https://www.google.com/","kind":"param","name":"name","orig":"name","reqd":true,"type":"`$STRING`","index$":0},{"active":true,"example":"ns:url","kind":"param","name":"namespace_id","orig":"namespace","reqd":true,"type":"`$STRING`","index$":1}]},"contract":{"id":"GET /generate/v3/namespace/{namespace}/name/{name}","json":"{\"operationId\":\"generateV3\",\"parameters\":[{\"description\":\"Namespace identifier. Must be 'ns:url', 'ns:dns', 'ns:OID', 'ns:X500' or a properly formatted UUID.\",\"in\":\"path\",\"name\":\"namespace\",\"required\":true,\"schema\":{\"example\":\"ns:url\",\"type\":\"string\"}},{\"description\":\"Name string of any length. Can be base64 encoded by prefixing with 'base64:'.\",\"in\":\"path\",\"name\":\"name\",\"required\":true,\"schema\":{\"example\":\"https://www.google.com/\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"items\":{\"format\":\"uuid\",\"type\":\"string\"},\"maxItems\":1,\"minItems\":1,\"type\":\"array\"}}},\"description\":\"Successfully generated UUID\"},\"400\":{\"description\":\"Invalid namespace or name parameter\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}","source":"openapi3","version":1},"kind":"http","method":"GET","orig":"/generate/v3/namespace/{namespace}/name/{name}","rename":{"param":{"namespace":"namespace_id"}},"segments":[{"lit":"generate"},{"lit":"v3"},{"lit":"namespace"},{"var":"namespace_id"},{"lit":"name"},{"var":"name"}],"select":{"exist":["name","namespace_id"]},"transform":{"req":"`reqdata`","res":"`body`"},"index$":0}],"key$":"load"}},"relations":{"ancestors":[["namespace","name"]]},"key$":"version_3","name__orig":"version_3","Name":"Version3","name_":"version_3","name-":"version-3","NAME":"VERSION_3","index$":3}, {"active":true,"entity":"version_3","key$":"BasicVersion3Flow","kind":"basic","name":"BasicVersion3Flow","param":{},"step":[{"active":true,"data":{},"input":{"ref":"version_3_ref01","srcdatavar":"version_3_ref01_data","suffix":"_dt0"},"match":{"id":"version_301","namespace_id":"namespace01"},"op":"load","spec":[],"valid":[{"apply":"TextFieldMark","def":{"mark":"Mark01-version_3_ref01"}}],"index$":0}]}, 'Version3')
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let version_3_ref01_data = Object.values(setup.data.existing.version_3)[0] as any

    // LOAD: skipped — no entity id field and load requires path params.
    // Entity-var is declared here so later flow steps still compile.
    const version_3_ref01_ent = client.Version3()


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/version_3/Version3TestData.json')

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
    ['version_301','version_302','version_303','namespace01','namespace02','namespace03','name01','name02','name03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'UUID_GENERATOR_TEST_VERSION_3_ENTID': idmap,
    'UUID_GENERATOR_TEST_LIVE': 'FALSE',
    'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['UUID_GENERATOR_TEST_VERSION_3_ENTID']

  const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['UUID_GENERATOR_TEST_VERSION_3_ENTID']
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
  
