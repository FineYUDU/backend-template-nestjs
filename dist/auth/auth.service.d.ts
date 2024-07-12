import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { LoginUserDto } from './dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly userRepository;
    private readonly jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    register(createUserDto: CreateUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        username: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
    }>;
    login(loginUserDto: LoginUserDto): Promise<{
        token: string;
        id: string;
        email: string;
        username: string;
        password: string;
        fullName: string;
        isActive: boolean;
        roles: string[];
    }>;
    private getJwToken;
    private handleDbErrors;
}
