import IncorrectMethodError from "./Errors/IncorrectMethodError.js";
import IncorrectAlphabetError from "./Errors/IncorrectAlphabetError.js";
import IncorrectKeyError from "./Errors/IncorrectKeyError.js";

class Encryptor {
    #gamma;
    static defaultGenerationMethod = "method1";
    static cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.,/()[]{}?!:\'\"\n\r ";
    static latinAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,/()[]{}?!:\'\"\n\r ";
    constructor(GammaEncryptionType, alphabet, key, text) {
        GammaEncryptionType = GammaEncryptionType || Encryptor.defaultGenerationMethod;
        key = key || 1000;
        if (!Encryptor.prototype.hasOwnProperty(GammaEncryptionType)
            || typeof this[GammaEncryptionType] !== "function") {
            throw new IncorrectMethodError("Incorrect gamma key creation method.");
        }
        if (key > 99999 || key < 99) {
            throw new IncorrectKeyError("Incorrect key given. The key must be between 99 and 99999");
        }
        switch (alphabet) {
            case "ru":
                this.alphabet = Encryptor.cyrillicAlphabet;
                break;
            case "en":
                this.alphabet = Encryptor.latinAlphabet;
                break;
            default:
                throw new IncorrectAlphabetError("Incorrect alphabet name. Type 'en' or 'ru'");
        }
        this[GammaEncryptionType](key, text.length);
    }

    method1(key, textLen) {
        let gammaKey = "";
        const a = 45;
        const c = 21;
        const m = 1630;
        const rand = () => key = (a * key + c) % m;
        while (gammaKey.length < textLen * 2) {
            gammaKey += String(rand());
        }
        this.generateGammaFromKey(gammaKey);
    }

    method2(key, textLen) {
        let gammaKey = "";
        const a = 72;
        const m = 3831;
        const rand = () => key = (a * key) % m;
        while (gammaKey.length < textLen * 2) {
            gammaKey += String(rand());
        }
        this.generateGammaFromKey(gammaKey);
    }

    method3(key, textLen) {
        let gammaKey = "";
        const a = 108;
        const b = 88;
        const m = 6172;
        const rand = () => key = (key * a - b) % m;
        while (gammaKey.length < textLen * 2) {
            gammaKey += String(rand());
        }
        this.generateGammaFromKey(gammaKey);
    }

    generateGammaFromKey(gammaKey){
        this.#gamma = "";
        gammaKey = gammaKey.match(/(..?)/g);
        gammaKey.forEach((elem, index) => {
            gammaKey[index] = elem % this.alphabet.length;
            this.#gamma += this.alphabet[gammaKey[index]];
        })
    }

    encrypt(text) {
        let encryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        let gamma = this.#gamma;
        if (gamma.length > text.length) {
            gamma = gamma.substr(0, text.length)
        }
        for (let i = 0; i < text.length; i++) {
            if (!this.alphabet.includes(text[i])) {
                encryptionResult += text[i];
                continue;
            }
            for (let j = 0; j < this.alphabet.length; j++) {
                if (gamma[i] === this.alphabet[j]) {
                    gammaLetterNumber = j;
                }
                if (text[i] === this.alphabet[j]) {
                    textLetterNumber = j;
                }
                resultLetterNumber = (textLetterNumber + gammaLetterNumber) % this.alphabet.length;
            }
            encryptionResult += this.alphabet[resultLetterNumber];
        }
        return encryptionResult;
    }

    getGamma() {
        return this.#gamma;
    }
}

export default Encryptor;