export const publicKey = "dfwoidyo*)(&hhfkwoh";
export const salt = "7042174902ru021rfh91h0d81r01208h80hh08hibß";

// Simplified encryption function that concatenates publicKey + text + salt
export function encryptRSAWithSalt(text) {
    return publicKey + text + salt;
}

// Simplified decryption function that removes publicKey and salt
export function decryptRSAWithSalt(encryptedText) {
    // Remove publicKey from the beginning and salt from the end
    let decrypted = encryptedText.substring(publicKey.length);  // Remove publicKey
    decrypted = decrypted.substring(0, decrypted.length - salt.length);  // Remove salt
    return decrypted;
}