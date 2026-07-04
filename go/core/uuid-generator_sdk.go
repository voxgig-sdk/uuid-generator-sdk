package core

import (
	"fmt"

	vs "github.com/voxgig-sdk/uuid-generator-sdk/go/utility/struct"
)

type UuidGeneratorSDK struct {
	Mode     string
	options  map[string]any
	utility  *Utility
	Features []Feature
	rootctx  *Context
}

func NewUuidGeneratorSDK(options map[string]any) *UuidGeneratorSDK {
	sdk := &UuidGeneratorSDK{
		Mode:     "live",
		Features: []Feature{},
	}

	sdk.utility = NewUtility()

	config := MakeConfig()

	sdk.rootctx = sdk.utility.MakeContext(map[string]any{
		"client":  sdk,
		"utility": sdk.utility,
		"config":  config,
		"options": options,
		"shared":  map[string]any{},
	}, nil)

	sdk.options = sdk.utility.MakeOptions(sdk.rootctx)

	if vs.GetPath([]any{"feature", "test", "active"}, sdk.options) == true {
		sdk.Mode = "test"
	}

	sdk.rootctx.Options = sdk.options

	// Add features from config.
	featureOpts := ToMapAny(vs.GetProp(sdk.options, "feature"))
	if featureOpts != nil {
		for _, item := range vs.Items(featureOpts) {
			fname, _ := item[0].(string)
			fopts := ToMapAny(item[1])
			if fopts != nil {
				if active, ok := fopts["active"]; ok {
					if ab, ok := active.(bool); ok && ab {
						sdk.utility.FeatureAdd(sdk.rootctx, makeFeature(fname))
					}
				}
			}
		}
	}

	// Add extension features.
	if extend := vs.GetProp(sdk.options, "extend"); extend != nil {
		if extList, ok := extend.([]any); ok {
			for _, f := range extList {
				if feat, ok := f.(Feature); ok {
					sdk.utility.FeatureAdd(sdk.rootctx, feat)
				}
			}
		}
	}

	// Initialize features.
	for _, f := range sdk.Features {
		sdk.utility.FeatureInit(sdk.rootctx, f)
	}

	sdk.utility.FeatureHook(sdk.rootctx, "PostConstruct")

	return sdk
}

func (sdk *UuidGeneratorSDK) OptionsMap() map[string]any {
	out := vs.Clone(sdk.options)
	if om, ok := out.(map[string]any); ok {
		return om
	}
	return map[string]any{}
}

func (sdk *UuidGeneratorSDK) GetUtility() *Utility {
	return CopyUtility(sdk.utility)
}

func (sdk *UuidGeneratorSDK) GetRootCtx() *Context {
	return sdk.rootctx
}

func (sdk *UuidGeneratorSDK) Prepare(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "prepare",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	options := sdk.options

	path, _ := vs.GetProp(fetchargs, "path").(string)
	method, _ := vs.GetProp(fetchargs, "method").(string)
	if method == "" {
		method = "GET"
	}

	params := ToMapAny(vs.GetProp(fetchargs, "params"))
	if params == nil {
		params = map[string]any{}
	}
	query := ToMapAny(vs.GetProp(fetchargs, "query"))
	if query == nil {
		query = map[string]any{}
	}

	headers := utility.PrepareHeaders(ctx)

	base, _ := vs.GetProp(options, "base").(string)
	prefix, _ := vs.GetProp(options, "prefix").(string)
	suffix, _ := vs.GetProp(options, "suffix").(string)

	ctx.Spec = NewSpec(map[string]any{
		"base":    base,
		"prefix":  prefix,
		"suffix":  suffix,
		"path":    path,
		"method":  method,
		"params":  params,
		"query":   query,
		"headers": headers,
		"body":    vs.GetProp(fetchargs, "body"),
		"step":    "start",
	})

	// Merge user-provided headers.
	if uh := vs.GetProp(fetchargs, "headers"); uh != nil {
		if uhm, ok := uh.(map[string]any); ok {
			for k, v := range uhm {
				ctx.Spec.Headers[k] = v
			}
		}
	}

	_, err := utility.PrepareAuth(ctx)
	if err != nil {
		return nil, err
	}

	return utility.MakeFetchDef(ctx)
}

func (sdk *UuidGeneratorSDK) Direct(fetchargs map[string]any) (map[string]any, error) {
	utility := sdk.utility

	fetchdef, err := sdk.Prepare(fetchargs)
	if err != nil {
		return map[string]any{"ok": false, "err": err}, nil
	}

	if fetchargs == nil {
		fetchargs = map[string]any{}
	}

	var ctrl map[string]any
	if c := vs.GetProp(fetchargs, "ctrl"); c != nil {
		if cm, ok := c.(map[string]any); ok {
			ctrl = cm
		}
	}
	if ctrl == nil {
		ctrl = map[string]any{}
	}

	ctx := utility.MakeContext(map[string]any{
		"opname": "direct",
		"ctrl":   ctrl,
	}, sdk.rootctx)

	url, _ := fetchdef["url"].(string)
	fetched, fetchErr := utility.Fetcher(ctx, url, fetchdef)

	if fetchErr != nil {
		return map[string]any{"ok": false, "err": fetchErr}, nil
	}

	if fetched == nil {
		return map[string]any{
			"ok":  false,
			"err": ctx.MakeError("direct_no_response", "response: undefined"),
		}, nil
	}

	if fm, ok := fetched.(map[string]any); ok {
		status := ToInt(vs.GetProp(fm, "status"))
		headers := vs.GetProp(fm, "headers")

		// No-body responses (204, 304) and explicit zero content-length
		// must skip JSON parsing — calling json() on an empty body errors.
		var contentLength string
		if hm, ok := headers.(map[string]any); ok {
			if cl, ok := hm["content-length"]; ok {
				contentLength = fmt.Sprintf("%v", cl)
			}
		}
		noBody := status == 204 || status == 304 || contentLength == "0"

		var jsonData any
		if !noBody {
			if jf := vs.GetProp(fm, "json"); jf != nil {
				if f, ok := jf.(func() any); ok {
					// f() returns nil on parse error in our fetcher.
					jsonData = f()
				}
			}
		}

		return map[string]any{
			"ok":      status >= 200 && status < 300,
			"status":  status,
			"headers": headers,
			"data":    jsonData,
		}, nil
	}

	return map[string]any{"ok": false, "err": ctx.MakeError("direct_invalid", "invalid response type")}, nil
}


// Decode returns a Decode entity bound to this client.
// Idiomatic usage: client.Decode(nil).List(nil, nil) or
// client.Decode(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) Decode(data map[string]any) UuidGeneratorEntity {
	return NewDecodeEntityFunc(sdk, data)
}


// TimestampFirst returns a TimestampFirst entity bound to this client.
// Idiomatic usage: client.TimestampFirst(nil).List(nil, nil) or
// client.TimestampFirst(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) TimestampFirst(data map[string]any) UuidGeneratorEntity {
	return NewTimestampFirstEntityFunc(sdk, data)
}


// Version1 returns a Version1 entity bound to this client.
// Idiomatic usage: client.Version1(nil).List(nil, nil) or
// client.Version1(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) Version1(data map[string]any) UuidGeneratorEntity {
	return NewVersion1EntityFunc(sdk, data)
}


// Version3 returns a Version3 entity bound to this client.
// Idiomatic usage: client.Version3(nil).List(nil, nil) or
// client.Version3(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) Version3(data map[string]any) UuidGeneratorEntity {
	return NewVersion3EntityFunc(sdk, data)
}


// Version4 returns a Version4 entity bound to this client.
// Idiomatic usage: client.Version4(nil).List(nil, nil) or
// client.Version4(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) Version4(data map[string]any) UuidGeneratorEntity {
	return NewVersion4EntityFunc(sdk, data)
}


// Version5 returns a Version5 entity bound to this client.
// Idiomatic usage: client.Version5(nil).List(nil, nil) or
// client.Version5(nil).Load(map[string]any{"id": ...}, nil).
func (sdk *UuidGeneratorSDK) Version5(data map[string]any) UuidGeneratorEntity {
	return NewVersion5EntityFunc(sdk, data)
}



func TestSDK(testopts map[string]any, sdkopts map[string]any) *UuidGeneratorSDK {
	if sdkopts == nil {
		sdkopts = map[string]any{}
	}
	sdkopts = vs.Clone(sdkopts).(map[string]any)

	if testopts == nil {
		testopts = map[string]any{}
	}
	testopts = vs.Clone(testopts).(map[string]any)
	testopts["active"] = true

	vs.SetPath(sdkopts, []any{"feature", "test"}, testopts)

	sdk := NewUuidGeneratorSDK(sdkopts)
	sdk.Mode = "test"

	return sdk
}
