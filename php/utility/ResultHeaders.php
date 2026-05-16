<?php
declare(strict_types=1);

// UuidGenerator SDK utility: result_headers

class UuidGeneratorResultHeaders
{
    public static function call(UuidGeneratorContext $ctx): ?UuidGeneratorResult
    {
        $response = $ctx->response;
        $result = $ctx->result;
        if ($result) {
            if ($response && is_array($response->headers)) {
                $result->headers = $response->headers;
            } else {
                $result->headers = [];
            }
        }
        return $result;
    }
}
