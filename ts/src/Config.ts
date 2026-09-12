
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


// Per-feature plugin DEFINITIONS (voxgig/plugin `Definition` values), from
// the model's active plugin groups. A feature that takes a `plugins` option
// (secrets over sekreto) reads its own entry; a feature with no plugins has
// none. Named imports above make each definition statically reachable, so
// an SDK carries exactly the plugin modules its model selects — the same
// leanness the old side-effect registry imports bought, without a registry.
const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'UuidGenerator',
        slug: "uuid-generator",
    version: "0.0.1",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "transport": "base"
    },

  }


  options = {
    base: "https://www.uuidtools.com/api",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
      decode: {
      },

      timestamp_first: {
      },

      version_1: {
      },

      version_3: {
      },

      version_4: {
      },

      version_5: {
      },

    }
  }


  entity = {
    "decode": {
      "fields": [
        {
          "name": "decode",
          "type": "`$OBJECT`"
        },
        {
          "name": "encode",
          "type": "`$OBJECT`"
        },
        {
          "name": "id",
          "type": "`$STRING`"
        }
      ],
      "id": {
        "field": "id",
        "name": "id"
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
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/decode/{uuid}",
              "rename": {
                "param": {
                  "uuid": "id"
                }
              },
              "segments": [
                {
                  "lit": "decode"
                },
                {
                  "var": "id"
                }
              ],
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.decode`"
              },
              "parts": [
                "decode",
                "{id}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
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
                  "lit": "generate"
                },
                {
                  "lit": "timestamp-first"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "timestamp-first"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generate/timestamp-first/count/{count}",
              "segments": [
                {
                  "lit": "generate"
                },
                {
                  "lit": "timestamp-first"
                },
                {
                  "lit": "count"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "timestamp-first",
                "count",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "count"
          ]
        ]
      }
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
                  "lit": "generate"
                },
                {
                  "lit": "v1"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v1"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generate/v1/count/{count}",
              "segments": [
                {
                  "lit": "generate"
                },
                {
                  "lit": "v1"
                },
                {
                  "lit": "count"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v1",
                "count",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "count"
          ]
        ]
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "ns:url",
                    "kind": "param",
                    "name": "namespace_id",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generate/v3/namespace/{namespace}/name/{name}",
              "rename": {
                "param": {
                  "namespace": "namespace_id"
                }
              },
              "segments": [
                {
                  "lit": "generate"
                },
                {
                  "lit": "v3"
                },
                {
                  "lit": "namespace"
                },
                {
                  "var": "namespace_id"
                },
                {
                  "lit": "name"
                },
                {
                  "var": "name"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "namespace_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v3",
                "namespace",
                "{namespace_id}",
                "name",
                "{name}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "namespace",
            "name"
          ]
        ]
      }
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
                  "lit": "generate"
                },
                {
                  "lit": "v4"
                }
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v4"
              ]
            }
          ]
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
                    "reqd": true,
                    "type": "`$INTEGER`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generate/v4/count/{count}",
              "segments": [
                {
                  "lit": "generate"
                },
                {
                  "lit": "v4"
                },
                {
                  "lit": "count"
                },
                {
                  "var": "count"
                }
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v4",
                "count",
                "{count}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "count"
          ]
        ]
      }
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
                    "reqd": true,
                    "type": "`$STRING`"
                  },
                  {
                    "example": "ns:url",
                    "kind": "param",
                    "name": "namespace_id",
                    "orig": "namespace",
                    "reqd": true,
                    "type": "`$STRING`"
                  }
                ]
              },
              "kind": "http",
              "method": "GET",
              "orig": "/generate/v5/namespace/{namespace}/name/{name}",
              "rename": {
                "param": {
                  "namespace": "namespace_id"
                }
              },
              "segments": [
                {
                  "lit": "generate"
                },
                {
                  "lit": "v5"
                },
                {
                  "lit": "namespace"
                },
                {
                  "var": "namespace_id"
                },
                {
                  "lit": "name"
                },
                {
                  "var": "name"
                }
              ],
              "select": {
                "exist": [
                  "name",
                  "namespace_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              },
              "parts": [
                "generate",
                "v5",
                "namespace",
                "{namespace_id}",
                "name",
                "{name}"
              ]
            }
          ]
        }
      },
      "relations": {
        "ancestors": [
          [
            "namespace",
            "name"
          ]
        ]
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}

