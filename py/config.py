# UuidGenerator SDK configuration


def make_config():
    return {
        "main": {
            "name": "UuidGenerator",
        },
        "feature": {
            "test": {
        "options": {
          "active": False,
        },
      },
        },
        "options": {
            "base": "https://www.uuidtools.com/api",
            "auth": {
                "prefix": "Bearer",
            },
            "headers": {
        "content-type": "application/json",
      },
            "entity": {
                "decode": {},
                "timestamp_first": {},
                "version_1": {},
                "version_3": {},
                "version_4": {},
                "version_5": {},
            },
        },
        "entity": {
      "decode": {
        "fields": [
          {
            "name": "decode",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 0,
          },
          {
            "name": "encode",
            "req": False,
            "type": "`$OBJECT`",
            "active": True,
            "index$": 1,
          },
        ],
        "name": "decode",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "b01eb720-171a-11ea-b949-73c91bba743d",
                      "kind": "param",
                      "name": "id",
                      "orig": "uuid",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/decode/{uuid}",
                "parts": [
                  "decode",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "uuid": "id",
                  },
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "timestamp_first": {
        "fields": [],
        "name": "timestamp_first",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/generate/timestamp-first",
                "parts": [
                  "generate",
                  "timestamp-first",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 10,
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/generate/timestamp-first/count/{count}",
                "parts": [
                  "generate",
                  "timestamp-first",
                  "count",
                  "{count}",
                ],
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "count",
            ],
          ],
        },
      },
      "version_1": {
        "fields": [],
        "name": "version_1",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/generate/v1",
                "parts": [
                  "generate",
                  "v1",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 10,
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/generate/v1/count/{count}",
                "parts": [
                  "generate",
                  "v1",
                  "count",
                  "{count}",
                ],
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "count",
            ],
          ],
        },
      },
      "version_3": {
        "fields": [],
        "name": "version_3",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "https://www.google.com/",
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "ns:url",
                      "kind": "param",
                      "name": "namespace_id",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/generate/v3/namespace/{namespace}/name/{name}",
                "parts": [
                  "generate",
                  "v3",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "namespace": "namespace_id",
                  },
                },
                "select": {
                  "exist": [
                    "name",
                    "namespace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "namespace",
              "name",
            ],
          ],
        },
      },
      "version_4": {
        "fields": [],
        "name": "version_4",
        "op": {
          "list": {
            "name": "list",
            "points": [
              {
                "method": "GET",
                "orig": "/generate/v4",
                "parts": [
                  "generate",
                  "v4",
                ],
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "args": {},
                "select": {},
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "list",
          },
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": 10,
                      "kind": "param",
                      "name": "count",
                      "orig": "count",
                      "reqd": True,
                      "type": "`$INTEGER`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/generate/v4/count/{count}",
                "parts": [
                  "generate",
                  "v4",
                  "count",
                  "{count}",
                ],
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "count",
            ],
          ],
        },
      },
      "version_5": {
        "fields": [],
        "name": "version_5",
        "op": {
          "load": {
            "name": "load",
            "points": [
              {
                "args": {
                  "params": [
                    {
                      "example": "https://www.uuidtools.com/generate",
                      "kind": "param",
                      "name": "name",
                      "orig": "name",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                    {
                      "example": "ns:url",
                      "kind": "param",
                      "name": "namespace_id",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                      "active": True,
                    },
                  ],
                },
                "method": "GET",
                "orig": "/generate/v5/namespace/{namespace}/name/{name}",
                "parts": [
                  "generate",
                  "v5",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                ],
                "rename": {
                  "param": {
                    "namespace": "namespace_id",
                  },
                },
                "select": {
                  "exist": [
                    "name",
                    "namespace_id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "active": True,
                "index$": 0,
              },
            ],
            "input": "data",
            "key$": "load",
          },
        },
        "relations": {
          "ancestors": [
            [
              "namespace",
              "name",
            ],
          ],
        },
      },
    },
    }
