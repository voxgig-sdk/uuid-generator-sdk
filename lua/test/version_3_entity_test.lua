-- Version3 entity test

local json = require("dkjson")
local vs = require("utility.struct.struct")
local sdk = require("uuid-generator_sdk")
local helpers = require("core.helpers")
local runner = require("test.runner")

local _test_dir = debug.getinfo(1, "S").source:match("^@(.+/)")  or "./"

describe("Version3Entity", function()
  it("should create instance", function()
    local testsdk = sdk.test(nil, nil)
    local ent = testsdk:Version3(nil)
    assert.is_not_nil(ent)
  end)

  it("should run basic flow", function()
    local setup = version_3_basic_setup(nil)
    -- Per-op sdk-test-control.json skip.
    local _live = setup.live or false
    for _, _op in ipairs({"load"}) do
      local _should_skip, _reason = runner.is_control_skipped("entityOp", "version_3." .. _op, _live and "live" or "unit")
      if _should_skip then
        pending(_reason or "skipped via sdk-test-control.json")
        return
      end
    end
    -- The basic flow consumes synthetic IDs from the fixture. In live mode
    -- without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup.synthetic_only then
      pending("live entity test uses synthetic IDs from fixture — set UUIDGENERATOR_TEST_VERSION___ENTID JSON to run live")
      return
    end
    local client = setup.client

    -- Bootstrap entity data from existing test data.
    local version_3_ref01_data_raw = vs.items(helpers.to_map(
      vs.getpath(setup.data, "existing.version_3")))
    local version_3_ref01_data = nil
    if #version_3_ref01_data_raw > 0 then
      version_3_ref01_data = helpers.to_map(version_3_ref01_data_raw[1][2])
    end

    -- LOAD
    local version_3_ref01_ent = client:Version3(nil)
    local version_3_ref01_match_dt0 = {}
    local version_3_ref01_data_dt0_loaded, err = version_3_ref01_ent:load(version_3_ref01_match_dt0, nil)
    assert.is_nil(err)
    assert.is_not_nil(version_3_ref01_data_dt0_loaded)

  end)
end)

function version_3_basic_setup(extra)
  runner.load_env_local()

  local entity_data_file = _test_dir .. "../../.sdk/test/entity/version_3/Version3TestData.json"
  local f = io.open(entity_data_file, "r")
  if f == nil then
    error("failed to read version_3 test data: " .. entity_data_file)
  end
  local entity_data_source = f:read("*a")
  f:close()

  local entity_data = json.decode(entity_data_source)

  local options = {}
  options["entity"] = entity_data["existing"]

  local client = sdk.test(options, extra)

  -- Generate idmap via transform.
  local idmap = vs.transform(
    { "version_301", "version_302", "version_303", "namespace01", "namespace02", "namespace03", "name01", "name02", "name03" },
    {
      ["`$PACK`"] = { "", {
        ["`$KEY`"] = "`$COPY`",
        ["`$VAL`"] = { "`$FORMAT`", "upper", "`$COPY`" },
      }},
    }
  )

  -- Detect ENTID env override before envOverride consumes it. When live
  -- mode is on without a real override, the basic test runs against synthetic
  -- IDs from the fixture and 4xx's. Surface this so the test can skip.
  local entid_env_raw = os.getenv("UUIDGENERATOR_TEST_VERSION___ENTID")
  local idmap_overridden = entid_env_raw ~= nil and entid_env_raw:match("^%s*{") ~= nil

  local env = runner.env_override({
    ["UUIDGENERATOR_TEST_VERSION___ENTID"] = idmap,
    ["UUIDGENERATOR_TEST_LIVE"] = "FALSE",
    ["UUIDGENERATOR_TEST_EXPLAIN"] = "FALSE",
    ["UUIDGENERATOR_APIKEY"] = "NONE",
  })

  local idmap_resolved = helpers.to_map(
    env["UUIDGENERATOR_TEST_VERSION___ENTID"])
  if idmap_resolved == nil then
    idmap_resolved = helpers.to_map(idmap)
  end

  if env["UUIDGENERATOR_TEST_LIVE"] == "TRUE" then
    local merged_opts = vs.merge({
      {
        apikey = env["UUIDGENERATOR_APIKEY"],
      },
      extra or {},
    })
    client = sdk.new(helpers.to_map(merged_opts))
  end

  local live = env["UUIDGENERATOR_TEST_LIVE"] == "TRUE"
  return {
    client = client,
    data = entity_data,
    idmap = idmap_resolved,
    env = env,
    explain = env["UUIDGENERATOR_TEST_EXPLAIN"] == "TRUE",
    live = live,
    synthetic_only = live and not idmap_overridden,
    now = os.time() * 1000,
  }
end
