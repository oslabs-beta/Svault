declare namespace App {
    interface Locals {
        username?: string;
        failure?: object;
        // TODO: add in user roles functionality feature
        // roles?: string[];
    }

    // TODO creating an Error state for user management
    // interface Error {
    //     code: string;
    //     id: string;
    //     message: string = 'Invalid password';
    // }
}