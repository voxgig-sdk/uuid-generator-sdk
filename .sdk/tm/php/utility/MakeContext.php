<?php
declare(strict_types=1);

// UuidGenerator SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class UuidGeneratorMakeContext
{
    public static function call(array $ctxmap, ?UuidGeneratorContext $basectx): UuidGeneratorContext
    {
        return new UuidGeneratorContext($ctxmap, $basectx);
    }
}
