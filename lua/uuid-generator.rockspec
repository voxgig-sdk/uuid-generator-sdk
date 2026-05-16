package = "voxgig-sdk-uuid-generator"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/uuid-generator-sdk.git"
}
description = {
  summary = "UuidGenerator SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["uuid-generator_sdk"] = "uuid-generator_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
