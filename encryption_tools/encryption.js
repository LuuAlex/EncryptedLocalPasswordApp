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
    var hashed = Encryption.hash(password, salt)
    return hashed[2] == hash;
  }

  static hash(password, salt) {
    if (!salt) {
      salt = Encryption.makeSalt(64);
    }
    var key = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 1394,
    }).toString(CryptoJS.enc.Base64);
    var key1 = CryptoJS.PBKDF2(key, salt, {
      keySize: 256 / 32,
      iterations: 179,
    }).toString(CryptoJS.enc.Base64);
    var key2 = CryptoJS.PBKDF2(key, salt+salt, {
      keySize: 512 / 32,
      iterations: 267,
    }).toString(CryptoJS.enc.Base64);
    return [key1, salt, key2];
  }

  static encrypt(message, hashed) {
    return CryptoJS.AES.encrypt(message, hashed[0]).toString();
  }

  static decrypt(message, hashed) {
    return CryptoJS.AES.decrypt(message, hashed[0]).toString(CryptoJS.enc.Utf8);
  }
}
