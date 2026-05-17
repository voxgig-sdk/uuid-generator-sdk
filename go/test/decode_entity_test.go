package sdktest

import (
	"encoding/json"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"testing"
	"time"

	sdk "github.com/voxgig-sdk/uuid-generator-sdk/go"
	"github.com/voxgig-sdk/uuid-generator-sdk/go/core"

	vs "github.com/voxgig-sdk/uuid-generator-sdk/go/utility/struct"
)

func TestDecodeEntity(t *testing.T) {
	t.Run("instance", func(t *testing.T) {
		testsdk := sdk.TestSDK(nil, nil)
		ent := testsdk.Decode(nil)
		if ent == nil {
			t.Fatal("expected non-nil DecodeEntity")
		}
	})

	t.Run("basic", func(t *testing.T) {
		setup := decodeBasicSetup(nil)
		// Per-op sdk-test-control.json skip — basic test exercises a flow
		// with multiple ops; skipping any op skips the whole flow.
		_mode := "unit"
		if setup.live {
			_mode = "live"
		}
		for _, _op := range []string{"load"} {
			if _shouldSkip, _reason := isControlSkipped("entityOp", "decode." + _op, _mode); _shouldSkip {
				if _reason == "" {
					_reason = "skipped via sdk-test-control.json"
				}
				t.Skip(_reason)
				return
			}
		}
		// The basic flow consumes synthetic IDs from the fixture. In live mode
		// without an *_ENTID env override, those IDs hit the live API and 4xx.
		if setup.syntheticOnly {
			t.Skip("live entity test uses synthetic IDs from fixture — set UUIDGENERATOR_TEST_DECODE_ENTID JSON to run live")
			return
		}
		client := setup.client

		// Bootstrap entity data from existing test data (no create step in flow).
		decodeRef01DataRaw := vs.Items(core.ToMapAny(vs.GetPath("existing.decode", setup.data)))
		var decodeRef01Data map[string]any
		if len(decodeRef01DataRaw) > 0 {
			decodeRef01Data = core.ToMapAny(decodeRef01DataRaw[0][1])
		}
		// Discard guards against Go's unused-var check when the flow's steps
		// happen not to consume the bootstrap data (e.g. list-only flows).
		_ = decodeRef01Data

		// LOAD
		decodeRef01Ent := client.Decode(nil)
		decodeRef01MatchDt0 := map[string]any{}
		decodeRef01DataDt0Loaded, err := decodeRef01Ent.Load(decodeRef01MatchDt0, nil)
		if err != nil {
			t.Fatalf("load failed: %v", err)
		}
		if decodeRef01DataDt0Loaded == nil {
			t.Fatal("expected load result to be non-nil")
		}

	})
}

func decodeBasicSetup(extra map[string]any) *entityTestSetup {
	loadEnvLocal()

	_, filename, _, _ := runtime.Caller(0)
	dir := filepath.Dir(filename)

	entityDataFile := filepath.Join(dir, "..", "..", ".sdk", "test", "entity", "decode", "DecodeTestData.json")

	entityDataSource, err := os.ReadFile(entityDataFile)
	if err != nil {
		panic("failed to read decode test data: " + err.Error())
	}

	var entityData map[string]any
	if err := json.Unmarshal(entityDataSource, &entityData); err != nil {
		panic("failed to parse decode test data: " + err.Error())
	}

	options := map[string]any{}
	options["entity"] = entityData["existing"]

	client := sdk.TestSDK(options, extra)

	// Generate idmap via transform, matching TS pattern.
	idmap := vs.Transform(
		[]any{"decode01", "decode02", "decode03"},
		map[string]any{
			"`$PACK`": []any{"", map[string]any{
				"`$KEY`": "`$COPY`",
				"`$VAL`": []any{"`$FORMAT`", "upper", "`$COPY`"},
			}},
		},
	)

	// Detect ENTID env override before envOverride consumes it. When live
	// mode is on without a real override, the basic test runs against synthetic
	// IDs from the fixture and 4xx's. Surface this so the test can skip.
	entidEnvRaw := os.Getenv("UUIDGENERATOR_TEST_DECODE_ENTID")
	idmapOverridden := entidEnvRaw != "" && strings.HasPrefix(strings.TrimSpace(entidEnvRaw), "{")

	env := envOverride(map[string]any{
		"UUIDGENERATOR_TEST_DECODE_ENTID": idmap,
		"UUIDGENERATOR_TEST_LIVE":      "FALSE",
		"UUIDGENERATOR_TEST_EXPLAIN":   "FALSE",
		"UUIDGENERATOR_APIKEY":         "NONE",
	})

	idmapResolved := core.ToMapAny(env["UUIDGENERATOR_TEST_DECODE_ENTID"])
	if idmapResolved == nil {
		idmapResolved = core.ToMapAny(idmap)
	}

	if env["UUIDGENERATOR_TEST_LIVE"] == "TRUE" {
		mergedOpts := vs.Merge([]any{
			map[string]any{
				"apikey": env["UUIDGENERATOR_APIKEY"],
			},
			extra,
		})
		client = sdk.NewUuidGeneratorSDK(core.ToMapAny(mergedOpts))
	}

	live := env["UUIDGENERATOR_TEST_LIVE"] == "TRUE"
	return &entityTestSetup{
		client:        client,
		data:          entityData,
		idmap:         idmapResolved,
		env:           env,
		explain:       env["UUIDGENERATOR_TEST_EXPLAIN"] == "TRUE",
		live:          live,
		syntheticOnly: live && !idmapOverridden,
		now:           time.Now().UnixMilli(),
	}
}
