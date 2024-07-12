export declare class User {
    id: string;
    email: string;
    username: string;
    password: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    checkFieldBeforeInser(): void;
    checkFieldsBeforeUpdate(): void;
}
