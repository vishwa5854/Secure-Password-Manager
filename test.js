const crypto    = require('crypto');

// Generate a random 256-bit (32-byte) key for encryption
crypto.subtle.generateKey(
    {
        name: 'AES-GCM',
        length: 256, // 256-bit key size
    },
    true, // can extract key
    ['encrypt', 'decrypt'] // key can be used for encryption and decryption
)
    .then(key => {
        // Data to be encrypted
        const data = 'Hello, world!';
        const encoder = new TextEncoder();
        const dataBuffer = encoder.encode(data);

        // Initialize an encryption vector (IV) - usually random for each encryption
        const iv = crypto.getRandomValues(new Uint8Array(12)); // 96-bit IV

        // Encrypt the data using AES-GCM
        crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv,
            },
            key,
            dataBuffer
        )
            .then(encryptedData => {
                // Perform any necessary operations with the encrypted data
                console.log('Encrypted data:', new Uint8Array(encryptedData));

                // Decrypt the data
                crypto.subtle.decrypt(
                    {
                        name: 'AES-GCM',
                        iv,
                    },
                    key,
                    encryptedData
                )
                    .then(decryptedData => {
                        // Convert the decrypted data back to a string
                        const decoder = new TextDecoder();
                        const decryptedText = decoder.decode(decryptedData);
                        console.log('Decrypted data:', decryptedText);
                    })
                    .catch(error => {
                        console.error('Decryption error:', error);
                    });
            })
            .catch(error => {
                console.error('Encryption error:', error);
            });
    })
    .catch(error => {
        console.error('Key generation error:', error);
    });
