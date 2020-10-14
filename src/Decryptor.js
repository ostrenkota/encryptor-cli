import IncorrectAlphabetError from "./Errors/IncorrectAlphabetError.js";

class Decryptor {
    #gamma;
    static cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
    static latinAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    constructor(gammaKey, alphabet) {
        this.#gamma = gammaKey;
        switch (alphabet) {
            case "ru":
                this.alphabet = Decryptor.cyrillicAlphabet;
                break;
            case "en":
                this.alphabet = Decryptor.latinAlphabet;
                break;
            default:
                throw new IncorrectAlphabetError("Incorrect alphabet name. Type 'en' or 'ru'");
        }
    }

    decrypt(text) {
        text = text.replace(/[^a-zA-Zа-яА-Я]/g, "");
        let decryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        while (this.#gamma.length < text.length){
            this.#gamma += this.#gamma;
            if (this.#gamma.length > text.length) {
                this.#gamma = this.#gamma.substr(0, text.length)
            }
        }
        for (let i = 0; i < text.length; i++)
        {
            for (let j = 0; j < this.alphabet.length; j++)
            {
                if (this.#gamma[i] === this.alphabet[j]) {
                    textLetterNumber = j;
                }
                if (text[i] === this.alphabet[j]) {
                    gammaLetterNumber = j;
                }
                resultLetterNumber = (this.alphabet.indexOf(text[i]) - this.alphabet.indexOf(this.#gamma[i]) +
                    this.alphabet.length) % this.alphabet.length;
            }
            decryptionResult += this.alphabet[resultLetterNumber];
        }
        return decryptionResult;
    }
}


export default Decryptor;