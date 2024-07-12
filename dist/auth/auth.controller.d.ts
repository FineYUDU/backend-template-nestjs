import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    createUser(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        username: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
    }>;
    loginUser(loginUserDto: LoginUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        username: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
    }>;
    privateRoute(user: User, userEmail: string, rawHeaders: string[]): {
        ok: boolean;
        user: User;
        userEmail: string;
        rawHeaders: string[];
    };
    privateRoute2(user: User): {
        ok: boolean;
        user: User;
    };
    privateRoute3(user: User): {
        ok: boolean;
        user: User;
    };
}
