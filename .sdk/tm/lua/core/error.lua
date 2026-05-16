-- UuidGenerator SDK error

local UuidGeneratorError = {}
UuidGeneratorError.__index = UuidGeneratorError


function UuidGeneratorError.new(code, msg, ctx)
  local self = setmetatable({}, UuidGeneratorError)
  self.is_sdk_error = true
  self.sdk = "UuidGenerator"
  self.code = code or ""
  self.msg = msg or ""
  self.ctx = ctx
  self.result = nil
  self.spec = nil
  return self
end


function UuidGeneratorError:error()
  return self.msg
end


function UuidGeneratorError:__tostring()
  return self.msg
end


return UuidGeneratorError
