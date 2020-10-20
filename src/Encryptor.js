import IncorrectMethodError from "./Errors/IncorrectMethodError.js";
import IncorrectAlphabetError from "./Errors/IncorrectAlphabetError.js";

class Encryptor {
    #gamma;
    static defaultGenerationMethod = "method1";
    static cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    static latinAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    constructor(GammaEncryptionType, alphabet) {
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
        this[GammaEncryptionType]();
    }

    method1() {
        let today = new Date();
        let seconds = String(today.getTime());
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        let yyyy = today.getFullYear();
        let key = mm + dd + yyyy + seconds;
        this.generateGammaFromKey(key)
    }

    method2() {
        let today = new Date();
        let hour = today.getHours();
        let min = String(today.getMinutes());
        let sec = String(today.getSeconds());
        let millisec = String(today.getMilliseconds());
        let key = min + sec + millisec + hour;
        this.generateGammaFromKey(key)
    }

    method3() {
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let min = String(today.getMinutes());
        let seconds = String(today.getTime());
        let millisec = String(today.getMilliseconds());
        let key = seconds + min + dd + millisec;
        this.generateGammaFromKey(key)
    }

    generateGammaFromKey(key){
        this.#gamma = "";
        for (let i = 0; i < 5; i++) {
            key += key.shuffle();
        }
        key = key.match(/(..?)/g);
        key.forEach(( elem, index) => {
            key[index] = elem % this.alphabet.length;
            this.#gamma += this.alphabet[key[index]];
        })
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