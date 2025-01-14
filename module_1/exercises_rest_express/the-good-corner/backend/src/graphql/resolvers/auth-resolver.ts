import { Resolver, Mutation, Arg } from 'type-graphql';
import { AuthService } from '../../services/auth-service';
import { User } from '../../database/entities/user';
import { AppError } from '../../middlewares/error-handler';

// Define the AuthResolver class for handling authentication-related GraphQL mutations
@Resolver(User)
export class AuthResolver {
    private readonly authService: AuthService; // Instance of AuthService for handling authentication logic

    constructor() {
        this.authService = new AuthService(); // Initialize AuthService
    }

    // Mutation for user registration
    @Mutation(() => User)
    async register(
        @Arg('email') email: string, // User's email
        @Arg('password') password: string // User's password
    ): Promise<User> {
        try {
            return await this.authService.register(email, password); // Call register method from AuthService
        } catch (error) {
            throw new AppError('Registration failed', 400, 'ValidationError'); // Handle registration errors
        }
    }

    // Mutation for user login
    @Mutation(() => String)
    async login(
        @Arg('email') email: string, // User's email
        @Arg('password') password: string // User's password
    ): Promise<string> {
        try {
            return await this.authService.login(email, password); // Call login method from AuthService
        } catch (error) {
            throw new AppError('Login failed', 401, 'UnauthorizedError'); // Handle login errors
        }
    }
}