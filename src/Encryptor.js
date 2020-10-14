import IncorrectMethodError from "./Errors/IncorrectMethodError.js";

class Encryptor {
    #gamma;
    static defaultGenerationMethod = "method1";
    static alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    constructor(key, GammaEncryptionType) {
        GammaEncryptionType = GammaEncryptionType || Encryptor.defaultGenerationMethod;
        if (!Encryptor.prototype.hasOwnProperty(GammaEncryptionType)
            || typeof this[GammaEncryptionType] !== "function") {
            throw new IncorrectMethodError("Incorrect gamma key creation method.");
        }
        this[GammaEncryptionType](key);
    }

    method1(key) {
        this.#gamma = "";
        for (let i = 0; i < 200; i++) {
            let letterIndex = Math.round(Math.random() * 32);
            this.#gamma += Encryptor.alphabet[letterIndex];
        }
    }

    method2(key) {
        this.#gamma = "";
        for (let i = 0; i < 400; i++) {
            let letterIndex = Math.round(Math.random() * 32);
            this.#gamma += Encryptor.alphabet[letterIndex];
        }
    }

    encrypt(text) {
        let encryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        while (this.#gamma.length < text.length){
            this.#gamma += this.#gamma;
            if (this.#gamma.length > text.length) {
                this.#gamma = this.#gamma.substr(0, text.length)
            }
        }
        for (let i = 0; i < text.length; i++) {
            for (let j = 0; j < Encryptor.alphabet.length; j++) {
                if (this.#gamma[i] === Encryptor.alphabet[j]) {
                    gammaLetterNumber = j;
                }
                if (text[i] === Encryptor.alphabet[j]) {
                    textLetterNumber = j;
                }
                resultLetterNumber = (textLetterNumber + gammaLetterNumber) % Encryptor.alphabet.length;
            }
            encryptionResult += Encryptor.alphabet[resultLetterNumber];
        }
        return encryptionResult;
    }

    getGamma() {
        return this.#gamma;
    }
}

export default Encryptor;