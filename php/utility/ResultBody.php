<?php
declare(strict_types=1);

// UuidGenerator SDK utility: result_body

class UuidGeneratorResultBody
{
    public static function call(UuidGeneratorContext $ctx): ?UuidGeneratorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result && $response && $response->json_func && $response->body) {
            $result->body = ($response->json_func)();
        }
        return $result;
    }
}
