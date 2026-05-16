<?php
declare(strict_types=1);

// UuidGenerator SDK base feature

class UuidGeneratorBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(UuidGeneratorContext $ctx, array $options): void {}
    public function PostConstruct(UuidGeneratorContext $ctx): void {}
    public function PostConstructEntity(UuidGeneratorContext $ctx): void {}
    public function SetData(UuidGeneratorContext $ctx): void {}
    public function GetData(UuidGeneratorContext $ctx): void {}
    public function GetMatch(UuidGeneratorContext $ctx): void {}
    public function SetMatch(UuidGeneratorContext $ctx): void {}
    public function PrePoint(UuidGeneratorContext $ctx): void {}
    public function PreSpec(UuidGeneratorContext $ctx): void {}
    public function PreRequest(UuidGeneratorContext $ctx): void {}
    public function PreResponse(UuidGeneratorContext $ctx): void {}
    public function PreResult(UuidGeneratorContext $ctx): void {}
    public function PreDone(UuidGeneratorContext $ctx): void {}
    public function PreUnexpected(UuidGeneratorContext $ctx): void {}
}
