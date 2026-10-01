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
(0, node_test_1.describe)('Version5Entity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when UUID_GENERATOR_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('UUID_GENERATOR_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.UuidGeneratorSDK.test();
        const ent = testsdk.Version5();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.UUID_GENERATOR_TEST_LIVE;
        for (const op of ['load']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'version_5.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": {}, "name": "version_5", "op": { "load": { "input": "data", "name": "load", "points": [{ "a": true, "co": { "id": "GET /generate/v5/namespace/{namespace}/name/{name}", "source": "openapi3", "version": 2 }, "g": { "params": [{ "a": true, "ex": "https://www.uuidtools.com/generate", "k": "param", "n": "name", "or": "name", "r": true, "t": "`$STRING`", "index$": 0 }, { "a": true, "ex": "ns:url", "k": "param", "n": "namespace_id", "or": "namespace", "r": true, "t": "`$STRING`", "index$": 1 }] }, "k": "http", "m": "GET", "o": "/generate/v5/namespace/{namespace}/name/{name}", "q": { "exist": ["name", "namespace_id"] }, "r": { "param": { "namespace": "namespace_id" } }, "s": [{ "lit": "generate" }, { "lit": "v5" }, { "lit": "namespace" }, { "var": "namespace_id" }, { "lit": "name" }, { "var": "name" }], "t": { "req": "`reqdata`", "res": "`body`" }, "index$": 0 }], "key$": "load" } }, "relations": { "ancestors": [] }, "key$": "version_5", "name__orig": "version_5", "Name": "Version5", "name_": "version_5", "name-": "version-5", "NAME": "VERSION_5", "index$": 5 }, { "active": true, "entity": "version_5", "key$": "BasicVersion5Flow", "kind": "basic", "name": "BasicVersion5Flow", "param": {}, "step": [{ "a": true, "d": {}, "i": { "ref": "version_5_ref01", "srcdatavar": "version_5_ref01_data", "suffix": "_dt0" }, "m": { "id": "version_501", "namespace_id": "namespace01" }, "o": "load", "s": [], "v": [{ "apply": "TextFieldMark", "def": { "mark": "Mark01-version_5_ref01" } }], "index$": 0 }] }, 'Version5', { "GET /generate/v5/namespace/{namespace}/name/{name}": { "protocol": "http", "parameters": [{ "name": "namespace", "in": "path", "required": true, "description": "Namespace identifier. Must be 'ns:url', 'ns:dns', 'ns:OID', 'ns:X500' or a properly formatted UUID.", "schema": { "type": "string", "example": "ns:url" }, "index$": 0 }, { "name": "name", "in": "path", "required": true, "description": "Name string of any length. Can be base64 encoded by prefixing with 'base64:'.", "schema": { "type": "string", "example": "https://www.uuidtools.com/generate" }, "index$": 1 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let version_5_ref01_data = Object.values(setup.data.existing.version_5)[0];
        // LOAD: skipped — no entity id field and load requires path params.
        // Entity-var is declared here so later flow steps still compile.
        const version_5_ref01_ent = client.Version5();
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/version_5/Version5TestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.UuidGeneratorSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['version_501', 'version_502', 'version_503', 'namespace01'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'UUID_GENERATOR_TEST_VERSION_5_ENTID': idmap,
        'UUID_GENERATOR_TEST_LIVE': 'FALSE',
        'UUID_GENERATOR_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['UUID_GENERATOR_TEST_VERSION_5_ENTID'];
    const live = 'TRUE' === env.UUID_GENERATOR_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['UUID_GENERATOR_TEST_VERSION_5_ENTID'];
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
//# sourceMappingURL=Version5Entity.test.js.map