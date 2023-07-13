var CryptoJS = require('crypto-js');

export default class Encryption {
  constructor() {}

  static hash(password, salt) {
    if (!salt) {
      salt = CryptoJS.lib.WordArray.random(128 / 8);
    }
    var key = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 1000,
    });
    return [key, salt];
  }

  static encrypt(message, hashed) {
    return CryptoJS.AES.encrypt(message, hashed[0]).toString();
  }

  static decrypt(message, hashed) {
    return CryptoJS.AES.decrpy(message, hashed[0].toString(CryptoJS.enc.Utf8));
  }
}
