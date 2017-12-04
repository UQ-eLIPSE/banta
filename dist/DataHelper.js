"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataHelper;
(function (DataHelper) {
    function objectTransform(transform, data, ignoreUndefinedSourceValues) {
        if (ignoreUndefinedSourceValues === void 0) { ignoreUndefinedSourceValues = true; }
        var keys = Object.keys(transform);
        // Set up object to merge over data object
        var mergeObject = {};
        // For each transformation, save the result into the merge object
        keys.forEach(function (key) {
            var sourceValue = data[key];
            // Ignore `undefined` if `ignoreUndefinedSourceValues` is specified
            if (ignoreUndefinedSourceValues && sourceValue === undefined) {
                return;
            }
            // Set transformed value into merge object
            mergeObject[key] = transform[key](sourceValue);
        });
        // Return new shallow copied and merged object
        return __assign({}, data, mergeObject);
    }
    DataHelper.objectTransform = objectTransform;
})(DataHelper = exports.DataHelper || (exports.DataHelper = {}));
