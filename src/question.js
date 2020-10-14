import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

export default function(str) {
    return new Promise((resolve, reject) => {
        rl.question(str + "\n", (input) => resolve(input));
    });
}