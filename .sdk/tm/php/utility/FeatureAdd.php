<?php
declare(strict_types=1);

// UuidGenerator SDK utility: feature_add

class UuidGeneratorFeatureAdd
{
    public static function call(UuidGeneratorContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
