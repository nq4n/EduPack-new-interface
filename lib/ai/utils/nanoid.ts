const alphabet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

function randomBytes(size: number) {
  const crypto = globalThis.crypto;

  if (crypto && typeof crypto.getRandomValues === "function") {
    return crypto.getRandomValues(new Uint8Array(size));
  }

  const bytes = new Uint8Array(size);

  for (let i = 0; i < size; i += 1) {
    bytes[i] = Math.floor(Math.random() * 256);
  }

  return bytes;
}

export function nanoid(size = 12) {
  const bytes = randomBytes(size);
  let id = "";

  for (let i = 0; i < size; i += 1) {
    id += alphabet[bytes[i] % alphabet.length];
  }

  return id;
}
