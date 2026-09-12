import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { TimestampFirst, TimestampFirstLoadMatch, TimestampFirstListMatch } from '../UuidGeneratorTypes';
declare class TimestampFirstEntity extends UuidGeneratorEntityBase<TimestampFirst> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: TimestampFirstEntity): TimestampFirstEntity;
    load(this: any, reqmatch?: TimestampFirstLoadMatch, ctrl?: Control): Promise<TimestampFirstEntity>;
    list(this: any, reqmatch?: TimestampFirstListMatch, ctrl?: Control): Promise<TimestampFirstEntity[]>;
}
export { TimestampFirstEntity };
