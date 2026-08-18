
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    // TODO: errors etc
    return fi
  }


  main = {
    name: 'UuidGenerator',
  }


  feature = {
     test:     {
      "options": {
        "active": false
      }
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
        }
      ],
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
              "parts": [
                "decode",
                "{id}"
              ],
              "rename": {
                "param": {
                  "uuid": "id"
                }
              },
              "select": {
                "exist": [
                  "id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body.decode`"
              }
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
              "parts": [
                "generate",
                "timestamp-first"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "timestamp-first",
                "count",
                "{count}"
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v1"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v1",
                "count",
                "{count}"
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v3",
                "namespace",
                "{namespace_id}",
                "name",
                "{name}"
              ],
              "rename": {
                "param": {
                  "namespace": "namespace_id"
                }
              },
              "select": {
                "exist": [
                  "name",
                  "namespace_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v4"
              ],
              "select": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v4",
                "count",
                "{count}"
              ],
              "select": {
                "exist": [
                  "count"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
              "parts": [
                "generate",
                "v5",
                "namespace",
                "{namespace_id}",
                "name",
                "{name}"
              ],
              "rename": {
                "param": {
                  "namespace": "namespace_id"
                }
              },
              "select": {
                "exist": [
                  "name",
                  "namespace_id"
                ]
              },
              "transform": {
                "req": "`reqdata`",
                "res": "`body`"
              }
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
  config
}

