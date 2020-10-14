class Decryptor {
    #gamma;
    static alphabet = "абвгдеёжзийклмнопрстуфхцчшщъыьэюя";
    constructor(gammaKey) {
        this.#gamma = gammaKey;
    }

    decrypt(text) {
        let decryptionResult = "", textLetterNumber, gammaLetterNumber, resultLetterNumber;
        while (this.#gamma.length < text.length){
            this.#gamma += this.#gamma;
            if (this.#gamma.length > text.length) {
                this.#gamma = this.#gamma.substr(0, text.length)
            }
        }
        for (let i = 0; i < text.length; i++)
        {
            for (let j = 0; j < Decryptor.alphabet.length; j++)
            {
                if (this.#gamma[i] === Decryptor.alphabet[j]) {
                    textLetterNumber = j;
                }
                if (text[i] === Decryptor.alphabet[j]) {
                    gammaLetterNumber = j;
                }
                resultLetterNumber = (Decryptor.alphabet.indexOf(text[i]) - Decryptor.alphabet.indexOf(this.#gamma[i]) + Decryptor.alphabet.length) % Decryptor.alphabet.length;
            }
            decryptionResult += Decryptor.alphabet[resultLetterNumber];
        }
        return decryptionResult;
    }
}


export default Decryptor;