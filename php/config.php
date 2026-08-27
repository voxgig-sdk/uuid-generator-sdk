<?php
declare(strict_types=1);

// UuidGenerator SDK configuration

class UuidGeneratorConfig
{
    /** @var array<string,mixed>|null */
    private static ?array $shared_config = null;

    /**
     * Return the process-wide config, built once on first use. The SDK reads
     * the config on every request and never writes to it, so one instance is
     * shared by every client rather than rebuilt per client.
     *
     * PHP arrays are copy-on-write, so callers that do mutate the result get
     * their own copy and cannot disturb the shared one.
     */
    public static function shared_config(): array
    {
        if (self::$shared_config === null) {
            self::$shared_config = self::make_config();
        }
        return self::$shared_config;
    }

    /**
     * Build a fresh, fully materialised config array. Every call rebuilds the
     * whole structure, so prefer shared_config unless you need a private copy.
     */
    public static function make_config(): array
    {
        return [
            "main" => [
                "name" => "UuidGenerator",
                "slug" => "uuid-generator",
                "version" => "0.0.1",
                "target" => "php",
            ],
            "feature" => [
                "test" => [
          'options' => [
            'active' => false,
          ],
          'transport' => 'base',
        ],
            ],
            "options" => [
                "base" => "https://www.uuidtools.com/api",
                "headers" => [
          'content-type' => 'application/json',
        ],
                "entity" => [
                    "decode" => [],
                    "timestamp_first" => [],
                    "version_1" => [],
                    "version_3" => [],
                    "version_4" => [],
                    "version_5" => [],
                ],
            ],
            "entity" => [
        'decode' => [
          'fields' => [
            [
              'name' => 'decode',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'encode',
              'type' => '`$OBJECT`',
            ],
            [
              'name' => 'id',
              'type' => '`$STRING`',
            ],
          ],
          'name' => 'decode',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'b01eb720-171a-11ea-b949-73c91bba743d',
                        'kind' => 'param',
                        'name' => 'id',
                        'orig' => 'uuid',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/decode/{uuid}',
                  'parts' => [
                    'decode',
                    '{id}',
                  ],
                  'rename' => [
                    'param' => [
                      'uuid' => 'id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body.decode`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [],
          ],
        ],
        'timestamp_first' => [
          'fields' => [],
          'name' => 'timestamp_first',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/timestamp-first',
                  'parts' => [
                    'generate',
                    'timestamp-first',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 10,
                        'kind' => 'param',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/timestamp-first/count/{count}',
                  'parts' => [
                    'generate',
                    'timestamp-first',
                    'count',
                    '{count}',
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'count',
              ],
            ],
          ],
        ],
        'version_1' => [
          'fields' => [],
          'name' => 'version_1',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v1',
                  'parts' => [
                    'generate',
                    'v1',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 10,
                        'kind' => 'param',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v1/count/{count}',
                  'parts' => [
                    'generate',
                    'v1',
                    'count',
                    '{count}',
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'count',
              ],
            ],
          ],
        ],
        'version_3' => [
          'fields' => [],
          'name' => 'version_3',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'https://www.google.com/',
                        'kind' => 'param',
                        'name' => 'name',
                        'orig' => 'name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'ns:url',
                        'kind' => 'param',
                        'name' => 'namespace_id',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v3/namespace/{namespace}/name/{name}',
                  'parts' => [
                    'generate',
                    'v3',
                    'namespace',
                    '{namespace_id}',
                    'name',
                    '{name}',
                  ],
                  'rename' => [
                    'param' => [
                      'namespace' => 'namespace_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'name',
                      'namespace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'namespace',
                'name',
              ],
            ],
          ],
        ],
        'version_4' => [
          'fields' => [],
          'name' => 'version_4',
          'op' => [
            'list' => [
              'input' => 'data',
              'name' => 'list',
              'points' => [
                [
                  'args' => [],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v4',
                  'parts' => [
                    'generate',
                    'v4',
                  ],
                  'select' => [],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 10,
                        'kind' => 'param',
                        'name' => 'count',
                        'orig' => 'count',
                        'reqd' => true,
                        'type' => '`$INTEGER`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v4/count/{count}',
                  'parts' => [
                    'generate',
                    'v4',
                    'count',
                    '{count}',
                  ],
                  'select' => [
                    'exist' => [
                      'count',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'count',
              ],
            ],
          ],
        ],
        'version_5' => [
          'fields' => [],
          'name' => 'version_5',
          'op' => [
            'load' => [
              'input' => 'data',
              'name' => 'load',
              'points' => [
                [
                  'args' => [
                    'params' => [
                      [
                        'example' => 'https://www.uuidtools.com/generate',
                        'kind' => 'param',
                        'name' => 'name',
                        'orig' => 'name',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                      [
                        'example' => 'ns:url',
                        'kind' => 'param',
                        'name' => 'namespace_id',
                        'orig' => 'namespace',
                        'reqd' => true,
                        'type' => '`$STRING`',
                      ],
                    ],
                  ],
                  'kind' => 'http',
                  'method' => 'GET',
                  'orig' => '/generate/v5/namespace/{namespace}/name/{name}',
                  'parts' => [
                    'generate',
                    'v5',
                    'namespace',
                    '{namespace_id}',
                    'name',
                    '{name}',
                  ],
                  'rename' => [
                    'param' => [
                      'namespace' => 'namespace_id',
                    ],
                  ],
                  'select' => [
                    'exist' => [
                      'name',
                      'namespace_id',
                    ],
                  ],
                  'transform' => [
                    'req' => '`reqdata`',
                    'res' => '`body`',
                  ],
                ],
              ],
            ],
          ],
          'relations' => [
            'ancestors' => [
              [
                'namespace',
                'name',
              ],
            ],
          ],
        ],
      ],
        ];
    }


    public static function make_feature(string $name)
    {
        require_once __DIR__ . '/features.php';
        return UuidGeneratorFeatures::make_feature($name);
    }
}
