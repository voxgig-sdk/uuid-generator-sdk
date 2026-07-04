# frozen_string_literal: true

# Typed models for the UuidGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Member types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Ruby types are unenforced; these YARD
# annotations document the shapes. Do not edit by hand.

# Decode entity data model.
#
# @!attribute [rw] decode
#   @return [Hash, nil]
#
# @!attribute [rw] encode
#   @return [Hash, nil]
Decode = Struct.new(
  :decode,
  :encode,
  keyword_init: true
)

# Request payload for Decode#load.
#
# @!attribute [rw] id
#   @return [String]
DecodeLoadMatch = Struct.new(
  :id,
  keyword_init: true
)

# TimestampFirst entity data model.
class TimestampFirst
end

# Request payload for TimestampFirst#load.
#
# @!attribute [rw] count
#   @return [Integer]
TimestampFirstLoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Match filter for TimestampFirst#list (any subset of TimestampFirst fields).
class TimestampFirstListMatch
end

# Version1 entity data model.
class Version1
end

# Request payload for Version1#load.
#
# @!attribute [rw] count
#   @return [Integer]
Version1LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Match filter for Version1#list (any subset of Version1 fields).
class Version1ListMatch
end

# Version3 entity data model.
class Version3
end

# Request payload for Version3#load.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] namespace_id
#   @return [String]
Version3LoadMatch = Struct.new(
  :name,
  :namespace_id,
  keyword_init: true
)

# Version4 entity data model.
class Version4
end

# Request payload for Version4#load.
#
# @!attribute [rw] count
#   @return [Integer]
Version4LoadMatch = Struct.new(
  :count,
  keyword_init: true
)

# Match filter for Version4#list (any subset of Version4 fields).
class Version4ListMatch
end

# Version5 entity data model.
class Version5
end

# Request payload for Version5#load.
#
# @!attribute [rw] name
#   @return [String]
#
# @!attribute [rw] namespace_id
#   @return [String]
Version5LoadMatch = Struct.new(
  :name,
  :namespace_id,
  keyword_init: true
)

