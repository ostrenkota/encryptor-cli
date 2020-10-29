import IncorrectAlphabetError from "./Errors/IncorrectAlphabetError.js";

class Decryptor {
    #gamma;
    static cyrillicAlphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюяАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ.,/()[]{}?!:\'\"\n\r ";
    static latinAlphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ.,/()[]{}?!:\'\"\n\r ";
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
        let decryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        let gamma = this.#gamma;
        for (let i = 0; i < text.length; i++)
        {
            if (!this.alphabet.includes(text[i])) {
                decryptionResult += text[i];
                continue;
            }
            for (let j = 0; j < this.alphabet.length; j++)
            {
                if (gamma[i] === this.alphabet[j]) {
                    textLetterNumber = j;
                }
                if (text[i] === this.alphabet[j]) {
                    gammaLetterNumber = j;
                }
                resultLetterNumber = (this.alphabet.indexOf(text[i]) - this.alphabet.indexOf(gamma[i]) +
                    this.alphabet.length) % this.alphabet.length;
            }
            decryptionResult += this.alphabet[resultLetterNumber];
        }
        return decryptionResult;
    }
}


export default Decryptor;