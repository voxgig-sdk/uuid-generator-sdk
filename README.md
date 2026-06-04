# UuidGenerator SDK

Generate UUIDs (v1, v3, v4, v5) and timestamp-first identifiers, or decode an existing UUID, over plain HTTP

> TypeScript, Python, PHP, Golang, Ruby, Lua SDKs, a CLI, an interactive REPL, and an MCP server for AI agents — all generated from one OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).

## About UUID Generator API

The UUID Generator API is the HTTP front-end for [uuidtools.com](https://www.uuidtools.com/), a small utility site that generates and inspects universally unique identifiers. The same generators that power the site's web UI are exposed under `https://www.uuidtools.com/api/` so other tools and services can request UUIDs directly.

What you get from the API:

- Time-and-node based **version 1** UUIDs (`/generate/v1`), with an optional `count` for bulk generation (up to 100)
- Namespace + name **version 3** (MD5) UUIDs at `/generate/v3/namespace/{ns}/name/{name}`
- Random **version 4** UUIDs at `/generate/v4`, also supporting `count`
- Namespace + name **version 5** (SHA-1) UUIDs at `/generate/v5/namespace/{ns}/name/{name}`
- **Timestamp-first** ordered UUIDs at `/generate/timestamp-first`, useful as database primary keys
- A **decoder** at `/decode/{uuid}` that returns the variant, version, embedded timestamp, clock sequence and node information

Operational notes: no API key or OAuth is required, CORS is enabled for browser clients, and the documented limit is 60 requests per minute per IP. Version 2 UUIDs are not provided. For `v3`/`v5`, the `name` segment may be base64-encoded when it contains characters that are awkward in a URL path.

## Try it

**TypeScript**
```bash
npm install uuid-generator
```

**Python**
```bash
pip install uuid-generator-sdk
```

**PHP**
```bash
composer require voxgig/uuid-generator-sdk
```

**Golang**
```bash
go get github.com/voxgig-sdk/uuid-generator-sdk/go
```

**Ruby**
```bash
gem install uuid-generator-sdk
```

**Lua**
```bash
luarocks install uuid-generator-sdk
```

## 30-second quickstart

### TypeScript

```ts
import { UuidGeneratorSDK } from 'uuid-generator'

const client = new UuidGeneratorSDK({})

```

See the [TypeScript README](ts/README.md) for the
full guide, or scroll down for the same example in other languages.

## What's in the box

| Surface | Use it for | Path |
| --- | --- | --- |
| **SDK** (TypeScript, Python, PHP, Golang, Ruby, Lua) | App integration | `ts/` `py/` `php/` `go/` `rb/` `lua/` |
| **CLI** | Scripts, CI, ops, one-off API calls | `go-cli/` |
| **MCP server** | AI agents (Claude, Cursor, Cline) | `go-mcp/` |

## Use it from an AI agent (MCP)

The generated MCP server exposes every operation in this SDK as an
[MCP](https://modelcontextprotocol.io) tool that Claude, Cursor or Cline
can call directly. Build and register it:

```bash
cd go-mcp && go build -o uuid-generator-mcp .
```

Then add it to your agent's MCP config (Claude Desktop, Cursor, etc.):

```json
{
  "mcpServers": {
    "uuid-generator": {
      "command": "/abs/path/to/uuid-generator-mcp"
    }
  }
}
```

## Entities

The API exposes 6 entities:

| Entity | Description | API path |
| --- | --- | --- |
| **Decode** | Inspects a supplied UUID and reports its variant, version and embedded fields (timestamp, clock sequence, node) via `GET /decode/{uuid}`. | `/decode/{uuid}` |
| **TimestampFirst** | Generates database-friendly UUIDs whose leading bytes encode the creation time, via `GET /generate/timestamp-first` (supports a `count` parameter). | `/generate/timestamp-first` |
| **Version1** | Time-and-node based UUIDs as defined by RFC 4122 v1, via `GET /generate/v1` with optional `count` (up to 100). | `/generate/v1` |
| **Version3** | Deterministic UUIDs derived from an MD5 hash of a namespace and a name, via `GET /generate/v3/namespace/{ns}/name/{name}`. | `/generate/v3/namespace/{namespace}/name/{name}` |
| **Version4** | Random UUIDs as defined by RFC 4122 v4, via `GET /generate/v4` with optional `count` for bulk generation. | `/generate/v4` |
| **Version5** | Deterministic UUIDs derived from a SHA-1 hash of a namespace and a name, via `GET /generate/v5/namespace/{ns}/name/{name}`. | `/generate/v5/namespace/{namespace}/name/{name}` |

Each entity supports the following operations where available: **load**,
**list**, **create**, **update**, and **remove**.

## Quickstart in other languages

### Python

```python
from uuidgenerator_sdk import UuidGeneratorSDK

client = UuidGeneratorSDK({})


# Load a specific decode
decode, err = client.Decode(None).load(
    {"id": "example_id"}, None
)
```

### PHP

```php
<?php
require_once 'uuidgenerator_sdk.php';

$client = new UuidGeneratorSDK([]);


// Load a specific decode
[$decode, $err] = $client->Decode(null)->load(
    ["id" => "example_id"], null
);
```

### Golang

```go
import sdk "github.com/voxgig-sdk/uuid-generator-sdk/go"

client := sdk.NewUuidGeneratorSDK(map[string]any{})

```

### Ruby

```ruby
require_relative "UuidGenerator_sdk"

client = UuidGeneratorSDK.new({})


# Load a specific decode
decode, err = client.Decode(nil).load(
  { "id" => "example_id" }, nil
)
```

### Lua

```lua
local sdk = require("uuid-generator_sdk")

local client = sdk.new({})


-- Load a specific decode
local decode, err = client:Decode(nil):load(
  { id = "example_id" }, nil
)
```

## Unit testing in offline mode

Every SDK ships a test mode that swaps the HTTP transport for an
in-memory mock, so unit tests run offline.

### TypeScript

```ts
const client = UuidGeneratorSDK.test()
const result = await client.Decode().load({ id: 'test01' })
// result.ok === true, result.data contains mock data
```

### Python

```python
client = UuidGeneratorSDK.test(None, None)
result, err = client.Decode(None).load(
    {"id": "test01"}, None
)
```

### PHP

```php
$client = UuidGeneratorSDK::test(null, null);
[$result, $err] = $client->Decode(null)->load(
    ["id" => "test01"], null
);
```

### Golang

```go
client := sdk.TestSDK(nil, nil)
result, err := client.Decode(nil).Load(
    map[string]any{"id": "test01"}, nil,
)
```

### Ruby

```ruby
client = UuidGeneratorSDK.test(nil, nil)
result, err = client.Decode(nil).load(
  { "id" => "test01" }, nil
)
```

### Lua

```lua
local client = sdk.test(nil, nil)
local result, err = client:Decode(nil):load(
  { id = "test01" }, nil
)
```

## How it works

Every SDK call runs the same five-stage pipeline:

1. **Point** — resolve the API endpoint from the operation definition.
2. **Spec** — build the HTTP specification (URL, method, headers, body).
3. **Request** — send the HTTP request.
4. **Response** — receive and parse the response.
5. **Result** — extract the result data for the caller.

A feature hook fires at each stage (e.g. `PrePoint`, `PreSpec`,
`PreRequest`), so features can inspect or modify the pipeline without
forking the SDK.

### Features

| Feature | Purpose |
| --- | --- |
| **TestFeature** | In-memory mock transport for testing without a live server |

Pass custom features via the `extend` option at construction time.

### Direct and Prepare

For endpoints the entity model doesn't cover, use the low-level methods:

- **`direct(fetchargs)`** — build and send an HTTP request in one step.
- **`prepare(fetchargs)`** — build the request without sending it.

Both accept a map with `path`, `method`, `params`, `query`,
`headers`, and `body`. See the [How-to guides](#how-to-guides) below.

## How-to guides

### Make a direct API call

When the entity interface does not cover an endpoint, use `direct`:

**TypeScript:**
```ts
const result = await client.direct({
  path: '/api/resource/{id}',
  method: 'GET',
  params: { id: 'example' },
})
console.log(result.data)
```

**Python:**
```python
result, err = client.direct({
    "path": "/api/resource/{id}",
    "method": "GET",
    "params": {"id": "example"},
})
```

**PHP:**
```php
[$result, $err] = $client->direct([
    "path" => "/api/resource/{id}",
    "method" => "GET",
    "params" => ["id" => "example"],
]);
```

**Go:**
```go
result, err := client.Direct(map[string]any{
    "path":   "/api/resource/{id}",
    "method": "GET",
    "params": map[string]any{"id": "example"},
})
```

**Ruby:**
```ruby
result, err = client.direct({
  "path" => "/api/resource/{id}",
  "method" => "GET",
  "params" => { "id" => "example" },
})
```

**Lua:**
```lua
local result, err = client:direct({
  path = "/api/resource/{id}",
  method = "GET",
  params = { id = "example" },
})
```

## Per-language documentation

- [TypeScript](ts/README.md)
- [Python](py/README.md)
- [PHP](php/README.md)
- [Golang](go/README.md)
- [Ruby](rb/README.md)
- [Lua](lua/README.md)

## Using the UUID Generator API

- Upstream: [https://www.uuidtools.com/](https://www.uuidtools.com/)
- API docs: [https://www.uuidtools.com/docs](https://www.uuidtools.com/docs)

- Operated by [uuidtools.com](https://www.uuidtools.com/) as a free public endpoint
- No formal open licence is published; usage is governed by the site [terms](https://www.uuidtools.com/terms)
- No authentication or API key is required
- Rate limit advertised at 60 requests per minute per IP address

---

Generated from the UUID Generator API OpenAPI spec by [@voxgig/sdkgen](https://github.com/voxgig/sdkgen).
