<?php
declare(strict_types=1);

// Typed models for the UuidGenerator SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Decode entity data model. */
class Decode
{
    public ?array $decode = null;
    public ?array $encode = null;
}

/** Request payload for Decode#load. */
class DecodeLoadMatch
{
    public string $id;
}

/** TimestampFirst entity data model. */
class TimestampFirst
{
}

/** Request payload for TimestampFirst#load. */
class TimestampFirstLoadMatch
{
    public int $count;
}

/** Match filter for TimestampFirst#list (any subset of TimestampFirst fields). */
class TimestampFirstListMatch
{
}

/** Version1 entity data model. */
class Version1
{
}

/** Request payload for Version1#load. */
class Version1LoadMatch
{
    public int $count;
}

/** Match filter for Version1#list (any subset of Version1 fields). */
class Version1ListMatch
{
}

/** Version3 entity data model. */
class Version3
{
}

/** Request payload for Version3#load. */
class Version3LoadMatch
{
    public string $name;
    public string $namespace_id;
}

/** Version4 entity data model. */
class Version4
{
}

/** Request payload for Version4#load. */
class Version4LoadMatch
{
    public int $count;
}

/** Match filter for Version4#list (any subset of Version4 fields). */
class Version4ListMatch
{
}

/** Version5 entity data model. */
class Version5
{
}

/** Request payload for Version5#load. */
class Version5LoadMatch
{
    public string $name;
    public string $namespace_id;
}

