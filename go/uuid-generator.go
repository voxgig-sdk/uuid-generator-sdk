package voxgiguuidgeneratorsdk

import (
	"github.com/voxgig-sdk/uuid-generator-sdk/go/core"
	"github.com/voxgig-sdk/uuid-generator-sdk/go/entity"
	"github.com/voxgig-sdk/uuid-generator-sdk/go/feature"
	_ "github.com/voxgig-sdk/uuid-generator-sdk/go/utility"
)

// Type aliases preserve external API.
type UuidGeneratorSDK = core.UuidGeneratorSDK
type Context = core.Context
type Utility = core.Utility
type Feature = core.Feature
type Entity = core.Entity
type UuidGeneratorEntity = core.UuidGeneratorEntity
type FetcherFunc = core.FetcherFunc
type Spec = core.Spec
type Result = core.Result
type Response = core.Response
type Operation = core.Operation
type Control = core.Control
type UuidGeneratorError = core.UuidGeneratorError

// BaseFeature from feature package.
type BaseFeature = feature.BaseFeature

func init() {
	core.NewBaseFeatureFunc = func() core.Feature {
		return feature.NewBaseFeature()
	}
	core.NewTestFeatureFunc = func() core.Feature {
		return feature.NewTestFeature()
	}
	core.NewDecodeEntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewDecodeEntity(client, entopts)
	}
	core.NewTimestampFirstEntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewTimestampFirstEntity(client, entopts)
	}
	core.NewVersion1EntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewVersion1Entity(client, entopts)
	}
	core.NewVersion3EntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewVersion3Entity(client, entopts)
	}
	core.NewVersion4EntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewVersion4Entity(client, entopts)
	}
	core.NewVersion5EntityFunc = func(client *core.UuidGeneratorSDK, entopts map[string]any) core.UuidGeneratorEntity {
		return entity.NewVersion5Entity(client, entopts)
	}
}

// Constructor re-exports.
var NewUuidGeneratorSDK = core.NewUuidGeneratorSDK
var TestSDK = core.TestSDK
var NewContext = core.NewContext
var NewSpec = core.NewSpec
var NewResult = core.NewResult
var NewResponse = core.NewResponse
var NewOperation = core.NewOperation
var MakeConfig = core.MakeConfig
var NewBaseFeature = feature.NewBaseFeature
var NewTestFeature = feature.NewTestFeature
