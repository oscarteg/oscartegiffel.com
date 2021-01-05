
import crypto from 'crypto';

export default function createNonce() {
    return crypto.randomBytes(16).toString('base64');
}