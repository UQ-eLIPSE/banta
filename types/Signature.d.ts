export declare namespace Signature {
    type MantaSupportedAlgorithm = "rsa-sha1" | "rsa-sha256" | "dsa-sha";
    function createKeyId(user: string, subuser: string | undefined, sshKeyFingerprint: string): string;
    function getCurrentTimestamp(): number;
    function convertTimestampToHttpDateHeaderValue(timestamp: number): string;
    function createDateHeaderString(timestamp?: number): string;
    function prefixDateHeaderStringWithDateHeaderKey(dateHeaderString: string): string;
    function createAuthorizationHeaderString(keyId: string, algorithm: MantaSupportedAlgorithm, signature: string): string;
    function generateSignature(algorithm: MantaSupportedAlgorithm, key: string, stringToSign: string): string;
    function signSha256(key: string, str: string): string;
}
