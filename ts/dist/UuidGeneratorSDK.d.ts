import { DecodeEntity } from './entity/DecodeEntity';
import { TimestampFirstEntity } from './entity/TimestampFirstEntity';
import { Version1Entity } from './entity/Version1Entity';
import { Version3Entity } from './entity/Version3Entity';
import { Version4Entity } from './entity/Version4Entity';
import { Version5Entity } from './entity/Version5Entity';
export type * from './UuidGeneratorTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { UuidGeneratorEntityBase } from './UuidGeneratorEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class UuidGeneratorSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    } | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    Decode(entopts?: Record<string, any>): DecodeEntity;
    TimestampFirst(entopts?: Record<string, any>): TimestampFirstEntity;
    Version1(entopts?: Record<string, any>): Version1Entity;
    Version3(entopts?: Record<string, any>): Version3Entity;
    Version4(entopts?: Record<string, any>): Version4Entity;
    Version5(entopts?: Record<string, any>): Version5Entity;
    static test(testoptsarg?: any, sdkoptsarg?: any): UuidGeneratorSDK;
    tester(testopts?: any, sdkopts?: any): UuidGeneratorSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof UuidGeneratorSDK;
export { stdutil, config, BaseFeature, UuidGeneratorEntityBase, UuidGeneratorSDK, SDK, };
