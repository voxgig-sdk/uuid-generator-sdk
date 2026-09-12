package core

import (
	"sync"
)

// MakeConfig builds a fresh, fully materialised config map. Every call
// rebuilds the whole structure, so prefer SharedConfig unless you need a
// private copy you intend to mutate.
func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UuidGenerator",
			"slug": "uuid-generator",
			"version": "0.0.1",
			"target": "go",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
				"transport": "base",
			},
		},
		"options": map[string]any{
			"base": "https://www.uuidtools.com/api",
			"headers": map[string]any{
				"content-type": "application/json",
			},
			"entity": map[string]any{
				"decode": map[string]any{},
				"timestamp_first": map[string]any{},
				"version_1": map[string]any{},
				"version_3": map[string]any{},
				"version_4": map[string]any{},
				"version_5": map[string]any{},
			},
		},
		"entity": map[string]any{
			"decode": map[string]any{
				"fields": []any{
					map[string]any{
						"name": "decode",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "encode",
						"type": "`$OBJECT`",
					},
					map[string]any{
						"name": "id",
						"type": "`$STRING`",
					},
				},
				"id": map[string]any{
					"field": "id",
					"name": "id",
				},
				"name": "decode",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "b01eb720-171a-11ea-b949-73c91bba743d",
											"kind": "param",
											"name": "id",
											"orig": "uuid",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/decode/{uuid}",
								"rename": map[string]any{
									"param": map[string]any{
										"uuid": "id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "decode",
									},
									map[string]any{
										"var": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body.decode`",
								},
								"parts": []any{
									"decode",
									"{id}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{},
				},
			},
			"timestamp_first": map[string]any{
				"fields": []any{},
				"name": "timestamp_first",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/timestamp-first",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "timestamp-first",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"timestamp-first",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 10,
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/timestamp-first/count/{count}",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "timestamp-first",
									},
									map[string]any{
										"lit": "count",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"timestamp-first",
									"count",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"count",
						},
					},
				},
			},
			"version_1": map[string]any{
				"fields": []any{},
				"name": "version_1",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v1",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v1",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v1",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 10,
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v1/count/{count}",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v1",
									},
									map[string]any{
										"lit": "count",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v1",
									"count",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"count",
						},
					},
				},
			},
			"version_3": map[string]any{
				"fields": []any{},
				"name": "version_3",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "https://www.google.com/",
											"kind": "param",
											"name": "name",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "ns:url",
											"kind": "param",
											"name": "namespace_id",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v3/namespace/{namespace}/name/{name}",
								"rename": map[string]any{
									"param": map[string]any{
										"namespace": "namespace_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v3",
									},
									map[string]any{
										"lit": "namespace",
									},
									map[string]any{
										"var": "namespace_id",
									},
									map[string]any{
										"lit": "name",
									},
									map[string]any{
										"var": "name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"namespace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v3",
									"namespace",
									"{namespace_id}",
									"name",
									"{name}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"namespace",
							"name",
						},
					},
				},
			},
			"version_4": map[string]any{
				"fields": []any{},
				"name": "version_4",
				"op": map[string]any{
					"list": map[string]any{
						"input": "data",
						"name": "list",
						"points": []any{
							map[string]any{
								"args": map[string]any{},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v4",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v4",
									},
								},
								"select": map[string]any{},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v4",
								},
							},
						},
					},
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": 10,
											"kind": "param",
											"name": "count",
											"orig": "count",
											"reqd": true,
											"type": "`$INTEGER`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v4/count/{count}",
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v4",
									},
									map[string]any{
										"lit": "count",
									},
									map[string]any{
										"var": "count",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"count",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v4",
									"count",
									"{count}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"count",
						},
					},
				},
			},
			"version_5": map[string]any{
				"fields": []any{},
				"name": "version_5",
				"op": map[string]any{
					"load": map[string]any{
						"input": "data",
						"name": "load",
						"points": []any{
							map[string]any{
								"args": map[string]any{
									"params": []any{
										map[string]any{
											"example": "https://www.uuidtools.com/generate",
											"kind": "param",
											"name": "name",
											"orig": "name",
											"reqd": true,
											"type": "`$STRING`",
										},
										map[string]any{
											"example": "ns:url",
											"kind": "param",
											"name": "namespace_id",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
										},
									},
								},
								"kind": "http",
								"method": "GET",
								"orig": "/generate/v5/namespace/{namespace}/name/{name}",
								"rename": map[string]any{
									"param": map[string]any{
										"namespace": "namespace_id",
									},
								},
								"segments": []any{
									map[string]any{
										"lit": "generate",
									},
									map[string]any{
										"lit": "v5",
									},
									map[string]any{
										"lit": "namespace",
									},
									map[string]any{
										"var": "namespace_id",
									},
									map[string]any{
										"lit": "name",
									},
									map[string]any{
										"var": "name",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"name",
										"namespace_id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"parts": []any{
									"generate",
									"v5",
									"namespace",
									"{namespace_id}",
									"name",
									"{name}",
								},
							},
						},
					},
				},
				"relations": map[string]any{
					"ancestors": []any{
						[]any{
							"namespace",
							"name",
						},
					},
				},
			},
		},
	}
}

// The plugin definitions the model selected per feature, as []any so a
// feature package can consume them without core naming its types. Empty
// when no active feature declares active plugin groups for this target.
var featurePlugins = map[string][]any{
}

// FeaturePlugins is the definitions list for one feature's chain.
func FeaturePlugins(name string) []any {
	return featurePlugins[name]
}

var (
	sharedConfigOnce sync.Once
	sharedConfigVal  map[string]any
)

// SharedConfig returns the process-wide config, built once on first use.
// The SDK reads the config on every request and never writes to it, so one
// instance is shared by every client rather than rebuilt per client.
//
// The returned map is shared: treat it as read-only. Callers that need to
// mutate should use MakeConfig, which always returns a fresh copy.
func SharedConfig() map[string]any {
	sharedConfigOnce.Do(func() {
		sharedConfigVal = MakeConfig()
	})
	return sharedConfigVal
}

func makeFeature(name string) Feature {
	switch name {
	case "test":
		if NewTestFeatureFunc != nil {
			return NewTestFeatureFunc()
		}
	default:
		if NewBaseFeatureFunc != nil {
			return NewBaseFeatureFunc()
		}
	}
	return nil
}
