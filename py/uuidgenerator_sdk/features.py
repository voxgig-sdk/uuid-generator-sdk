# UuidGenerator SDK feature factory

from uuidgenerator_sdk.feature.base_feature import UuidGeneratorBaseFeature
from uuidgenerator_sdk.feature.ratelimit_feature import UuidGeneratorRatelimitFeature
from uuidgenerator_sdk.feature.retry_feature import UuidGeneratorRetryFeature
from uuidgenerator_sdk.feature.test_feature import UuidGeneratorTestFeature
from uuidgenerator_sdk.feature.timeout_feature import UuidGeneratorTimeoutFeature


_FEATURES = {
    "base": lambda: UuidGeneratorBaseFeature(),
    "ratelimit": lambda: UuidGeneratorRatelimitFeature(),
    "retry": lambda: UuidGeneratorRetryFeature(),
    "test": lambda: UuidGeneratorTestFeature(),
    "timeout": lambda: UuidGeneratorTimeoutFeature(),
}


def _make_feature(name):
    factory = _FEATURES.get(name)
    if factory is not None:
        return factory()
    return _FEATURES["base"]()


# True when this SDK was generated with the named feature class - the
# constructor's tolerance for extend-carried features reads this (an
# active name with no generated class must not become a BaseFeature
# stray when an extend instance carries it).
def _has_feature(name):
    return name in _FEATURES
