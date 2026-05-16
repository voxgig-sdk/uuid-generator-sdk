<?php
declare(strict_types=1);

// UuidGenerator SDK utility registration

require_once __DIR__ . '/../core/UtilityType.php';
require_once __DIR__ . '/Clean.php';
require_once __DIR__ . '/Done.php';
require_once __DIR__ . '/MakeError.php';
require_once __DIR__ . '/FeatureAdd.php';
require_once __DIR__ . '/FeatureHook.php';
require_once __DIR__ . '/FeatureInit.php';
require_once __DIR__ . '/Fetcher.php';
require_once __DIR__ . '/MakeFetchDef.php';
require_once __DIR__ . '/MakeContext.php';
require_once __DIR__ . '/MakeOptions.php';
require_once __DIR__ . '/MakeRequest.php';
require_once __DIR__ . '/MakeResponse.php';
require_once __DIR__ . '/MakeResult.php';
require_once __DIR__ . '/MakePoint.php';
require_once __DIR__ . '/MakeSpec.php';
require_once __DIR__ . '/MakeUrl.php';
require_once __DIR__ . '/Param.php';
require_once __DIR__ . '/PrepareAuth.php';
require_once __DIR__ . '/PrepareBody.php';
require_once __DIR__ . '/PrepareHeaders.php';
require_once __DIR__ . '/PrepareMethod.php';
require_once __DIR__ . '/PrepareParams.php';
require_once __DIR__ . '/PreparePath.php';
require_once __DIR__ . '/PrepareQuery.php';
require_once __DIR__ . '/ResultBasic.php';
require_once __DIR__ . '/ResultBody.php';
require_once __DIR__ . '/ResultHeaders.php';
require_once __DIR__ . '/TransformRequest.php';
require_once __DIR__ . '/TransformResponse.php';

UuidGeneratorUtility::setRegistrar(function (UuidGeneratorUtility $u): void {
    $u->clean = [UuidGeneratorClean::class, 'call'];
    $u->done = [UuidGeneratorDone::class, 'call'];
    $u->make_error = [UuidGeneratorMakeError::class, 'call'];
    $u->feature_add = [UuidGeneratorFeatureAdd::class, 'call'];
    $u->feature_hook = [UuidGeneratorFeatureHook::class, 'call'];
    $u->feature_init = [UuidGeneratorFeatureInit::class, 'call'];
    $u->fetcher = [UuidGeneratorFetcher::class, 'call'];
    $u->make_fetch_def = [UuidGeneratorMakeFetchDef::class, 'call'];
    $u->make_context = [UuidGeneratorMakeContext::class, 'call'];
    $u->make_options = [UuidGeneratorMakeOptions::class, 'call'];
    $u->make_request = [UuidGeneratorMakeRequest::class, 'call'];
    $u->make_response = [UuidGeneratorMakeResponse::class, 'call'];
    $u->make_result = [UuidGeneratorMakeResult::class, 'call'];
    $u->make_point = [UuidGeneratorMakePoint::class, 'call'];
    $u->make_spec = [UuidGeneratorMakeSpec::class, 'call'];
    $u->make_url = [UuidGeneratorMakeUrl::class, 'call'];
    $u->param = [UuidGeneratorParam::class, 'call'];
    $u->prepare_auth = [UuidGeneratorPrepareAuth::class, 'call'];
    $u->prepare_body = [UuidGeneratorPrepareBody::class, 'call'];
    $u->prepare_headers = [UuidGeneratorPrepareHeaders::class, 'call'];
    $u->prepare_method = [UuidGeneratorPrepareMethod::class, 'call'];
    $u->prepare_params = [UuidGeneratorPrepareParams::class, 'call'];
    $u->prepare_path = [UuidGeneratorPreparePath::class, 'call'];
    $u->prepare_query = [UuidGeneratorPrepareQuery::class, 'call'];
    $u->result_basic = [UuidGeneratorResultBasic::class, 'call'];
    $u->result_body = [UuidGeneratorResultBody::class, 'call'];
    $u->result_headers = [UuidGeneratorResultHeaders::class, 'call'];
    $u->transform_request = [UuidGeneratorTransformRequest::class, 'call'];
    $u->transform_response = [UuidGeneratorTransformResponse::class, 'call'];
});
