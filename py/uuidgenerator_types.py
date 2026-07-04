# Typed models for the UuidGenerator SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Decode:
    decode: Optional[dict] = None
    encode: Optional[dict] = None


@dataclass
class DecodeLoadMatch:
    id: str


@dataclass
class TimestampFirst:
    pass


@dataclass
class TimestampFirstLoadMatch:
    count: int


@dataclass
class TimestampFirstListMatch:
    pass


@dataclass
class Version1:
    pass


@dataclass
class Version1LoadMatch:
    count: int


@dataclass
class Version1ListMatch:
    pass


@dataclass
class Version3:
    pass


@dataclass
class Version3LoadMatch:
    name: str
    namespace_id: str


@dataclass
class Version4:
    pass


@dataclass
class Version4LoadMatch:
    count: int


@dataclass
class Version4ListMatch:
    pass


@dataclass
class Version5:
    pass


@dataclass
class Version5LoadMatch:
    name: str
    namespace_id: str

