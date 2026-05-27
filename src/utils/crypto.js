// Native browser Web Crypto AES-GCM 256 / PBKDF2 client-side encryption utility

const bufToHex = (buf) => {
    return Array.from(new Uint8Array(buf))
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');
};

const hexToBuf = (hex) => {
    const bytes = new Uint8Array(hex.length / 2);
    for (let i = 0; i < bytes.length; i++) {
        bytes[i] = parseInt(hex.substring(i * 2, i * 2 + 2), 16);
    }
    return bytes.buffer;
};

// Derive key using PBKDF2
async function deriveKey(passphrase, saltBuffer) {
    const encoder = new TextEncoder();
    const baseKey = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(passphrase),
        'PBKDF2',
        false,
        ['deriveKey']
    );

    return window.crypto.subtle.deriveKey(
        {
            name: 'PBKDF2',
            salt: saltBuffer,
            iterations: 100000,
            hash: 'SHA-256',
        },
        baseKey,
        {
            name: 'AES-GCM',
            length: 256,
        },
        false,
        ['encrypt', 'decrypt']
    );
}

// Encrypt plainText with passphrase
export async function encryptContent(plainText, passphrase) {
    try {
        const encoder = new TextEncoder();
        const salt = window.crypto.getRandomValues(new Uint8Array(16));
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        
        const derivedKey = await deriveKey(passphrase, salt);
        const encodedContent = encoder.encode(plainText);

        const ciphertextBuffer = await window.crypto.subtle.encrypt(
            {
                name: 'AES-GCM',
                iv: iv,
            },
            derivedKey,
            encodedContent
        );

        return {
            ciphertext: bufToHex(ciphertextBuffer),
            salt: bufToHex(salt),
            iv: bufToHex(iv),
        };
    } catch (e) {
        console.error('Encryption failed', e);
        throw new Error('Encryption failed: ' + e.message, { cause: e });
    }
}

// Decrypt ciphertext details with passphrase
export async function decryptContent({ ciphertext, salt, iv }, passphrase) {
    try {
        const decoder = new TextDecoder();
        const ciphertextBuffer = hexToBuf(ciphertext);
        const saltBuffer = new Uint8Array(hexToBuf(salt));
        const ivBuffer = new Uint8Array(hexToBuf(iv));

        const derivedKey = await deriveKey(passphrase, saltBuffer);

        const decryptedBuffer = await window.crypto.subtle.decrypt(
            {
                name: 'AES-GCM',
                iv: ivBuffer,
            },
            derivedKey,
            ciphertextBuffer
        );

        return decoder.decode(decryptedBuffer);
    } catch (e) {
        console.error('Decryption failed', e);
        throw new Error('Incorrect passphrase or corrupted data', { cause: e });
    }
}

// Helper to hash password for quick verification without decrypting content
export async function hashPassphrase(passphrase, saltHex) {
    const encoder = new TextEncoder();
    const salt = saltHex ? new Uint8Array(hexToBuf(saltHex)) : window.crypto.getRandomValues(new Uint8Array(16));
    
    const key = await window.crypto.subtle.importKey(
        'raw',
        encoder.encode(passphrase),
        'PBKDF2',
        false,
        ['deriveBits']
    );

    const bits = await window.crypto.subtle.deriveBits(
        {
            name: 'PBKDF2',
            salt: salt,
            iterations: 50000,
            hash: 'SHA-256',
        },
        key,
        256
    );

    return {
        hash: bufToHex(bits),
        salt: bufToHex(salt),
    };
}
