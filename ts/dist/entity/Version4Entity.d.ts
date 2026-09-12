import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { Version4, Version4LoadMatch, Version4ListMatch } from '../UuidGeneratorTypes';
declare class Version4Entity extends UuidGeneratorEntityBase<Version4> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: Version4Entity): Version4Entity;
    load(this: any, reqmatch?: Version4LoadMatch, ctrl?: Control): Promise<Version4Entity>;
    list(this: any, reqmatch?: Version4ListMatch, ctrl?: Control): Promise<Version4Entity[]>;
}
export { Version4Entity };
