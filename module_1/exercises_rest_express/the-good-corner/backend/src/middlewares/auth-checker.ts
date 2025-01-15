import { AuthChecker } from "type-graphql";
import { Context } from "../types/types";
import { AuthService } from "../services/auth-service";

export const customAuthChecker: AuthChecker<Context> = async ({ context }) => {
    const { cookies } = context;

    try {
        // Get the user from the database
        const user = await AuthService.whoami(cookies);

        // Set the user in the context
        if (user) {
            context.user = user;
        }

        // Check if the user is authenticated
        const isAuthenticated = !!user; // Return true if the user is authenticated

        // Return true if the user is authenticated
        return isAuthenticated;
    } catch (error) {
        return false; // Return false if any error occurs
    }
};
