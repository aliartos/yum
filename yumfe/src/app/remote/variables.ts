import { OpaqueToken } from '@angular/core';

export const BASE_PATH = new OpaqueToken('basePath');
export const WS_BASE_PATH = new OpaqueToken('wsbasePath');
export const COLLECTION_FORMATS = {
    'csv': ',',
    'tsv': '   ',
    'ssv': ' ',
    'pipes': '|'
}