"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListDirectory = {
    mtime: function (x) { return new Date(x); },
};
exports.GetJob = {
    timeCreated: function (x) { return new Date(x); },
    timeDone: function (x) { return new Date(x); },
    timeArchiveStarted: function (x) { return new Date(x); },
    timeArchiveDone: function (x) { return new Date(x); },
};
