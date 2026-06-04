package core

func MakeConfig() map[string]any {
	return map[string]any{
		"main": map[string]any{
			"name": "UuidGenerator",
		},
		"feature": map[string]any{
			"test": map[string]any{
				"options": map[string]any{
					"active": false,
				},
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
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 0,
					},
					map[string]any{
						"name": "encode",
						"req": false,
						"type": "`$OBJECT`",
						"active": true,
						"index$": 1,
					},
				},
				"name": "decode",
				"op": map[string]any{
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/decode/{uuid}",
								"parts": []any{
									"decode",
									"{id}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"uuid": "id",
									},
								},
								"select": map[string]any{
									"exist": []any{
										"id",
									},
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/generate/timestamp-first",
								"parts": []any{
									"generate",
									"timestamp-first",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/generate/timestamp-first/count/{count}",
								"parts": []any{
									"generate",
									"timestamp-first",
									"count",
									"{count}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/generate/v1",
								"parts": []any{
									"generate",
									"v1",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/generate/v1/count/{count}",
								"parts": []any{
									"generate",
									"v1",
									"count",
									"{count}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"active": true,
										},
										map[string]any{
											"example": "ns:url",
											"kind": "param",
											"name": "namespace_id",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/generate/v3/namespace/{namespace}/name/{name}",
								"parts": []any{
									"generate",
									"v3",
									"namespace",
									"{namespace_id}",
									"name",
									"{name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"namespace": "namespace_id",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
						"name": "list",
						"points": []any{
							map[string]any{
								"method": "GET",
								"orig": "/generate/v4",
								"parts": []any{
									"generate",
									"v4",
								},
								"transform": map[string]any{
									"req": "`reqdata`",
									"res": "`body`",
								},
								"active": true,
								"args": map[string]any{},
								"select": map[string]any{},
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "list",
					},
					"load": map[string]any{
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
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/generate/v4/count/{count}",
								"parts": []any{
									"generate",
									"v4",
									"count",
									"{count}",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
											"active": true,
										},
										map[string]any{
											"example": "ns:url",
											"kind": "param",
											"name": "namespace_id",
											"orig": "namespace",
											"reqd": true,
											"type": "`$STRING`",
											"active": true,
										},
									},
								},
								"method": "GET",
								"orig": "/generate/v5/namespace/{namespace}/name/{name}",
								"parts": []any{
									"generate",
									"v5",
									"namespace",
									"{namespace_id}",
									"name",
									"{name}",
								},
								"rename": map[string]any{
									"param": map[string]any{
										"namespace": "namespace_id",
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
								"active": true,
								"index$": 0,
							},
						},
						"input": "data",
						"key$": "load",
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
