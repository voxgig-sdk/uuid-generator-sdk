"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
// AFTER the imports on purpose: TypeScript hoists `import` above any
// statement in the emitted CommonJS, so a loader placed above them would
// run only after every imported module had already been evaluated - and
// anything reading process.env at module scope would miss these values.
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DecodeEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UUID_GENERATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UuidGeneratorSDK.test();
        const ent = testsdk.Decode();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'decode.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": [{ "active": true, "name": "decode", "req": false, "type": "`$OBJECT`", "index$": 0 }, { "active": true, "name": "encode", "req": false, "type": "`$OBJECT`", "index$": 1 }, { "active": true, "name": "id", "req": false, "type": "`$STRING`", "index$": 2 }], "id": { "field": "id", "name": "id" }, "name": "decode", "op": { "load": { "input": "data", "name": "load", "points": [{ "active": true, "args": { "params": [{ "active": true, "example": "b01eb720-171a-11ea-b949-73c91bba743d", "kind": "param", "name": "id", "orig": "uuid", "reqd": true, "type": "`$STRING`", "index$": 0 }] }, "contract": { "id": "GET /decode/{uuid}", "json": "{\"operationId\":\"decodeUuid\",\"parameters\":[{\"description\":\"The UUID to decode\",\"in\":\"path\",\"name\":\"uuid\",\"required\":true,\"schema\":{\"example\":\"b01eb720-171a-11ea-b949-73c91bba743d\",\"format\":\"uuid\",\"type\":\"string\"}}],\"protocol\":\"http\",\"responses\":{\"200\":{\"content\":{\"application/json\":{\"schema\":{\"example\":{\"decode\":{\"content\":{\"clock\":\"14665 (usually random)\",\"node\":\"73:c9:1b:ba:74:3d (local multicast)\",\"time\":\"2019-12-05 04:49:57.961296.0 UTC\"},\"variant\":\"DCE 1.1, ISO/IEC 11578:1996\",\"version\":\"1 (time and node based)\"},\"encode\":{\"SIV\":\"234103610387309579079392911688732406845\",\"STR\":\"b01eb720-171a-11ea-b949-73c91bba743d\"}},\"properties\":{\"decode\":{\"properties\":{\"content\":{\"description\":\"Version-specific content (varies by UUID version)\",\"properties\":{\"clock\":{\"description\":\"Clock sequence (for version-1 UUIDs)\",\"type\":\"string\"},\"node\":{\"description\":\"Node identifier (for version-1 UUIDs)\",\"type\":\"string\"},\"time\":{\"description\":\"Timestamp (for version-1 UUIDs)\",\"type\":\"string\"}},\"type\":\"object\"},\"variant\":{\"description\":\"UUID variant\",\"type\":\"string\"},\"version\":{\"description\":\"UUID version and type\",\"type\":\"string\"}},\"type\":\"object\"},\"encode\":{\"properties\":{\"SIV\":{\"description\":\"UUID as a single integer value\",\"type\":\"string\"},\"STR\":{\"description\":\"UUID in string format\",\"format\":\"uuid\",\"type\":\"string\"}},\"type\":\"object\"}},\"type\":\"object\"}}},\"description\":\"Successfully decoded UUID\"},\"400\":{\"description\":\"Invalid UUID format\"},\"429\":{\"description\":\"Rate limit exceeded (60 requests per minute per IP)\"}},\"securitySource\":\"unspecified\"}", "source": "openapi3", "version": 1 }, "kind": "http", "method": "GET", "orig": "/decode/{uuid}", "rename": { "param": { "uuid": "id" } }, "segments": [{ "lit": "decode" }, { "var": "id" }], "select": { "exist": ["id"] }, "transform": { "req": "`reqdata`", "res": "`body.decode`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "decode", "name__orig": "decode", "Name": "Decode", "name_": "decode", "name-": "decode", "NAME": "DECODE", "index$": 0 }, { "active": true, "entity": "decode", "key$": "BasicDecodeFlow", "kind": "basic", "name": "BasicDecodeFlow", "param": {}, "step": [{ "active": true, "data": {}, "input": { "ref": "decode_ref01", "srcdatavar": "decode_ref01_data", "suffix": "_dt0" }, "match": { "id": "decode01" }, "op": "load", "spec": [], "valid": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-decode_ref01" } }], "index$": 0 }] }, 'Decode');
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let decode_ref01_data = Object.values(setup.data.existing.decode)[0];
        // LOAD
        const decode_ref01_ent = client.Decode();
        const decode_ref01_match_dt0 = {};
        decode_ref01_match_dt0.id = decode_ref01_data.id;
        const decode_ref01_data_dt0 = (await decode_ref01_ent.load(decode_ref01_match_dt0)).data();
        (0, node_assert_1.default)(decode_ref01_data_dt0.id === decode_ref01_data.id);
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/decode/DecodeTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UuidGeneratorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['decode01', 'decode02', 'decode03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UUID_GENERATOR_TEST_DECODE_ENTID': idmap,
        'UUID_GENERATOR_TEST_LIVE': 'FALSE',
        'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UUID_GENERATOR_TEST_DECODE_ENTID'];
    const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UUID_GENERATOR_TEST_DECODE_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.UuidGeneratorSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=DecodeEntity.test.js.map