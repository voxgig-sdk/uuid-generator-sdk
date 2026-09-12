import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { Version3, Version3LoadMatch } from '../UuidGeneratorTypes';
declare class Version3Entity extends UuidGeneratorEntityBase<Version3> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: Version3Entity): Version3Entity;
    load(this: any, reqmatch?: Version3LoadMatch, ctrl?: Control): Promise<Version3Entity>;
}
export { Version3Entity };
