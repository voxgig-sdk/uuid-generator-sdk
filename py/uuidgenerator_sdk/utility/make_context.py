# UuidGenerator SDK utility: make_context

from uuidgenerator_sdk.core.context import UuidGeneratorContext


def make_context_util(ctxmap, basectx):
    return UuidGeneratorContext(ctxmap, basectx)
