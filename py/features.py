# UuidGenerator SDK feature factory

from feature.base_feature import UuidGeneratorBaseFeature
from feature.test_feature import UuidGeneratorTestFeature


def _make_feature(name):
    features = {
        "base": lambda: UuidGeneratorBaseFeature(),
        "test": lambda: UuidGeneratorTestFeature(),
    }
    factory = features.get(name)
    if factory is not None:
        return factory()
    return features["base"]()
