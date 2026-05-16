# UuidGenerator SDK exists test

require "minitest/autorun"
require_relative "../UuidGenerator_sdk"

class ExistsTest < Minitest::Test
  def test_create_test_sdk
    testsdk = UuidGeneratorSDK.test(nil, nil)
    assert !testsdk.nil?
  end
end
