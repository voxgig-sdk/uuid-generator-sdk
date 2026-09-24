-- UuidGenerator SDK configuration

-- Build a fresh, fully materialised config table. Every call rebuilds the
-- whole structure, so prefer require("config_shared") unless you need a
-- private copy you intend to mutate.
local function make_config()
  return {
    main = {
      name = "UuidGenerator",
      slug = "uuid-generator",
      version = "0.0.1",
      target = "lua",
    },
    feature = {
      ["ratelimit"] = {
        ["options"] = {
          ["active"] = false,
          ["burst"] = 5,
          ["rate"] = 5,
        },
        ["optspec"] = {
          ["now"] = "`$FUNCTION`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["retry"] = {
        ["options"] = {
          ["active"] = false,
          ["factor"] = 2,
          ["maxDelay"] = 2000,
          ["minDelay"] = 50,
          ["retries"] = 2,
          ["statuses"] = {
            408,
            425,
            429,
            500,
            502,
            503,
            504,
          },
        },
        ["optspec"] = {
          ["jitter"] = "`$BOOLEAN`",
          ["sleep"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
      ["test"] = {
        ["options"] = {
          ["active"] = false,
        },
        ["optspec"] = {
          ["entity"] = "`$MAP`",
          ["net"] = "`$MAP`",
        },
        ["strict"] = false,
        ["transport"] = "base",
      },
      ["timeout"] = {
        ["options"] = {
          ["active"] = false,
          ["ms"] = 30000,
        },
        ["optspec"] = {
          ["clearTimer"] = "`$FUNCTION`",
          ["setTimer"] = "`$FUNCTION`",
        },
        ["strict"] = false,
        ["transport"] = "wrap",
      },
    },
    options = {
      base = "https://www.uuidtools.com/api",
      headers = {
        ["content-type"] = "application/json",
      },
      entity = {
        ["decode"] = {},
        ["timestamp_first"] = {},
        ["version_1"] = {},
        ["version_3"] = {},
        ["version_4"] = {},
        ["version_5"] = {},
      },
    },
    entity = {
      ["decode"] = {
        ["fields"] = {
          {
            ["name"] = "decode",
            ["title"] = "Decode",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "encode",
            ["title"] = "Encode",
            ["type"] = "`$OBJECT`",
          },
          {
            ["name"] = "id",
            ["title"] = "Id",
            ["type"] = "`$STRING`",
          },
        },
        ["id"] = {
          ["field"] = "id",
          ["name"] = "id",
        },
        ["name"] = "decode",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/decode/{uuid}",
                ["segments"] = {
                  {
                    ["lit"] = "decode",
                  },
                  {
                    ["var"] = "id",
                  },
                },
                ["parts"] = {
                  "decode",
                  "{id}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["uuid"] = "id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body.decode`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "id",
                      ["orig"] = "uuid",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "b01eb720-171a-11ea-b949-73c91bba743d",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["timestamp_first"] = {
        ["fields"] = {},
        ["name"] = "timestamp_first",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/timestamp-first",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "timestamp-first",
                  },
                },
                ["parts"] = {
                  "generate",
                  "timestamp-first",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/timestamp-first/count/{count}",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "timestamp-first",
                  },
                  {
                    ["lit"] = "count",
                  },
                  {
                    ["var"] = "count",
                  },
                },
                ["parts"] = {
                  "generate",
                  "timestamp-first",
                  "count",
                  "{count}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 10,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["version_1"] = {
        ["fields"] = {},
        ["name"] = "version_1",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v1",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v1",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v1",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v1/count/{count}",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v1",
                  },
                  {
                    ["lit"] = "count",
                  },
                  {
                    ["var"] = "count",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v1",
                  "count",
                  "{count}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 10,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["version_3"] = {
        ["fields"] = {},
        ["name"] = "version_3",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v3/namespace/{namespace}/name/{name}",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v3",
                  },
                  {
                    ["lit"] = "namespace",
                  },
                  {
                    ["var"] = "namespace_id",
                  },
                  {
                    ["lit"] = "name",
                  },
                  {
                    ["var"] = "name",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v3",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["namespace"] = "namespace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "https://www.google.com/",
                    },
                    {
                      ["name"] = "namespace_id",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "ns:url",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "name",
                    "namespace_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["version_4"] = {
        ["fields"] = {},
        ["name"] = "version_4",
        ["op"] = {
          ["list"] = {
            ["input"] = "data",
            ["name"] = "list",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v4",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v4",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v4",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {},
                ["select"] = {},
              },
            },
          },
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v4/count/{count}",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v4",
                  },
                  {
                    ["lit"] = "count",
                  },
                  {
                    ["var"] = "count",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v4",
                  "count",
                  "{count}",
                },
                ["rename"] = {},
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "count",
                      ["orig"] = "count",
                      ["type"] = "`$INTEGER`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = 10,
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "count",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
      ["version_5"] = {
        ["fields"] = {},
        ["name"] = "version_5",
        ["op"] = {
          ["load"] = {
            ["input"] = "data",
            ["name"] = "load",
            ["points"] = {
              {
                ["kind"] = "http",
                ["method"] = "GET",
                ["orig"] = "/generate/v5/namespace/{namespace}/name/{name}",
                ["segments"] = {
                  {
                    ["lit"] = "generate",
                  },
                  {
                    ["lit"] = "v5",
                  },
                  {
                    ["lit"] = "namespace",
                  },
                  {
                    ["var"] = "namespace_id",
                  },
                  {
                    ["lit"] = "name",
                  },
                  {
                    ["var"] = "name",
                  },
                },
                ["parts"] = {
                  "generate",
                  "v5",
                  "namespace",
                  "{namespace_id}",
                  "name",
                  "{name}",
                },
                ["rename"] = {
                  ["param"] = {
                    ["namespace"] = "namespace_id",
                  },
                },
                ["transform"] = {
                  ["req"] = "`reqdata`",
                  ["res"] = "`body`",
                },
                ["args"] = {
                  ["params"] = {
                    {
                      ["name"] = "name",
                      ["orig"] = "name",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "https://www.uuidtools.com/generate",
                    },
                    {
                      ["name"] = "namespace_id",
                      ["orig"] = "namespace",
                      ["type"] = "`$STRING`",
                      ["kind"] = "param",
                      ["reqd"] = true,
                      ["example"] = "ns:url",
                    },
                  },
                },
                ["select"] = {
                  ["exist"] = {
                    "name",
                    "namespace_id",
                  },
                },
              },
            },
          },
        },
        ["relations"] = {
          ["ancestors"] = {},
        },
      },
    },
  }
end


local function make_feature(name)
  local features = require("features")
  local factory = features[name]
  if factory ~= nil then
    return factory()
  end
  return features.base()
end


-- Attach make_feature to the SDK class
local function setup_sdk(SDK)
  SDK._make_feature = make_feature
end


return make_config
