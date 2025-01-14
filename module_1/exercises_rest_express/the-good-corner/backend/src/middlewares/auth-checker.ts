import { AuthChecker } from "type-graphql";
import { Context } from "../types/types";
import { AuthService } from "../services/auth-service";

export const customAuthChecker: AuthChecker<Context> = async ({ context }) => {    
    const { cookies } = context;

    try {
        // Check if the user is authenticated
        const isAuthenticated = await AuthService.checker(cookies);

        // Return true if the user is authenticated
        return isAuthenticated;
    } catch (error) {
        return false; // Return false if any error occurs
    }
};
