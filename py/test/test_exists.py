# ProjectName SDK exists test

import pytest
from uuidgenerator_sdk import UuidGeneratorSDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = UuidGeneratorSDK.test(None, None)
        assert testsdk is not None
