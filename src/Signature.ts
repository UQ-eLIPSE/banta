import * as crypto from "crypto";

export namespace Signature {
    // For more information about the signing process, refer to:
    // https://tools.ietf.org/html/draft-cavage-http-signatures-00#section-2.1.2

    export type MantaSupportedAlgorithm =
        "rsa-sha1" |
        "rsa-sha256" |
        "dsa-sha";

    export function createKeyId(user: string, subuser: string | undefined, sshKeyFingerprint: string) {
        let userPath = `/${user}`;

        if (subuser !== undefined) {
            userPath += `/${subuser}`;
        }

        return `${userPath}/keys/${sshKeyFingerprint}`;
    }

    export function getCurrentTimestamp() {
        return Date.now();
    }

    export function convertTimestampToHttpDateHeaderValue(timestamp: number) {
        return new Date(timestamp).toUTCString();
    }

    export function createDateHeaderString(timestamp: number = getCurrentTimestamp()) {
        const dateHeaderValue = convertTimestampToHttpDateHeaderValue(timestamp);

        return dateHeaderValue;
    }

    export function prefixDateHeaderStringWithDateHeaderKey(dateHeaderString: string) {
        return `date: ${dateHeaderString}`;
    }

    export function createAuthorizationHeaderString(keyId: string, algorithm: MantaSupportedAlgorithm, signature: string) {
        return `Signature keyId="${keyId}",algorithm="${algorithm}",signature="${signature}"`;
    }

    export function generateSignature(algorithm: MantaSupportedAlgorithm, key: string, stringToSign: string) {
        switch (algorithm) {
            case "rsa-sha256": return signSha256(key, stringToSign);

            case "rsa-sha1":
            case "dsa-sha":
                throw new Error("Not supported");

            default:
                throw new Error("Supplied algorithm is not valid or supported");
        }
    }

    export function signSha256(key: string, str: string) {
        // NOTE: Because Node relies on OpenSSL, if "sha256" is not available
        // this will fail
        const signer = crypto.createSign("sha256");

        // Load string into signer
        signer.update(str);

        // Sign with given key, return as base64
        return signer.sign(key, "base64");
    }
}
