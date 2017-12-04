"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
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
var Signature_1 = require("./Signature");
var axios_1 = require("axios");
var Client = /** @class */ (function () {
    function Client(options) {
        this.options = options;
    }
    Object.defineProperty(Client.prototype, "host", {
        get: function () {
            return this.options.host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "user", {
        get: function () {
            return this.options.user;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Client.prototype, "subuser", {
        get: function () {
            return this.options.subuser;
        },
        enumerable: true,
        configurable: true
    });
    Client.prototype.constructFullUrl = function (path) {
        return "" + this.options.host + path;
    };
    Client.prototype.createHeadersObject = function () {
        var user = this.options.user;
        var subuser = this.options.subuser;
        var key = this.options.signing.key;
        var fingerprint = this.options.signing.keyFingerprint;
        var algorithm = "rsa-sha256";
        // Signing strings
        var dateHeaderValue = Signature_1.Signature.createDateHeaderString();
        var keyId = Signature_1.Signature.createKeyId(user, subuser, fingerprint);
        var stringToSign = Signature_1.Signature.prefixDateHeaderStringWithDateHeaderKey(dateHeaderValue);
        // Generating signature and auth header
        var signature = Signature_1.Signature.generateSignature(algorithm, key, stringToSign);
        var authHeaderValue = Signature_1.Signature.createAuthorizationHeaderString(keyId, algorithm, signature);
        return {
            // We need both the "date" and "Authorization" headers at a minimum
            // in all requests
            "date": dateHeaderValue,
            "Authorization": authHeaderValue,
        };
    };
    Client.prototype.get = function (path, params, headers) {
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = __assign({}, headers, this.createHeadersObject());
                        return [4 /*yield*/, axios_1.default.get(this.constructFullUrl(path), {
                                headers: headers,
                                params: params,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.post = function (path, data, headers) {
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = __assign({}, headers, this.createHeadersObject());
                        return [4 /*yield*/, axios_1.default.post(this.constructFullUrl(path), data, {
                                headers: headers,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.delete = function (path, headers) {
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = __assign({}, headers, this.createHeadersObject());
                        return [4 /*yield*/, axios_1.default.delete(this.constructFullUrl(path), {
                                headers: headers,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Client.prototype.put = function (path, data, headers) {
        if (headers === void 0) { headers = {}; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        headers = __assign({}, headers, this.createHeadersObject());
                        return [4 /*yield*/, axios_1.default.put(this.constructFullUrl(path), data, {
                                headers: headers,
                            })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return Client;
}());
exports.Client = Client;
