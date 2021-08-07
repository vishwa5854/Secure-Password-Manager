const crypto    = require('crypto');
const Key       = require('../env').KEY;
const algorithm = require('../env').ALGORITHM;

const encrypt = (text) => {
    return new Promise((resolve, reject) => {
        crypto.scrypt(Key, 'salt', 24, (err, key) => {
            if (err) return reject(err);

            crypto.randomFill(new Uint8Array(16), (err, iv) => {
                if (err) return reject(err);

                const cipher = crypto.createCipheriv(algorithm, key, iv);

                let encrypted = '';
                cipher.setEncoding('hex');

                iv = Array.from(iv);
                cipher.on('data', (chunk) => encrypted += chunk);
                cipher.on('end', () => { return resolve({ encrypted ,  iv}); })
                cipher.on('error', (err) => { return reject(err); })

                cipher.write(text);
                cipher.end();
            });
        });
    });
}

const decrypt = (encrypted, iv) => {
    iv = new Uint8Array(iv);
    return new Promise((resolve, reject) => {
        crypto.scrypt(Key, 'salt', 24, (err, key) => {
            if (err) return reject(err);
        
            const decipher = crypto.createDecipheriv(algorithm, key, iv);
        
            let decrypted = '';
            decipher.on('readable', () => {
                while (null !== (chunk = decipher.read())) {
                    decrypted += chunk.toString('utf8');
                }
            });
            decipher.on('end', () => { return resolve(decrypted); });
            decipher.on('error', (err) => { return reject(err); })
        
            decipher.write(encrypted, 'hex');
            decipher.end();
        })
    });
};

// encrypt(JSON.stringify({ a : '123', b : '456'})).then(lol => console.log(lol))
module.exports = { encrypt, decrypt }