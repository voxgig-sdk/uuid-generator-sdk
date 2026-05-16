# UuidGenerator SDK utility: feature_add
module UuidGeneratorUtilities
  FeatureAdd = ->(ctx, f) {
    ctx.client.features << f
  }
end
