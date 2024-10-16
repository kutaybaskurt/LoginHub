import jwt from "jsonwebtoken";

const secretkey = "your-very-secret-key";

export function createtoken(payload: any) {
  const token = jwt.sign(payload, secretkey);
  return token;
}

export function verifytoken(token: string) {
  try {
    const decoded = jwt.verify(token, secretkey);
    return { valid: true, decoded };
  } catch (error) {
    return { valid: false, error };
  }
}
