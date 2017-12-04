"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NDJSON;
(function (NDJSON) {
    function splitAtLineDelimiter(str) {
        var lines = str.split("\n");
        // Clean up lines and remove those which are blank
        return lines.map(function (line) { return line.trim(); }).filter(function (line) { return line.length !== 0; });
    }
    NDJSON.splitAtLineDelimiter = splitAtLineDelimiter;
    function parseSingleLine(str) {
        return JSON.parse(str);
    }
    NDJSON.parseSingleLine = parseSingleLine;
    function parse(str) {
        // Check if object; do not parse if already object
        if (typeof str === "object") {
            return [str];
        }
        return splitAtLineDelimiter(str).map(parseSingleLine);
    }
    NDJSON.parse = parse;
})(NDJSON = exports.NDJSON || (exports.NDJSON = {}));
