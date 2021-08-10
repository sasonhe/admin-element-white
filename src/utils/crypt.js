import CryptoJS from 'crypto-js'  //引用AES源码js
const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');   //十六位十六进制数作为密钥偏移量
import { JSEncrypt } from 'jsencrypt'//RSA加密
//解密方法
export function Decrypt(word) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
export function Encrypt(word) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
export function utf8_to_b64( str ) {
    return window.btoa(unescape(encodeURIComponent( str )));
}

export function b64_to_utf8( str ) {
    return decodeURIComponent(escape(window.atob( str )));
}
/*=====================================================RSA==========================================================*/
const pubKey = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDoCctgW6inUA45vDQjVd88YDGFrmt4KZ10+219no8bjaNxERBnkwIPshgzOegfIY2eay56T2J83gUk+OZNWZHHWoKrBWb9kU2j/LxC7TqNF2EHbSk/Z12W0I5/qDsqRw6sMzE4T1wXvGsY62lLq3XlhRrji3ae00tYOdxobpOa5wIDAQAB';
// RSA加密
export function EnRsa(data) {
  //new一个对象
  let encrypt = new JSEncrypt()
  //设置公钥
  encrypt.setPublicKey(pubKey)
  //password是要加密的数据,此处不用注意+号,因为rsa自己本身已经base64转码了,不存在+,全部是二进制数据
  let result = encrypt.encrypt(data)
  return result
}
// RSA解密 （未知私钥）
export function DeRsa(privateKey, data) {
 // 新建JSEncrypt对象
 let decrypt = new JSEncrypt()
 // 设置私钥
 decrypt.setPrivateKey(privateKey)
 // 解密数据
 let result = decrypt.decrypt(data)
 return result
}
