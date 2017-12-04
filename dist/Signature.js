"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var crypto = require("crypto");
var Signature;
(function (Signature) {
    // For more information about the signing process, refer to:
    // https://tools.ietf.org/html/draft-cavage-http-signatures-00#section-2.1.2
    function createKeyId(user, subuser, sshKeyFingerprint) {
        var userPath = "/" + user;
        if (subuser !== undefined) {
            userPath += "/" + subuser;
        }
        return userPath + "/keys/" + sshKeyFingerprint;
    }
    Signature.createKeyId = createKeyId;
    function getCurrentTimestamp() {
        return Date.now();
    }
    Signature.getCurrentTimestamp = getCurrentTimestamp;
    function convertTimestampToHttpDateHeaderValue(timestamp) {
        return new Date(timestamp).toUTCString();
    }
    Signature.convertTimestampToHttpDateHeaderValue = convertTimestampToHttpDateHeaderValue;
    function createDateHeaderString(timestamp) {
        if (timestamp === void 0) { timestamp = getCurrentTimestamp(); }
        var dateHeaderValue = convertTimestampToHttpDateHeaderValue(timestamp);
        return dateHeaderValue;
    }
    Signature.createDateHeaderString = createDateHeaderString;
    function prefixDateHeaderStringWithDateHeaderKey(dateHeaderString) {
        return "date: " + dateHeaderString;
    }
    Signature.prefixDateHeaderStringWithDateHeaderKey = prefixDateHeaderStringWithDateHeaderKey;
    function createAuthorizationHeaderString(keyId, algorithm, signature) {
        return "Signature keyId=\"" + keyId + "\",algorithm=\"" + algorithm + "\",signature=\"" + signature + "\"";
    }
    Signature.createAuthorizationHeaderString = createAuthorizationHeaderString;
    function generateSignature(algorithm, key, stringToSign) {
        switch (algorithm) {
            case "rsa-sha256": return signSha256(key, stringToSign);
            case "rsa-sha1":
            case "dsa-sha":
                throw new Error("Not supported");
            default:
                throw new Error("Supplied algorithm is not valid or supported");
        }
    }
    Signature.generateSignature = generateSignature;
    function signSha256(key, str) {
        // NOTE: Because Node relies on OpenSSL, if "sha256" is not available
        // this will fail
        var signer = crypto.createSign("sha256");
        // Load string into signer
        signer.update(str);
        // Sign with given key, return as base64
        return signer.sign(key, "base64");
    }
    Signature.signSha256 = signSha256;
})(Signature = exports.Signature || (exports.Signature = {}));
