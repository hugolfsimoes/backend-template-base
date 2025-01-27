import { TokenService } from "../services/TokenService.js";
export const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: "Token not provided" });
    }
    const [, token] = authHeader.split(" ");
    try {
        const decoded = TokenService.verifyToken(token);
        req.user = decoded;
        return next();
    }
    catch {
        return res.status(401).json({ error: "Invalid token" });
    }
};
