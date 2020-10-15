#!/usr/bin/env node

import Encryptor from './Encryptor.js';
import Decryptor from './Decryptor.js';
import fs from "fs";
import CryptoError from "./Errors/CryptoError.js";
import IncorrectTypeError from "./Errors/IncorrectTypeError.js";
import SourceFileNotExistsError from "./Errors/SourceFileNotExistsError.js";
import NotEnoughArgumentsError from "./Errors/NotEnoughArgumentsError.js";

async function main() {
    const [type, lang, sourcePath, outputPath, keyPath, method] = process.argv.slice(2);
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
                const encryptor = new Encryptor(123, method, lang);
                const encrypted = encryptor.encrypt(text);
                fs.writeFileSync(outputPath, encrypted);
                fs.writeFileSync(keyPath, encryptor.getGamma());
                process.exit();
                break;
            case "decrypt":
                if(!fs.existsSync(keyPath)) {
                    throw new SourceFileNotExistsError("Key file doesn't exist");
                }
                const key = fs.readFileSync(keyPath).toString();
                const decryptor = new Decryptor(key, lang);
                const decrypted = decryptor.decrypt(text);
                fs.writeFileSync(outputPath, decrypted);
                process.exit();
                break;
            default:
                throw new IncorrectTypeError("Please choose encrypt or decrypt type");
        }
    } catch (e) {
        console.log("Format:\ncrypto <type> <inputPath> <outputPath> <keyPath> [<method>]\n\ntype: encrypt or decrypt" +
            "\ninputPath -- absolute path to file with text to encrypt" +
            "\noutputPath -- absolute path to file where the result should be written" +
            "\nkeyPath -- path to the file from which to take or to which the gamma key should be written" +
            "\nmethod -- method of gamma-key creation: method1 or method2 (for encrypt type)\n\n");
        if(e instanceof CryptoError) {
            console.log(`${e.name}: ${e.message}`);
        } else {
            console.log("Uncaught error");
        }
        process.exit()
    }
}

main();