import IncorrectMethodError from "./Errors/IncorrectMethodError.js";
import IncorrectAlphabetError from "./Errors/IncorrectAlphabetError.js";

class Encryptor {
    #gamma;
    static defaultGenerationMethod = "method1";
    static cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    static latinAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    constructor(key, GammaEncryptionType, alphabet) {
        GammaEncryptionType = GammaEncryptionType || Encryptor.defaultGenerationMethod;
        if (!Encryptor.prototype.hasOwnProperty(GammaEncryptionType)
            || typeof this[GammaEncryptionType] !== "function") {
            throw new IncorrectMethodError("Incorrect gamma key creation method.");
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
        this[GammaEncryptionType](key);
    }

    method1(key) {
        this.#gamma = "";
        for (let i = 0; i < 200; i++) {
            let letterIndex = Math.round(Math.random() * (this.alphabet.length - 1));
            this.#gamma += this.alphabet[letterIndex];
        }
    }

    method2(key) {
        this.#gamma = "";
        for (let i = 0; i < 400; i++) {
            let letterIndex = Math.round(Math.random() * (this.alphabet.length - 1));
            this.#gamma += this.alphabet[letterIndex];
        }
    }

    encrypt(text) {
        text = text.replace(/[^a-zA-Zа-яА-Я]/g, "");
        let encryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        while (this.#gamma.length < text.length){
            this.#gamma += this.#gamma;
            if (this.#gamma.length > text.length) {
                this.#gamma = this.#gamma.substr(0, text.length)
            }
        }
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < this.alphabet.length; j++) {
                if (this.#gamma[i] === this.alphabet[j]) {
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