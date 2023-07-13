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

  static hash(password, salt) {
    if (!salt) {
      salt = Encryption.makeSalt(32);
    }
    var key = CryptoJS.PBKDF2(password, salt, {
      keySize: 512 / 32,
      iterations: 1000,
    });
    return [key.toString(CryptoJS.enc.Base64), salt];
  }

  static encrypt(message, hashed) {
    console.log(`encrypt: ${CryptoJS.AES.encrypt(message, hashed[0])}`)
    console.log(CryptoJS.AES.encrypt(message, hashed[0]))
    return CryptoJS.AES.encrypt(message, hashed[0]);
  }

  static decrypt(message, hashed) {
    console.log(`dencrypt: ${CryptoJS.AES.decrypt(message, hashed[0])}`)
    return CryptoJS.AES.decrypt(message, hashed[0]);
  }
}
