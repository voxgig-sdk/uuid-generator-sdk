# UuidGenerator SDK utility registration
require_relative '../core/utility_type'
require_relative 'clean'
require_relative 'done'
require_relative 'make_error'
require_relative 'feature_add'
require_relative 'feature_hook'
require_relative 'feature_init'
require_relative 'fetcher'
require_relative 'make_fetch_def'
require_relative 'make_context'
require_relative 'make_options'
require_relative 'make_request'
require_relative 'make_response'
require_relative 'make_result'
require_relative 'make_point'
require_relative 'make_spec'
require_relative 'make_url'
require_relative 'param'
require_relative 'prepare_auth'
require_relative 'prepare_body'
require_relative 'prepare_headers'
require_relative 'prepare_method'
require_relative 'prepare_params'
require_relative 'prepare_path'
require_relative 'prepare_query'
require_relative 'result_basic'
require_relative 'result_body'
require_relative 'result_headers'
require_relative 'transform_request'
require_relative 'transform_response'

UuidGeneratorUtility.registrar = ->(u) {
  u.clean = UuidGeneratorUtilities::Clean
  u.done = UuidGeneratorUtilities::Done
  u.make_error = UuidGeneratorUtilities::MakeError
  u.feature_add = UuidGeneratorUtilities::FeatureAdd
  u.feature_hook = UuidGeneratorUtilities::FeatureHook
  u.feature_init = UuidGeneratorUtilities::FeatureInit
  u.fetcher = UuidGeneratorUtilities::Fetcher
  u.make_fetch_def = UuidGeneratorUtilities::MakeFetchDef
  u.make_context = UuidGeneratorUtilities::MakeContext
  u.make_options = UuidGeneratorUtilities::MakeOptions
  u.make_request = UuidGeneratorUtilities::MakeRequest
  u.make_response = UuidGeneratorUtilities::MakeResponse
  u.make_result = UuidGeneratorUtilities::MakeResult
  u.make_point = UuidGeneratorUtilities::MakePoint
  u.make_spec = UuidGeneratorUtilities::MakeSpec
  u.make_url = UuidGeneratorUtilities::MakeUrl
  u.param = UuidGeneratorUtilities::Param
  u.prepare_auth = UuidGeneratorUtilities::PrepareAuth
  u.prepare_body = UuidGeneratorUtilities::PrepareBody
  u.prepare_headers = UuidGeneratorUtilities::PrepareHeaders
  u.prepare_method = UuidGeneratorUtilities::PrepareMethod
  u.prepare_params = UuidGeneratorUtilities::PrepareParams
  u.prepare_path = UuidGeneratorUtilities::PreparePath
  u.prepare_query = UuidGeneratorUtilities::PrepareQuery
  u.result_basic = UuidGeneratorUtilities::ResultBasic
  u.result_body = UuidGeneratorUtilities::ResultBody
  u.result_headers = UuidGeneratorUtilities::ResultHeaders
  u.transform_request = UuidGeneratorUtilities::TransformRequest
  u.transform_response = UuidGeneratorUtilities::TransformResponse
}
