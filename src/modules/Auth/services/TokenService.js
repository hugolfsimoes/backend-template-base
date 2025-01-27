import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.JWT_SECRET || "secret";
const EXPIRES_IN = "24h";
export class TokenService {
    static generateToken(payload) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn: EXPIRES_IN });
    }
    static verifyToken(token) {
        return jwt.verify(token, SECRET_KEY);
    }
}
