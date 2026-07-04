# UuidGenerator TypeScript SDK Reference

Complete API reference for the UuidGenerator TypeScript SDK.


## UuidGeneratorSDK

### Constructor

```ts
new UuidGeneratorSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `UuidGeneratorSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = UuidGeneratorSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `UuidGeneratorSDK` instance in test mode.


### Instance Methods

#### `Decode(data?: object)`

Create a new `Decode` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DecodeEntity` instance.

#### `TimestampFirst(data?: object)`

Create a new `TimestampFirst` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `TimestampFirstEntity` instance.

#### `Version1(data?: object)`

Create a new `Version1` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Version1Entity` instance.

#### `Version3(data?: object)`

Create a new `Version3` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Version3Entity` instance.

#### `Version4(data?: object)`

Create a new `Version4` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Version4Entity` instance.

#### `Version5(data?: object)`

Create a new `Version5` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `Version5Entity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `UuidGeneratorSDK.test()`.

**Returns:** `UuidGeneratorSDK` instance in test mode.


---

## DecodeEntity

```ts
const decode = client.decode
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `decode` | ``$OBJECT`` | No |  |
| `encode` | ``$OBJECT`` | No |  |

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.decode.load({ id: 'decode_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DecodeEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## TimestampFirstEntity

```ts
const timestamp_first = client.timestamp_first
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.timestamp_first.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.timestamp_first.load({ id: 'timestamp_first_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `TimestampFirstEntity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Version1Entity

```ts
const version_1 = client.version_1
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.version_1.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.version_1.load({ id: 'version_1_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Version1Entity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Version3Entity

```ts
const version_3 = client.version_3
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.version_3.load({ id: 'version_3_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Version3Entity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Version4Entity

```ts
const version_4 = client.version_4
```

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.version_4.list()
```

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.version_4.load({ id: 'version_4_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Version4Entity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Version5Entity

```ts
const version_5 = client.version_5
```

### Operations

#### `load(match: object, ctrl?: object)`

Load a single entity matching the given criteria.

```ts
const result = await client.version_5.load({ id: 'version_5_id' })
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `Version5Entity` instance with the same client and
options.

#### `client()`

Return the parent `UuidGeneratorSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | In-memory mock transport for testing without a live server |


Features are activated via the `feature` option:

```ts
const client = new UuidGeneratorSDK({
  feature: {
    test: { active: true },
  }
})
```

