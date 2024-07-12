"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const bcrypt = require("bcrypt");
const user_entity_1 = require("./entities/user.entity");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
    }
    async register(createUserDto) {
        try {
            const { password, ...userData } = createUserDto;
            const user = this.userRepository.create({
                ...userData,
                password: bcrypt.hashSync(password, 10)
            });
            await this.userRepository.save(user);
            delete user.password;
            return {
                ...user,
                token: this.getJwToken({ id: user.id })
            };
        }
        catch (error) {
            this.handleDbErrors(error);
        }
    }
    async login(loginUserDto) {
        const { password, email } = loginUserDto;
        const user = await this.userRepository.findOne({
            where: { email },
            select: {
                email: true,
                password: true,
                id: true
            }
        });
        if (!user)
            throw new common_1.UnauthorizedException('Credentials are not valid');
        if (!bcrypt.compareSync(password, user.password))
            throw new common_1.UnauthorizedException('Credentials are not valid');
        return {
            ...user,
            token: this.getJwToken({ id: user.id })
        };
    }
    getJwToken(payload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
    handleDbErrors(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        console.log(error);
        throw new common_1.InternalServerErrorException('Please check server logs');
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map