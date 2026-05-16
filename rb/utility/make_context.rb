# UuidGenerator SDK utility: make_context
require_relative '../core/context'
module UuidGeneratorUtilities
  MakeContext = ->(ctxmap, basectx) {
    UuidGeneratorContext.new(ctxmap, basectx)
  }
end
