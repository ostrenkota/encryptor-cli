#!/usr/bin/env node

import Encryptor from './Encryptor.js';
import Decryptor from './Decryptor.js';
import fs from "fs";
import CryptoError from "./Errors/CryptoError.js";
import IncorrectTypeError from "./Errors/IncorrectTypeError.js";
import SourceFileNotExistsError from "./Errors/SourceFileNotExistsError.js";
import NotEnoughArgumentsError from "./Errors/NotEnoughArgumentsError.js";


const [type, lang, sourcePath, outputPath, keyPath, method, key] = process.argv.slice(2);
try {
    if (!type || !lang || !sourcePath || !outputPath || !keyPath) {
        throw new NotEnoughArgumentsError("Incorrect set of arguments passed");
    }
    if(!fs.existsSync(sourcePath)) {
        throw new SourceFileNotExistsError("Input file doesn't exist");
    }
    const text = fs.readFileSync(sourcePath).toString();
    switch (type) {
        case "encrypt":
            const encryptor = new Encryptor(method, lang, key, text);
            const encrypted = encryptor.encrypt(text);
            console.log(encrypted);
            fs.writeFileSync(outputPath, encrypted);
            fs.writeFileSync(keyPath, encryptor.getGamma());
            process.exit();
            break;
        case "decrypt":
            if(!fs.existsSync(keyPath)) {
                throw new SourceFileNotExistsError("Key file doesn't exist");
            }
            const gammaKey = fs.readFileSync(keyPath).toString();
            const decryptor = new Decryptor(gammaKey, lang);
            const decrypted = decryptor.decrypt(text);
            fs.writeFileSync(outputPath, decrypted);
            process.exit();
            break;
        default:
            throw new IncorrectTypeError("Please choose encrypt or decrypt type");
    }
} catch (e) {
    console.log("Format:\ncrypto <type> <language> <inputPath> <outputPath> <keyPath> [<method>] [<key>]\n\ntype: " +
        "encrypt or decrypt" +
        "\nlanguage -- language of text to encrypt: ru or en" +
        "\ninputPath -- absolute path to file with text to encrypt" +
        "\noutputPath -- absolute path to file where the result should be written" +
        "\nkeyPath -- path to the file from which to take or to which the gamma key should be written" +
        "\nmethod -- method of gamma-key creation: method1 or method2 or method3 (for encrypt type)" +
        "\nkey -- start number for gamma-key generation: between 99 and 99999 (for encrypt type)\n\n");
    if(e instanceof CryptoError) {
        console.log(`${e.name}: ${e.message}`);
    } else {
        console.log("Uncaught error");
    }
    process.exit()
}
