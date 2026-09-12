import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { Version1, Version1LoadMatch, Version1ListMatch } from '../UuidGeneratorTypes';
declare class Version1Entity extends UuidGeneratorEntityBase<Version1> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: Version1Entity): Version1Entity;
    load(this: any, reqmatch?: Version1LoadMatch, ctrl?: Control): Promise<Version1Entity>;
    list(this: any, reqmatch?: Version1ListMatch, ctrl?: Control): Promise<Version1Entity[]>;
}
export { Version1Entity };
