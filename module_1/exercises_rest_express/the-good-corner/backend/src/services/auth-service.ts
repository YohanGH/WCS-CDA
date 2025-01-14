import { User } from "../database/entities/user";
import dataSource from "../database/config/datasource";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import { AppError } from "../middlewares/error-handler";
import Cookies from "cookies";

export class AuthService {
    // Method to register a new user
    static async register(email: string, password: string, cookies: Cookies): Promise<User> {
        const userRepository = dataSource.getRepository(User);

        // Verification to ensure no existing token is present
        if (cookies.get('token')) {
            throw new AppError('A user is already logged in with an active token.', 400, 'TokenExistsError');
        }

        // Check if a user already exists with this email
        const existingUser = await userRepository.findOne({ where: { email } });
        if (existingUser) {
            // Throw an error if the email is already in use
            throw new AppError("Email already exists", 400, "ValidationError");
        }

        // Hash the password before saving
        const hashedPassword = await argon2.hash(password);

        const user = new User();
        user.email = email; // Set the user's email
        user.password = hashedPassword; // Set the user's hashed password

        // Save the new user to the database
        return await userRepository.save(user);
    }

    // Method to log in an existing user
    static async login(email: string, password: string, cookies: Cookies): Promise<string> {
        const userRepository = dataSource.getRepository(User);
        // Find the user by email
        const user = await userRepository.findOne({ where: { email } });

        // Check if the user exists and if the password is correct
        if (!user || !(await argon2.verify(user.password, password))) {
            throw new AppError("Invalid identifiers", 401, "UnauthorizedError");
        }

        // Ensure the JWT secret is defined
        if (!process.env.JWT_SECRET) {
            throw new AppError(
                "JWT_SECRET is not defined in environment variables.",
                500,
                "InternalServerError"
            );
        }

        // Generate a JWT token for the user
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
            expiresIn: "1d", // Token expiration time
        });

        // Set the token as a cookie in the response
        cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            signed: true,
        });

        return token; // Return the generated token
    }

    // Method to check if a user is authorized
    static async checker(cookies: Cookies): Promise<boolean> {
        const token = cookies.get("token", { signed: true });

        if (!token) {
            throw new AppError("No token provided", 401, "UnauthorizedError");
        }

        try {
            // Decode and verify the token
            jwt.verify(token, process.env.JWT_SECRET!);

            // Get associate user
            // Attach

            return true; // Token is valid
        } catch (error) {
            throw new AppError("Invalid token", 401, "UnauthorizedError");
        }
    }
}
