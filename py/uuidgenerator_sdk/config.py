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
            "test": {
        "options": {
          "active": False,
        },
        "transport": "base",
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
            "type": "`$OBJECT`",
          },
          {
            "name": "encode",
            "type": "`$OBJECT`",
          },
          {
            "name": "id",
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
                "args": {
                  "params": [
                    {
                      "example": "b01eb720-171a-11ea-b949-73c91bba743d",
                      "kind": "param",
                      "name": "id",
                      "orig": "uuid",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/decode/{uuid}",
                "rename": {
                  "param": {
                    "uuid": "id",
                  },
                },
                "segments": [
                  {
                    "lit": "decode",
                  },
                  {
                    "var": "id",
                  },
                ],
                "select": {
                  "exist": [
                    "id",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body.decode`",
                },
                "parts": [
                  "decode",
                  "{id}",
                ],
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
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "timestamp-first",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
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
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "timestamp-first",
                  "count",
                  "{count}",
                ],
              },
            ],
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
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "v1",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
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
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "v1",
                  "count",
                  "{count}",
                ],
              },
            ],
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
            "input": "data",
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
                    },
                    {
                      "example": "ns:url",
                      "kind": "param",
                      "name": "namespace_id",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v3/namespace/{namespace}/name/{name}",
                "rename": {
                  "param": {
                    "namespace": "namespace_id",
                  },
                },
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
                "parts": [
                  "generate",
                  "v3",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                ],
              },
            ],
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
            "input": "data",
            "name": "list",
            "points": [
              {
                "args": {},
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
                "select": {},
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "v4",
                ],
              },
            ],
          },
          "load": {
            "input": "data",
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
                    },
                  ],
                },
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
                "select": {
                  "exist": [
                    "count",
                  ],
                },
                "transform": {
                  "req": "`reqdata`",
                  "res": "`body`",
                },
                "parts": [
                  "generate",
                  "v4",
                  "count",
                  "{count}",
                ],
              },
            ],
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
            "input": "data",
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
                    },
                    {
                      "example": "ns:url",
                      "kind": "param",
                      "name": "namespace_id",
                      "orig": "namespace",
                      "reqd": True,
                      "type": "`$STRING`",
                    },
                  ],
                },
                "kind": "http",
                "method": "GET",
                "orig": "/generate/v5/namespace/{namespace}/name/{name}",
                "rename": {
                  "param": {
                    "namespace": "namespace_id",
                  },
                },
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
                "parts": [
                  "generate",
                  "v5",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                ],
              },
            ],
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
