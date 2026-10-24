# UuidGenerator SDK utility: prepare_body
require_relative 'media'
module UuidGeneratorUtilities
  PrepareBody = ->(ctx) {
    return nil unless ctx.op.input == "data"
    return UuidGeneratorUtilities.raw_body(ctx.reqdata) if UuidGeneratorUtilities.raw_request?(ctx.point)
    ctx.utility.transform_request.call(ctx)
  }
end
