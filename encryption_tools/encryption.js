var CryptoJS = require('crypto-js');

export default class Encryption {
  constructor() {}

  static makeSalt(length) {
    let rv = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const totalLength = characters.length;
    for (let i = 0; i < length; i+=1) {
      rv += characters.charAt(Math.floor(Math.random() * totalLength));
    }
    return rv;
  }

  static passCheck(password, salt, hash) {
    return CryptoJS.SHA3(`${salt}${password}`).toString(CryptoJS.enc.Base64) == hash;
  }

  static hash(password, salt) {
    if (!salt) {
      salt = Encryption.makeSalt(64);
    }
    var key = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 1394,
    });
    var hash = CryptoJS.SHA3(`${salt}${password}`).toString(CryptoJS.enc.Base64)
    return [key.toString(CryptoJS.enc.Base64), salt, hash];
  }

  static encrypt(message, hashed) {
    return CryptoJS.AES.encrypt(message, hashed[0]).toString();
  }

  static decrypt(message, hashed) {
    return CryptoJS.AES.decrypt(message, hashed[0]).toString(CryptoJS.enc.Utf8);
  }
}
