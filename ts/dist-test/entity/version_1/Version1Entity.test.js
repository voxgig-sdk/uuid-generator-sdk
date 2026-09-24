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
(0, node_test_1.describe)('Version1Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UUID_GENERATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UuidGeneratorSDK.test();
        const ent = testsdk.Version1();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE;
        for (const op of ['list', 'load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'version_1.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "version_1", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /generate/v1", "source": "openapi3", "version": 2 }, "g": {}, "k": "http", "m": "GET", "o": "/generate/v1", "q": {}, "r": {}, "s": [{ "lit": "generate" }, { "lit": "v1" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "list" }, "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /generate/v1/count/{count}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": 10, "k": "param", "n": "count", "or": "count", "r": true, "t": "`$INTEGER`", "index$": 0 }] }, "k": "http", "m": "GET", "o": "/generate/v1/count/{count}", "q": { "exist": ["count"] }, "r": {}, "s": [{ "lit": "generate" }, { "lit": "v1" }, { "lit": "count" }, { "var": "count" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "version_1", "name__orig": "version_1", "Name": "Version1", "name_": "version_1", "name-": "version-1", "NAME": "VERSION_1", "index$": 2 }, { "active": true, "entity": "version_1", "key$": "BasicVersion1Flow", "kind": "basic", "name": "BasicVersion1Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "version_1_ref01" } }], "index$": 0 }, { "a": true, "d": {}, "i": { "ref": "version_1_ref01", "srcdatavar": "version_1_ref01_data", "suffix": "_dt0" }, "m": { "id": "version_101" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-version_1_ref01" } }], "index$": 1 }] }, 'Version1', { "GET /generate/v1": { "protocol": "http", "operationId": "generateV1Single", "responses": { "200": { "description": "Successfully generated UUID(s)", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "string", "format": "uuid", "example": "b01eb720-171a-11ea-b949-73c91bba743d", "key$": "items" }, "minItems": 1, "maxItems": 1 } } } }, "429": { "description": "Rate limit exceeded (60 requests per minute per IP)" } }, "parameters": [], "securitySource": "unspecified" }, "GET /generate/v1/count/{count}": { "protocol": "http", "operationId": "generateV1Multiple", "responses": { "200": { "description": "Successfully generated UUIDs", "content": { "application/json": { "schema": { "type": "array", "items": { "type": "string", "format": "uuid", "key$": "items" } } } } }, "400": { "description": "Invalid count parameter" }, "429": { "description": "Rate limit exceeded (60 requests per minute per IP)" } }, "parameters": [{ "name": "count", "in": "path", "required": true, "description": "Number of UUIDs to generate (1-100)", "schema": { "type": "integer", "minimum": 1, "maximum": 100, "example": 10 }, "index$": 0 }], "securitySource": "unspecified" } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let version_1_ref01_data = Object.values(setup.data.existing.version_1)[0];
        // LIST
        const version_1_ref01_ent = client.Version1();
        const version_1_ref01_match = {};
        const version_1_ref01_list = (await version_1_ref01_ent.list(version_1_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/version_1/Version1TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UuidGeneratorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['version_101', 'version_102', 'version_103'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UUID_GENERATOR_TEST_VERSION_1_ENTID': idmap,
        'UUID_GENERATOR_TEST_LIVE': 'FALSE',
        'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UUID_GENERATOR_TEST_VERSION_1_ENTID'];
    const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UUID_GENERATOR_TEST_VERSION_1_ENTID'];
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
//# sourceMappingURL=Version1Entity.test.js.map