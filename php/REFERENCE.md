# UuidGenerator PHP SDK Reference

Complete API reference for the UuidGenerator PHP SDK.


## UuidGeneratorSDK

### Constructor

```php
require_once __DIR__ . '/uuid-generator_sdk.php';

$client = new UuidGeneratorSDK($options);
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$options` | `array` | SDK configuration options. |
| `$options["base"]` | `string` | Base URL for API requests. |
| `$options["prefix"]` | `string` | URL prefix appended after base. |
| `$options["suffix"]` | `string` | URL suffix appended after path. |
| `$options["headers"]` | `array` | Custom headers for all requests. |
| `$options["feature"]` | `array` | Feature configuration. |
| `$options["system"]` | `array` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorSDK::test($testopts = null, $sdkopts = null)`

Create a test client with mock features active. Both arguments may be `null`.

```php
$client = UuidGeneratorSDK::test();
```


### Instance Methods

#### `Decode($data = null)`

Create a new `DecodeEntity` instance. Pass `null` for no initial data.

#### `TimestampFirst($data = null)`

Create a new `TimestampFirstEntity` instance. Pass `null` for no initial data.

#### `Version1($data = null)`

Create a new `Version1Entity` instance. Pass `null` for no initial data.

#### `Version3($data = null)`

Create a new `Version3Entity` instance. Pass `null` for no initial data.

#### `Version4($data = null)`

Create a new `Version4Entity` instance. Pass `null` for no initial data.

#### `Version5($data = null)`

Create a new `Version5Entity` instance. Pass `null` for no initial data.

#### `optionsMap(): array`

Return a deep copy of the current SDK options.

#### `getUtility(): ProjectNameUtility`

Return a copy of the SDK utility object.

#### `direct(array $fetchargs = []): array`

Make a direct HTTP request to any API endpoint. This is the raw-HTTP escape
hatch: it does **not** throw. It returns a result array
`["ok" => bool, "status" => int, "headers" => array, "data" => mixed]`, or
`["ok" => false, "err" => \Exception]` on failure. Branch on `$result["ok"]`.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `$fetchargs["path"]` | `string` | URL path with optional `{param}` placeholders. |
| `$fetchargs["method"]` | `string` | HTTP method (default: `"GET"`). |
| `$fetchargs["params"]` | `array` | Path parameter values for `{param}` substitution. |
| `$fetchargs["query"]` | `array` | Query string parameters. |
| `$fetchargs["headers"]` | `array` | Request headers (merged with defaults). |
| `$fetchargs["body"]` | `mixed` | Request body (arrays are JSON-serialized). |
| `$fetchargs["ctrl"]` | `array` | Control options. |

**Returns:** `array` — the result dict (see above); never throws.

#### `prepare(array $fetchargs = []): mixed`

Prepare a fetch definition without sending the request. Returns the
`$fetchdef` array. Throws on error.


---

## DecodeEntity

```php
$decode = $client->decode();
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decode` | ``$OBJECT`` | No |  |
| `encode` | ``$OBJECT`` | No |  |

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->decode()->load(["id" => "decode_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): DecodeEntity`

Create a new `DecodeEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## TimestampFirstEntity

```php
$timestamp_first = $client->timestamp_first();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->timestamp_first()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->timestamp_first()->load(["id" => "timestamp_first_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): TimestampFirstEntity`

Create a new `TimestampFirstEntity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Version1Entity

```php
$version_1 = $client->version_1();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->version_1()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->version_1()->load(["id" => "version_1_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): Version1Entity`

Create a new `Version1Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Version3Entity

```php
$version_3 = $client->version_3();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->version_3()->load(["id" => "version_3_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): Version3Entity`

Create a new `Version3Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Version4Entity

```php
$version_4 = $client->version_4();
```

### Operations

#### `list(array $reqmatch, ?array $ctrl = null): mixed`

List entities matching the given criteria. Returns an array. Throws on error.

```php
$results = $client->version_4()->list([]);
```

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->version_4()->load(["id" => "version_4_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): Version4Entity`

Create a new `Version4Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Version5Entity

```php
$version_5 = $client->version_5();
```

### Operations

#### `load(array $reqmatch, ?array $ctrl = null): mixed`

Load a single entity matching the given criteria. Throws on error.

```php
$result = $client->version_5()->load(["id" => "version_5_id"]);
```

### Common Methods

#### `dataGet(): array`

Get the entity data. Returns a copy of the current data.

#### `dataSet($data): void`

Set the entity data.

#### `matchGet(): array`

Get the entity match criteria.

#### `matchSet($match): void`

Set the entity match criteria.

#### `make(): Version5Entity`

Create a new `Version5Entity` instance with the same client and
options.

#### `getName(): string`

Return the entity name.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```php
$client = new UuidGeneratorSDK([
  "feature" => [
    "test" => ["active" => true],
  ],
]);
```

