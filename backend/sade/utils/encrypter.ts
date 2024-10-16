import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = crypto
  .createHash("sha256")
  .update(process.env.KEY || "123")
  .digest("base64")
  .substr(0, 32);
const iv = crypto
  .createHash("md5")
  .update(process.env.KEY || "123")
  .digest("hex")
  .substr(0, 16);

export function encrypt(data: any) {
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(data, "utf8", "hex");
  encrypted += cipher.final("hex");
  return encrypted;
}

export function decrypt(data: any) {
  const decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(data, "hex", "utf8");
  decrypted += decipher.final("utf8");
  return decrypted;
}
