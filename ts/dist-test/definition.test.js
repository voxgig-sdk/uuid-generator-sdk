"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const node_test_1 = require("node:test");
const __1 = require("..");
const definition_runner_1 = require("./definition-runner");
const utility_1 = require("./utility");
// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN = [
    {
        "entity": "decode",
        "accessor": "Decode",
        "op": "load",
        "method": "GET",
        "path": "/decode/{uuid}",
        "args": [
            {
                "name": "id",
                "wire": "uuid",
                "value": "b01eb720-171a-11ea-b949-73c91bba743d"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": {
            "encode": {
                "STR": "b01eb720-171a-11ea-b949-73c91bba743d",
                "SIV": "234103610387309579079392911688732406845"
            },
            "decode": {
                "variant": "DCE 1.1, ISO/IEC 11578:1996",
                "version": "1 (time and node based)",
                "content": {
                    "time": "2019-12-05 04:49:57.961296.0 UTC",
                    "clock": "14665 (usually random)",
                    "node": "73:c9:1b:ba:74:3d (local multicast)"
                }
            }
        },
        "idField": "id"
    },
    {
        "entity": "timestamp_first",
        "accessor": "TimestampFirst",
        "op": "list",
        "method": "GET",
        "path": "/generate/timestamp-first",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "timestamp_first",
        "accessor": "TimestampFirst",
        "op": "load",
        "method": "GET",
        "path": "/generate/timestamp-first/count/{count}",
        "args": [
            {
                "name": "count",
                "wire": "count",
                "value": 10
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "version_1",
        "accessor": "Version1",
        "op": "list",
        "method": "GET",
        "path": "/generate/v1",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "b01eb720-171a-11ea-b949-73c91bba743d"
        ],
        "idField": "id"
    },
    {
        "entity": "version_1",
        "accessor": "Version1",
        "op": "load",
        "method": "GET",
        "path": "/generate/v1/count/{count}",
        "args": [
            {
                "name": "count",
                "wire": "count",
                "value": 10
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "version_3",
        "accessor": "Version3",
        "op": "load",
        "method": "GET",
        "path": "/generate/v3/namespace/{namespace}/name/{name}",
        "args": [
            {
                "name": "name",
                "wire": "name",
                "value": "https://www.google.com/"
            },
            {
                "name": "namespace_id",
                "wire": "namespace",
                "value": "ns:url"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "version_4",
        "accessor": "Version4",
        "op": "list",
        "method": "GET",
        "path": "/generate/v4",
        "args": [],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "version_4",
        "accessor": "Version4",
        "op": "load",
        "method": "GET",
        "path": "/generate/v4/count/{count}",
        "args": [
            {
                "name": "count",
                "wire": "count",
                "value": 10
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    },
    {
        "entity": "version_5",
        "accessor": "Version5",
        "op": "load",
        "method": "GET",
        "path": "/generate/v5/namespace/{namespace}/name/{name}",
        "args": [
            {
                "name": "name",
                "wire": "name",
                "value": "https://www.uuidtools.com/generate"
            },
            {
                "name": "namespace_id",
                "wire": "namespace",
                "value": "ns:url"
            }
        ],
        "select": {},
        "headers": [],
        "query": [],
        "auth": null,
        "status": 200,
        "sample": [
            "x"
        ],
        "idField": "id"
    }
];
(0, node_test_1.describe)('definition', () => {
    for (const point of PLAN) {
        (0, node_test_1.test)(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
            const control = (0, utility_1.isControlSkipped)('entityOp', point.entity + '.' + point.op, 'definition');
            if (control.skip) {
                t.skip(control.reason || 'skipped via sdk-test-control.json');
                return;
            }
            await (0, definition_runner_1.runDefinitionPoint)(__1.SDK, point);
        });
    }
});
//# sourceMappingURL=definition.test.js.map