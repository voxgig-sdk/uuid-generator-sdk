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
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('TimestampFirstEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UUID_GENERATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UuidGeneratorSDK.test();
        const ent = testsdk.TimestampFirst();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'timestamp_first.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "timestamp_first", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /generate/timestamp-first", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/generate/timestamp-first", "q": {}, "r": {}, "s": [{ "lit": "generate" }, { "lit": "timestamp-first" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /generate/timestamp-first/count/{count}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 10, "k": "param", "n": "count", "or": "count", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/generate/timestamp-first/count/{count}", "q": { "exist": ["count"] }, "r": {}, "s": [{ "lit": "generate" }, { "lit": "timestamp-first" }, { "lit": "count" }, { "var": "count" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "timestamp_first", "name__orig": "timestamp_first", "Name": "TimestampFirst", "name_": "timestamp_first", "name-": "timestamp-first", "NAME": "TIMESTAMP_FIRST", "index$": 1 }, { "active": true, "entity": "timestamp_first", "key$": "BasicTimestampFirstFlow", "kind": "basic", "name": "BasicTimestampFirstFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "timestamp_first_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "timestamp_first_ref01", "srcdatavar": "timestamp_first_ref01_data", "suffix": "_dt0" }, "m": { "id": "timestamp_first01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-timestamp_first_ref01" } }], "index$": 1 }] }, 'TimestampFirst', { "GET /generate/timestamp-first": { "protocol": "http", "operationId": "generateTimestampFirstSingle", "responses": { "200": { "description": "Successfully generated UUID(s)", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "string", "format": "uuid", "key$": "items" }, "minItems": 1, "maxItems": 1 } } } }, "429": { "description": "Rate limit exceeded (60 requests per minute per IP)" } }, "parameters": [], "securitySource": "unspecified" }, "GET /generate/timestamp-first/count/{count}": { "protocol": "http", "operationId": "generateTimestampFirstMultiple", "responses": { "200": { "description": "Successfully generated UUIDs", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "string", "format": "uuid", "key$": "items" } } } } }, "400": { "description": "Invalid count parameter" }, "429": { "description": "Rate limit exceeded (60 requests per minute per IP)" } }, "parameters": [{ "name": "count", "in": "path", "required": true, "description": "Number of UUIDs to generate (1-100)", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "example": 10 }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let timestamp_first_ref01_data = Object.values(setup.data.existing.timestamp_first)[0];
        // LIST
        const timestamp_first_ref01_ent = client.TimestampFirst();
        const timestamp_first_ref01_match = {};
        const timestamp_first_ref01_list = (await timestamp_first_ref01_ent.list(timestamp_first_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/timestamp_first/TimestampFirstTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UuidGeneratorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['timestamp_first01', 'timestamp_first02', 'timestamp_first03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID': idmap,
        'UUID_GENERATOR_TEST_LIVE': 'FALSE',
        'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID'];
    const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UUID_GENERATOR_TEST_TIMESTAMP_FIRST_ENTID'];
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
//# sourceMappingURL=TimestampFirstEntity.test.js.map