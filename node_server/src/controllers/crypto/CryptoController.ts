import dotenv from "dotenv";
import { genSalt, hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";

dotenv.config();

const { SECRET_KEY_ACCESS, SECRET_KEY_REFRESH, ENCRYPTION_SALT } = process.env;

export const hashPassword = async (password: string) => {
    const salt = await genSalt(Number(ENCRYPTION_SALT));
    const hashPassword = await hash(password, salt);
    return hashPassword;
};

export const getTokens = (email: string) => {
    const accessToken = jwt.sign({ email }, `${SECRET_KEY_ACCESS}`, {
        expiresIn: "24h",
    });
    const refreshToken = jwt.sign({ email }, `${SECRET_KEY_REFRESH}`, {
        expiresIn: "3d",
    });
    return { accessToken, refreshToken };
};
