type AdminJwtPayload = {
  role: 'admin';
  exp: number;
  iat: number;
};

const getSecretKey = () => {
  const secret = process.env.ADMIN_JWT_SECRET;
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET environment variable is not set');
  }
  return new TextEncoder().encode(secret);
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function base64UrlEncode(value: Uint8Array | string) {
  const bytes = typeof value === 'string' ? encoder.encode(value) : value;
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/g, '');
}

function base64UrlDecode(value: string) {
  const normalized = value
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(value.length + ((4 - (value.length % 4)) % 4), '=');

  const binary = atob(normalized);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

async function signValue(value: string, secret: Uint8Array) {
  const keyBytes = secret.slice();
  const key = await crypto.subtle.importKey(
    'raw',
    keyBytes.buffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  const signature = await crypto.subtle.sign('HMAC', key, encoder.encode(value));
  return base64UrlEncode(new Uint8Array(signature));
}

export async function signAdminJwt(payload: { role: 'admin' }) {
  const secret = getSecretKey();
  const now = Math.floor(Date.now() / 1000);

  const header = base64UrlEncode(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
  const body = base64UrlEncode(JSON.stringify({
    ...payload,
    iat: now,
    exp: now + (60 * 60 * 24 * 7),
  } satisfies AdminJwtPayload));

  const unsignedToken = `${header}.${body}`;
  const signature = await signValue(unsignedToken, secret);
  return `${unsignedToken}.${signature}`;
}

export async function verifyAdminJwt(token: string) {
  try {
    const secret = getSecretKey();
    const [encodedHeader, encodedPayload, signature] = token.split('.');

    if (!encodedHeader || !encodedPayload || !signature) {
      return null;
    }

    const header = JSON.parse(decoder.decode(base64UrlDecode(encodedHeader))) as { alg?: string };
    if (header.alg !== 'HS256') {
      return null;
    }

    const expectedSignature = await signValue(`${encodedHeader}.${encodedPayload}`, secret);
    if (signature !== expectedSignature) {
      return null;
    }

    const payload = JSON.parse(decoder.decode(base64UrlDecode(encodedPayload))) as AdminJwtPayload;
    if (typeof payload.exp !== 'number' || payload.exp <= Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null; // Invalid token
  }
}
