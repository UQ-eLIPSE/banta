export namespace NDJSON {
    export function splitAtLineDelimiter(str: string) {
        const lines = str.split("\n");

        // Clean up lines and remove those which are blank
        return lines.map(line => line.trim()).filter(line => line.length !== 0);
    }

    export function parseSingleLine<T extends { [key: string]: any }>(str: string) {
        return JSON.parse(str) as T;
    }

    export function parse<T extends { [key: string]: any }>(str: string) {
        return splitAtLineDelimiter(str).map<T>(parseSingleLine);
    }
}
