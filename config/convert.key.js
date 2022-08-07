const fs = require('fs');
const path = require('path');

/**
 * read private key
 */
const privateKey = fs.readFileSync(path.join('config', 'private.key'));
const publicKey = fs.readFileSync(path.join('config', 'public.key'));

/**
 * transfer Base64 formate
 */
const privateKeyBase64 = Buffer.from(privateKey).toString('base64');
const publicKeyBase64 = Buffer.from(publicKey).toString('base64');

/**
 *  get transform result
 */
console.log('\nPrivate Key:');
console.log(privateKeyBase64);

console.log('\nPublic Key:');
console.log(publicKeyBase64);
