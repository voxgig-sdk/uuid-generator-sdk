package core

var UtilityRegistrar func(u *Utility)

var NewBaseFeatureFunc func() Feature

var NewRatelimitFeatureFunc func() Feature

var NewRetryFeatureFunc func() Feature

var NewTestFeatureFunc func() Feature

var NewTimeoutFeatureFunc func() Feature

var NewDecodeEntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

var NewTimestampFirstEntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

var NewVersion1EntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

var NewVersion3EntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

var NewVersion4EntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

var NewVersion5EntityFunc func(client *UuidGeneratorSDK, entopts map[string]any) UuidGeneratorEntity

