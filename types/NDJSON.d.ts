export declare namespace NDJSON {
    function splitAtLineDelimiter(str: string): string[];
    function parseSingleLine<T extends {
        [key: string]: any;
    }>(str: string): T;
    function parse<T extends {
        [key: string]: any;
    }>(str: string | object): T[];
}
