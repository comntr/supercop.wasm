// Generated by LiveScript 1.5.0
/**
 * @package   supercop.wasm
 * @author    Nazar Mokrynskyi <nazar@mokrynskyi.com>
 * @copyright Copyright (c) 2017, Nazar Mokrynskyi
 * @copyright Copyright (c) 2016-2017, https://github.com/1p6
 * @license   MIT License, see license.txt
 */
(function(){
  var supercop, randombytes, x$;
  supercop = require('./supercop')();
  randombytes = require('randombytes');
  x$ = exports;
  x$.createSeed = function(){
    return randombytes(32);
  };
  x$.createKeyPair = function(seed){
    var seedPtr, seedBuf, pubKeyPtr, publicKey, privKeyPtr, privateKey, x$;
    if (!Buffer.isBuffer(seed)) {
      throw new Error('not buffers!');
    }
    seedPtr = supercop._malloc(32);
    seedBuf = new Uint8Array(supercop.HEAPU8.buffer, seedPtr, 32);
    pubKeyPtr = supercop._malloc(32);
    publicKey = new Uint8Array(supercop.HEAPU8.buffer, pubKeyPtr, 32);
    privKeyPtr = supercop._malloc(64);
    privateKey = new Uint8Array(supercop.HEAPU8.buffer, privKeyPtr, 64);
    seedBuf.set(seed);
    x$ = supercop;
    x$._create_keypair(pubKeyPtr, privKeyPtr, seedPtr);
    x$._free(seedPtr);
    x$._free(pubKeyPtr);
    x$._free(privKeyPtr);
    return {
      publicKey: Buffer.from(publicKey),
      secretKey: Buffer.from(privateKey)
    };
  };
  x$.sign = function(message, publicKey, privateKey){
    var msgArrPtr, msgArr, pubKeyArrPtr, pubKeyArr, privKeyArrPtr, privKeyArr, sigPtr, sig, x$;
    if (!Buffer.isBuffer(message) || !Buffer.isBuffer(publicKey) || !Buffer.isBuffer(privateKey)) {
      throw new Error('not buffers!');
    }
    msgArrPtr = supercop._malloc(message.length);
    msgArr = new Uint8Array(supercop.HEAPU8.buffer, msgArrPtr, message.length);
    pubKeyArrPtr = supercop._malloc(32);
    pubKeyArr = new Uint8Array(supercop.HEAPU8.buffer, pubKeyArrPtr, 32);
    privKeyArrPtr = supercop._malloc(64);
    privKeyArr = new Uint8Array(supercop.HEAPU8.buffer, privKeyArrPtr, 64);
    sigPtr = supercop._malloc(64);
    sig = new Uint8Array(supercop.HEAPU8.buffer, sigPtr, 64);
    msgArr.set(message);
    pubKeyArr.set(publicKey);
    privKeyArr.set(privateKey);
    x$ = supercop;
    x$._sign(sigPtr, msgArrPtr, message.length, pubKeyArrPtr, privKeyArrPtr);
    x$._free(msgArrPtr);
    x$._free(pubKeyArrPtr);
    x$._free(privKeyArrPtr);
    x$._free(sigPtr);
    return Buffer.from(sig);
  };
  x$.verify = function(sig, message, publicKey){
    var msgArrPtr, msgArr, sigArrPtr, sigArr, pubKeyArrPtr, pubKeyArr, result, x$;
    if (!Buffer.isBuffer(message) || !Buffer.isBuffer(sig) || !Buffer.isBuffer(publicKey)) {
      throw new Error('not buffers!');
    }
    msgArrPtr = supercop._malloc(message.length);
    msgArr = new Uint8Array(supercop.HEAPU8.buffer, msgArrPtr, message.length);
    sigArrPtr = supercop._malloc(64);
    sigArr = new Uint8Array(supercop.HEAPU8.buffer, sigArrPtr, 64);
    pubKeyArrPtr = supercop._malloc(32);
    pubKeyArr = new Uint8Array(supercop.HEAPU8.buffer, pubKeyArrPtr, 32);
    msgArr.set(message);
    sigArr.set(sig);
    pubKeyArr.set(publicKey);
    result = supercop._verify(sigArrPtr, msgArrPtr, message.length, pubKeyArrPtr) === 1;
    x$ = supercop;
    x$._free(msgArrPtr);
    x$._free(sigArrPtr);
    x$._free(pubKeyArrPtr);
    return result;
  };
}).call(this);
