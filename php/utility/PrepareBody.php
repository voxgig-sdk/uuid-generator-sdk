<?php
declare(strict_types=1);

// UuidGenerator SDK utility: prepare_body

class UuidGeneratorPrepareBody
{
    public static function call(UuidGeneratorContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
