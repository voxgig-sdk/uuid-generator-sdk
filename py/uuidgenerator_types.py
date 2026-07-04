# Typed models for the UuidGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.
#
# These are TypedDicts, not dataclasses: the SDK ops return/accept plain dicts
# at runtime, and a TypedDict IS a dict shape, so the types match the runtime.
# Optional (req:false) keys are modelled as TypedDict key-optionality
# (total=False), split into a required base + total=False subclass when a type
# has both required and optional keys.

from __future__ import annotations

from typing import TypedDict, Any


class Decode(TypedDict, total=False):
    decode: dict
    encode: dict


class DecodeLoadMatch(TypedDict):
    id: str


class TimestampFirst(TypedDict):
    pass


class TimestampFirstLoadMatch(TypedDict):
    count: int


class TimestampFirstListMatch(TypedDict):
    pass


class Version1(TypedDict):
    pass


class Version1LoadMatch(TypedDict):
    count: int


class Version1ListMatch(TypedDict):
    pass


class Version3(TypedDict):
    pass


class Version3LoadMatch(TypedDict):
    name: str
    namespace_id: str


class Version4(TypedDict):
    pass


class Version4LoadMatch(TypedDict):
    count: int


class Version4ListMatch(TypedDict):
    pass


class Version5(TypedDict):
    pass


class Version5LoadMatch(TypedDict):
    name: str
    namespace_id: str
