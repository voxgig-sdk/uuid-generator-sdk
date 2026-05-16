# UuidGenerator SDK feature factory

require_relative 'feature/base_feature'
require_relative 'feature/test_feature'


module UuidGeneratorFeatures
  def self.make_feature(name)
    case name
    when "base"
      UuidGeneratorBaseFeature.new
    when "test"
      UuidGeneratorTestFeature.new
    else
      UuidGeneratorBaseFeature.new
    end
  end
end
