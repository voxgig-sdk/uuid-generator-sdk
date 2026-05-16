<?php
declare(strict_types=1);

// UuidGenerator SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class UuidGeneratorFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new UuidGeneratorBaseFeature();
            case "test":
                return new UuidGeneratorTestFeature();
            default:
                return new UuidGeneratorBaseFeature();
        }
    }
}
