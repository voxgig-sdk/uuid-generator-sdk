import { UuidGeneratorEntityBase } from '../UuidGeneratorEntityBase';
import type { UuidGeneratorSDK } from '../UuidGeneratorSDK';
import type { Control } from '../types';
import type { Decode, DecodeLoadMatch } from '../UuidGeneratorTypes';
declare class DecodeEntity extends UuidGeneratorEntityBase<Decode> {
    constructor(client: UuidGeneratorSDK, entopts: any);
    make(this: DecodeEntity): DecodeEntity;
    load(this: any, reqmatch?: DecodeLoadMatch, ctrl?: Control): Promise<DecodeEntity>;
}
export { DecodeEntity };
