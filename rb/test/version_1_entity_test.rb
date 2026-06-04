# Version1 entity test

require "minitest/autorun"
require "json"
require_relative "../UuidGenerator_sdk"
require_relative "runner"

class Version1EntityTest < Minitest::Test
  def test_create_instance
    testsdk = UuidGeneratorSDK.test(nil, nil)
    ent = testsdk.Version1(nil)
    assert !ent.nil?
  end

  def test_basic_flow
    setup = version_1_basic_setup(nil)
    # Per-op sdk-test-control.json skip.
    _live = setup[:live] || false
    ["list", "load"].each do |_op|
      _should_skip, _reason = Runner.is_control_skipped("entityOp", "version_1." + _op, _live ? "live" : "unit")
      if _should_skip
        skip(_reason || "skipped via sdk-test-control.json")
        return
      end
    end
    # The basic flow consumes synthetic IDs from the fixture. In live mode
    # without an *_ENTID env override, those IDs hit the live API and 4xx.
    if setup[:synthetic_only]
      skip "live entity test uses synthetic IDs from fixture — set UUIDGENERATOR_TEST_VERSION___ENTID JSON to run live"
      return
    end
    client = setup[:client]

    # Bootstrap entity data from existing test data.
    version_1_ref01_data_raw = Vs.items(Helpers.to_map(
      Vs.getpath(setup[:data], "existing.version_1")))
    version_1_ref01_data = nil
    if version_1_ref01_data_raw.length > 0
      version_1_ref01_data = Helpers.to_map(version_1_ref01_data_raw[0][1])
    end

    # LIST
    version_1_ref01_ent = client.Version1(nil)
    version_1_ref01_match = {}

    version_1_ref01_list_result, err = version_1_ref01_ent.list(version_1_ref01_match, nil)
    assert_nil err
    assert version_1_ref01_list_result.is_a?(Array)

    # LOAD
    version_1_ref01_match_dt0 = {}
    version_1_ref01_data_dt0_loaded, err = version_1_ref01_ent.load(version_1_ref01_match_dt0, nil)
    assert_nil err
    assert !version_1_ref01_data_dt0_loaded.nil?

  end
end

def version_1_basic_setup(extra)
  Runner.load_env_local

  entity_data_file = File.join(__dir__, "..", "..", ".sdk", "test", "entity", "version_1", "Version1TestData.json")
  entity_data_source = File.read(entity_data_file)
  entity_data = JSON.parse(entity_data_source)

  options = {}
  options["entity"] = entity_data["existing"]

  client = UuidGeneratorSDK.test(options, extra)

  # Generate idmap via transform.
  idmap = Vs.transform(
    ["version_101", "version_102", "version_103", "count01", "count02", "count03"],
    {
      "`$PACK`" => ["", {
        "`$KEY`" => "`$COPY`",
        "`$VAL`" => ["`$FORMAT`", "upper", "`$COPY`"],
      }],
    }
  )

  # Detect ENTID env override before envOverride consumes it. When live
  # mode is on without a real override, the basic test runs against synthetic
  # IDs from the fixture and 4xx's. Surface this so the test can skip.
  entid_env_raw = ENV["UUIDGENERATOR_TEST_VERSION___ENTID"]
  idmap_overridden = !entid_env_raw.nil? && entid_env_raw.strip.start_with?("{")

  env = Runner.env_override({
    "UUIDGENERATOR_TEST_VERSION___ENTID" => idmap,
    "UUIDGENERATOR_TEST_LIVE" => "FALSE",
    "UUIDGENERATOR_TEST_EXPLAIN" => "FALSE",
  })

  idmap_resolved = Helpers.to_map(
    env["UUIDGENERATOR_TEST_VERSION___ENTID"])
  if idmap_resolved.nil?
    idmap_resolved = Helpers.to_map(idmap)
  end

  if env["UUIDGENERATOR_TEST_LIVE"] == "TRUE"
    merged_opts = Vs.merge([
      {
      },
      extra || {},
    ])
    client = UuidGeneratorSDK.new(Helpers.to_map(merged_opts))
  end

  live = env["UUIDGENERATOR_TEST_LIVE"] == "TRUE"
  {
    client: client,
    data: entity_data,
    idmap: idmap_resolved,
    env: env,
    explain: env["UUIDGENERATOR_TEST_EXPLAIN"] == "TRUE",
    live: live,
    synthetic_only: live && !idmap_overridden,
    now: (Time.now.to_f * 1000).to_i,
  }
end
