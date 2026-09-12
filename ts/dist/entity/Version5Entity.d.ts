import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { Version5, Version5LoadMatch } from '../UuidGeneratorTypes';
declare class Version5Entity extends UuidGeneratorEntityBase<Version5> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: Version5Entity): Version5Entity;
    load(this: any, reqmatch?: Version5LoadMatch, ctrl?: Control): Promise<Version5Entity>;
}
export { Version5Entity };
