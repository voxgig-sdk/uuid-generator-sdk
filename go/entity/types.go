// Typed models for the UuidGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
package entity

import "encoding/json"

// Decode is the typed data model for the decode entity.
type Decode struct {
	Decode *map[string]any `json:"decode,omitempty"`
	Encode *map[string]any `json:"encode,omitempty"`
}

// DecodeLoadMatch is the typed request payload for Decode.LoadTyped.
type DecodeLoadMatch struct {
	Id string `json:"id"`
}

// TimestampFirst is the typed data model for the timestamp_first entity.
type TimestampFirst struct {
}

// TimestampFirstLoadMatch is the typed request payload for TimestampFirst.LoadTyped.
type TimestampFirstLoadMatch struct {
	Count int `json:"count"`
}

// TimestampFirstListMatch mirrors the timestamp_first fields as an all-optional match
// filter (Go analog of Partial<TimestampFirst>).
type TimestampFirstListMatch struct {
}

// Version1 is the typed data model for the version_1 entity.
type Version1 struct {
}

// Version1LoadMatch is the typed request payload for Version1.LoadTyped.
type Version1LoadMatch struct {
	Count int `json:"count"`
}

// Version1ListMatch mirrors the version_1 fields as an all-optional match
// filter (Go analog of Partial<Version1>).
type Version1ListMatch struct {
}

// Version3 is the typed data model for the version_3 entity.
type Version3 struct {
}

// Version3LoadMatch is the typed request payload for Version3.LoadTyped.
type Version3LoadMatch struct {
	Name string `json:"name"`
	NamespaceId string `json:"namespace_id"`
}

// Version4 is the typed data model for the version_4 entity.
type Version4 struct {
}

// Version4LoadMatch is the typed request payload for Version4.LoadTyped.
type Version4LoadMatch struct {
	Count int `json:"count"`
}

// Version4ListMatch mirrors the version_4 fields as an all-optional match
// filter (Go analog of Partial<Version4>).
type Version4ListMatch struct {
}

// Version5 is the typed data model for the version_5 entity.
type Version5 struct {
}

// Version5LoadMatch is the typed request payload for Version5.LoadTyped.
type Version5LoadMatch struct {
	Name string `json:"name"`
	NamespaceId string `json:"namespace_id"`
}

// asMap turns a typed request/data struct into the map[string]any the
// runtime op pipeline consumes, honouring the json tags above.
func asMap(v any) map[string]any {
	out := map[string]any{}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedFrom decodes a runtime value (a map[string]any produced by the op
// pipeline) into a typed model T via a JSON round-trip. On any error it
// returns the zero value of T; the op's own (value, error) tuple carries the
// real error.
func typedFrom[T any](v any) T {
	var out T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}

// typedSliceFrom decodes a runtime list value ([]any of maps) into a typed
// slice []T via a JSON round-trip, for list ops.
func typedSliceFrom[T any](v any) []T {
	var out []T
	if v == nil {
		return out
	}
	b, err := json.Marshal(v)
	if err != nil {
		return out
	}
	_ = json.Unmarshal(b, &out)
	return out
}
