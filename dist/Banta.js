"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Client_1 = require("./Client");
var DataHelper_1 = require("./DataHelper");
var NDJSON_1 = require("./NDJSON");
var BantaDataTransform = require("./BantaDataTransform");
var InputInterface = require("./InputInterface");
var Banta = /** @class */ (function () {
    function Banta(options) {
        this.client = new Client_1.Client(options.client);
    }
    Object.defineProperty(Banta.prototype, "host", {
        get: function () {
            return this.client.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Banta.prototype, "user", {
        get: function () {
            return this.client.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Banta.prototype, "subuser", {
        get: function () {
            return this.client.subuser;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Banta.prototype, "homePath", {
        get: function () {
            return "/" + this.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Banta.prototype, "jobPath", {
        get: function () {
            return this.homePath + "/jobs";
        },
        enumerable: true,
        configurable: true
    });
    Banta.prototype.convertDoubleTildaToHomePath = function (path) {
        // Just "~~" = home folder
        if (path === "~~") {
            return this.homePath;
        }
        // References to home in a path
        if (path.substr(0, 3) === "~~/") {
            return this.homePath + "/" + path.substr(3);
        }
        // Otherwise just return the path as supplied
        return path;
    };
    Banta.prototype.convertJobIdToJobPath = function (id) {
        return this.jobPath + "/" + id;
    };
    /**
     * Lists the contents of a directory
     */
    Banta.prototype.listDirectory = function (path, options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, directoryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.convertDoubleTildaToHomePath(path);
                        return [4 /*yield*/, this.client.get(path, options)];
                    case 1:
                        result = _a.sent();
                        directoryData = NDJSON_1.NDJSON.parse(result.data);
                        // Transform the `mtime` property into a Date object
                        return [2 /*return*/, directoryData.map(function (item) {
                                return DataHelper_1.DataHelper.objectTransform(BantaDataTransform.ListDirectory, item);
                            })];
                }
            });
        });
    };
    /**
     * Deletes a directory
     */
    Banta.prototype.deleteDirectory = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.convertDoubleTildaToHomePath(path);
                        return [4 /*yield*/, this.client.delete(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Puts a directory
     */
    Banta.prototype.putDirectory = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.convertDoubleTildaToHomePath(path);
                        return [4 /*yield*/, this.client.put(path, undefined, {
                                "Content-Type": "application/json; type=directory",
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Retrieves an object from the service
     */
    Banta.prototype.getObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.convertDoubleTildaToHomePath(path);
                        return [4 /*yield*/, this.client.get(path)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.data];
                }
            });
        });
    };
    /**
     * Deletes an object from the service
     */
    Banta.prototype.deleteObject = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = this.convertDoubleTildaToHomePath(path);
                        return [4 /*yield*/, this.client.delete(path)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a SnapLink to an object
     */
    Banta.prototype.createSnapLink = function (targetObjectPath, newLinkPath) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        targetObjectPath = this.convertDoubleTildaToHomePath(targetObjectPath);
                        newLinkPath = this.convertDoubleTildaToHomePath(newLinkPath);
                        return [4 /*yield*/, this.client.put(newLinkPath, undefined, {
                                "Content-Type": "application/json; type=link",
                                "Location": targetObjectPath,
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Submits a new job to be executed
     */
    Banta.prototype.createJob = function (config) {
        return __awaiter(this, void 0, void 0, function () {
            var result, createdJobPath;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Exec strings and arrays are automatically converted into the correct
                        // job document
                        // Wrap one-liners into array form
                        if (typeof config === "string") {
                            config = [config];
                        }
                        // Map exec string array to minimal job config
                        if (InputInterface.isCreateJobShorthandStringArray(config)) {
                            config = {
                                phases: config.map(function (exec) { return ({ exec: exec }); }),
                            };
                        }
                        return [4 /*yield*/, this.client.post(this.jobPath, config, {
                                "Content-Type": "application/json; type=job",
                            })];
                    case 1:
                        result = _a.sent();
                        createdJobPath = result.headers["Location"];
                        return [2 /*return*/, createdJobPath];
                }
            });
        });
    };
    /**
     * Submits inputs to an already created job
     */
    Banta.prototype.addJobInput = function (path, input) {
        return __awaiter(this, void 0, void 0, function () {
            var body;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = path + "/live/in";
                        // Wrap input if just string
                        if (typeof input === "string") {
                            input = [input];
                        }
                        body = input.join("\n") + "\n";
                        return [4 /*yield*/, this.client.post(path, body, {
                                "Content-Type": "text/plain",
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This "closes" input for a job, and will finalise the job
     */
    Banta.prototype.endJobInput = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = path + "/live/in/end";
                        return [4 /*yield*/, this.client.post(path, undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * This cancels a job from doing any further work
     */
    Banta.prototype.cancelJob = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        path = path + "/live/cancel";
                        return [4 /*yield*/, this.client.post(path, undefined)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns the list of jobs you currently have
     */
    Banta.prototype.listJobs = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var result, directoryData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.client.get(this.jobPath, options)];
                    case 1:
                        result = _a.sent();
                        directoryData = NDJSON_1.NDJSON.parse(result.data);
                        // Transform the `mtime` property into a Date object
                        return [2 /*return*/, directoryData.map(function (item) {
                                return DataHelper_1.DataHelper.objectTransform(BantaDataTransform.ListDirectory, item);
                            })];
                }
            });
        });
    };
    /**
     * Gets the high-level job container object
     */
    Banta.prototype.getJob = function (path, getArchivedInfo) {
        if (getArchivedInfo === void 0) { getArchivedInfo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, e_1, jobData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get(path + "/live/status")];
                    case 1:
                        data = (_a.sent()).data;
                        return [3 /*break*/, 6];
                    case 2:
                        e_1 = _a.sent();
                        if (!(getArchivedInfo &&
                            e_1 && e_1.response && e_1.response.status === 404)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchivedJobRaw(path)];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw e_1;
                    case 5: return [3 /*break*/, 6];
                    case 6:
                        jobData = NDJSON_1.NDJSON.parse(data);
                        // Transform as required
                        return [2 /*return*/, jobData.map(function (data) {
                                return DataHelper_1.DataHelper.objectTransform(BantaDataTransform.GetJob, data);
                            })];
                }
            });
        });
    };
    /**
     * Returns the current "live" set of outputs from a job
     */
    Banta.prototype.getJobOutput = function (path, getArchivedInfo) {
        if (getArchivedInfo === void 0) { getArchivedInfo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get(path + "/live/out")];
                    case 1:
                        data = (_a.sent()).data;
                        return [3 /*break*/, 6];
                    case 2:
                        e_2 = _a.sent();
                        if (!(getArchivedInfo &&
                            e_2 && e_2.response && e_2.response.status === 404)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchivedJobOutputRaw(path)];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw e_2;
                    case 5: return [3 /*break*/, 6];
                    case 6: 
                    // Split output paths by delimiter
                    return [2 /*return*/, data
                            .split("\n")
                            .filter(function (x) { return x.length !== 0; })];
                }
            });
        });
    };
    /**
     * Returns the current "live" set of inputs to a job
     */
    Banta.prototype.getJobInput = function (path, getArchivedInfo) {
        if (getArchivedInfo === void 0) { getArchivedInfo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get(path + "/live/in")];
                    case 1:
                        data = (_a.sent()).data;
                        return [3 /*break*/, 6];
                    case 2:
                        e_3 = _a.sent();
                        if (!(getArchivedInfo &&
                            e_3 && e_3.response && e_3.response.status === 404)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchivedJobInputRaw(path)];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw e_3;
                    case 5: return [3 /*break*/, 6];
                    case 6: 
                    // Split output paths by delimiter
                    return [2 /*return*/, data
                            .split("\n")
                            .filter(function (x) { return x.length !== 0; })];
                }
            });
        });
    };
    /**
     * Returns the current "live" set of failures from a job
     */
    Banta.prototype.getJobFailures = function (path, getArchivedInfo) {
        if (getArchivedInfo === void 0) { getArchivedInfo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get(path + "/live/fail")];
                    case 1:
                        data = (_a.sent()).data;
                        return [3 /*break*/, 6];
                    case 2:
                        e_4 = _a.sent();
                        if (!(getArchivedInfo &&
                            e_4 && e_4.response && e_4.response.status === 404)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchivedJobFailuresRaw(path)];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw e_4;
                    case 5: return [3 /*break*/, 6];
                    case 6: 
                    // Split output paths by delimiter
                    return [2 /*return*/, data
                            .split("\n")
                            .filter(function (x) { return x.length !== 0; })];
                }
            });
        });
    };
    /**
     * Returns the current "live" set of errors from a job
     */
    Banta.prototype.getJobErrors = function (path, getArchivedInfo) {
        if (getArchivedInfo === void 0) { getArchivedInfo = true; }
        return __awaiter(this, void 0, void 0, function () {
            var data, e_5, jobErrorData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 6]);
                        return [4 /*yield*/, this.client.get(path + "/live/err")];
                    case 1:
                        data = (_a.sent()).data;
                        return [3 /*break*/, 6];
                    case 2:
                        e_5 = _a.sent();
                        if (!(getArchivedInfo &&
                            e_5 && e_5.response && e_5.response.status === 404)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getArchivedJobRaw(path)];
                    case 3:
                        data = _a.sent();
                        return [3 /*break*/, 5];
                    case 4: throw e_5;
                    case 5: return [3 /*break*/, 6];
                    case 6:
                        jobErrorData = NDJSON_1.NDJSON.parse(data);
                        return [2 /*return*/, jobErrorData];
                }
            });
        });
    };
    Banta.prototype.getArchivedJobRaw = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getObject(path + "/job.json")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Banta.prototype.getArchivedJobOutputRaw = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getObject(path + "/out.txt")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Banta.prototype.getArchivedJobInputRaw = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getObject(path + "/in.txt")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Banta.prototype.getArchivedJobFailuresRaw = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getObject(path + "/fail.txt")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Banta.prototype.getArchivedJobErrorsRaw = function (path) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getObject(path + "/err.txt")];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Banta;
}());
exports.Banta = Banta;
