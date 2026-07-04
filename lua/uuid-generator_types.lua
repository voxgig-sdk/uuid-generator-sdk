-- Typed models for the UuidGenerator SDK (LuaLS annotations).
--
-- GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
-- params (op.<name>.points[].args.params[]). Field/param types come from the
-- canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
-- @voxgig/apidef VALID_CANON). Annotations only — no runtime effect. Do not
-- edit by hand.

---@class Decode
---@field decode? table
---@field encode? table

---@class DecodeLoadMatch
---@field id string

---@class TimestampFirst

---@class TimestampFirstLoadMatch
---@field count number

---@class TimestampFirstListMatch

---@class Version1

---@class Version1LoadMatch
---@field count number

---@class Version1ListMatch

---@class Version3

---@class Version3LoadMatch
---@field name string
---@field namespace_id string

---@class Version4

---@class Version4LoadMatch
---@field count number

---@class Version4ListMatch

---@class Version5

---@class Version5LoadMatch
---@field name string
---@field namespace_id string

local M = {}

return M
