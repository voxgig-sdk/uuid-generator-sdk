// Typed models for the UuidGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.

export interface Decode {
  decode?: Record<string, any>
  encode?: Record<string, any>
}

export interface DecodeLoadMatch {
  id: string
}

export interface TimestampFirst {
}

export interface TimestampFirstLoadMatch {
  count: number
}

export type TimestampFirstListMatch = Partial<TimestampFirst>

export interface Version1 {
}

export interface Version1LoadMatch {
  count: number
}

export type Version1ListMatch = Partial<Version1>

export interface Version3 {
}

export interface Version3LoadMatch {
  name: string
  namespace_id: string
}

export interface Version4 {
}

export interface Version4LoadMatch {
  count: number
}

export type Version4ListMatch = Partial<Version4>

export interface Version5 {
}

export interface Version5LoadMatch {
  name: string
  namespace_id: string
}

