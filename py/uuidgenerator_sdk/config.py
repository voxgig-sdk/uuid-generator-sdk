# UuidGenerator SDK configuration


# The sekreto plugin DEFINITIONS the model selected per feature, imported
# above by name from the modules the catalogue's active `plugin.def`
# entries declare. Handed to each feature (secrets builds its Sekreto
# with them): a provider kind not listed here is unknown to that SDK.
FEATURE_PLUGINS = {
}


_shared_config = None


def shared_config():
    """Return the process-wide config, built once on first use.

    The SDK reads the config on every request and never writes to it, so one
    instance is shared by every client rather than rebuilt per client.

    The returned dict is shared: treat it as read-only. Callers that need to
    mutate should use make_config, which always returns a fresh copy.
    """
    global _shared_config
    if _shared_config is None:
        _shared_config = make_config()
    return _shared_config


def make_config():
    """Build a fresh, fully materialised config dict.

    Every call rebuilds the whole structure, so prefer shared_config unless
    you need a private copy you intend to mutate.
    """
    return {
        "main": {
            "name": "UuidGenerator",
            "slug": "uuid-generator",
            "version": "0.0.1",
            "target": "py",
        },
        "feature": {
            "ratelimit": {
        "options": {
          "active": False,
          "burst": 5,
          "rate": 5,
        },
        "optspec": {
          "now": "`$FUNCTION`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "retry": {
        "options": {
          "active": False,
          "factor": 2,
          "maxDelay": 2000,
          "minDelay": 50,
          "retries": 2,
          "statuses": [
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          ],
        },
        "optspec": {
          "jitter": "`$BOOLEAN`",
          "sleep": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
            "test": {
        "options": {
          "active": False,
        },
        "optspec": {
          "entity": "`$MAP`",
          "net": "`$MAP`",
        },
        "strict": False,
        "transport": "base",
      },
            "timeout": {
        "options": {
          "active": False,
          "ms": 30000,
        },
        "optspec": {
          "clearTimer": "`$FUNCTION`",
          "setTimer": "`$FUNCTION`",
        },
        "strict": False,
        "transport": "wrap",
      },
        },
        "options": {
            "base": "https://www.uuidtools.com/api",
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
            "title": "Decode",
            "type": "`$OBJECT`",
          },
          {
            "name": "encode",
            "title": "Encode",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
            "title": "Id",
            "type": "`$STRING`",
          },
        ],
        "id": {
          "field": "id",
          "name": "id",
        },
        "name": "decode",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/decode/{uuid}",
                "segments": [
                  {
                    "lit": "decode",
                  },
                  {
                    "var": "id",
                  },
                ],
                "parts": [
                  "decode",
                  "{id}",
                ],
                "rename": {
                  "param": {
                    "uuid": "id",
                  },
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.decode`",
                },
                "args": {
                  "params": [
                    {
                      "name": "id",
                      "orig": "uuid",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "b01eb720-171a-11ea-b949-73c91bba743d",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "id",
                  ],
                },
              },
            ],
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
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/timestamp-first",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "timestamp-first",
                  },
                ],
                "parts": [
                  "generate",
                  "timestamp-first",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/timestamp-first/count/{count}",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "timestamp-first",
                  },
                  {
                    "lit": "count",
                  },
                  {
                    "var": "count",
                  },
                ],
                "parts": [
                  "generate",
                  "timestamp-first",
                  "count",
                  "{count}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version_1": {
        "fields": [],
        "name": "version_1",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v1",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v1",
                  },
                ],
                "parts": [
                  "generate",
                  "v1",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v1/count/{count}",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v1",
                  },
                  {
                    "lit": "count",
                  },
                  {
                    "var": "count",
                  },
                ],
                "parts": [
                  "generate",
                  "v1",
                  "count",
                  "{count}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version_3": {
        "fields": [],
        "name": "version_3",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v3/namespace/{namespace}/name/{name}",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v3",
                  },
                  {
                    "lit": "namespace",
                  },
                  {
                    "var": "namespace_id",
                  },
                  {
                    "lit": "name",
                  },
                  {
                    "var": "name",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "https://www.google.com/",
                    },
                    {
                      "name": "namespace_id",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "ns:url",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                    "namespace_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version_4": {
        "fields": [],
        "name": "version_4",
        "op": {
          "list": {
            "input": "data",
            "name": "list",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v4",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v4",
                  },
                ],
                "parts": [
                  "generate",
                  "v4",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {},
                "select": {},
              },
            ],
          },
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v4/count/{count}",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v4",
                  },
                  {
                    "lit": "count",
                  },
                  {
                    "var": "count",
                  },
                ],
                "parts": [
                  "generate",
                  "v4",
                  "count",
                  "{count}",
                ],
                "rename": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "count",
                      "orig": "count",
                      "type": "`$INTEGER`",
                      "kind": "param",
                      "reqd": True,
                      "example": 10,
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "count",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
      "version_5": {
        "fields": [],
        "name": "version_5",
        "op": {
          "load": {
            "input": "data",
            "name": "load",
            "points": [
              {
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v5/namespace/{namespace}/name/{name}",
                "segments": [
                  {
                    "lit": "generate",
                  },
                  {
                    "lit": "v5",
                  },
                  {
                    "lit": "namespace",
                  },
                  {
                    "var": "namespace_id",
                  },
                  {
                    "lit": "name",
                  },
                  {
                    "var": "name",
                  },
                ],
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
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "args": {
                  "params": [
                    {
                      "name": "name",
                      "orig": "name",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "https://www.uuidtools.com/generate",
                    },
                    {
                      "name": "namespace_id",
                      "orig": "namespace",
                      "type": "`$STRING`",
                      "kind": "param",
                      "reqd": True,
                      "example": "ns:url",
                    },
                  ],
                },
                "select": {
                  "exist": [
                    "name",
                    "namespace_id",
                  ],
                },
              },
            ],
          },
        },
        "relations": {
          "ancestors": [],
        },
      },
    },
    }
