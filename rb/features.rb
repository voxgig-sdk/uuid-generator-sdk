# UuidGenerator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/ratelimit_feature'
require_relative 'feature/retry_feature'
require_relative 'feature/test_feature'
require_relative 'feature/timeout_feature'


module UuidGeneratorFeatures
  def self.make_feature(name)
    case name
    when "base"
      UuidGeneratorBaseFeature.new
    when "ratelimit"
      UuidGeneratorRatelimitFeature.new
    when "retry"
      UuidGeneratorRetryFeature.new
    when "test"
      UuidGeneratorTestFeature.new
    when "timeout"
      UuidGeneratorTimeoutFeature.new
    else
      UuidGeneratorBaseFeature.new
    end
  end
end
