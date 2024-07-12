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
exports.SubjectsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const subject_entity_1 = require("./entities/subject.entity");
const typeorm_2 = require("typeorm");
const uuid_1 = require("uuid");
let SubjectsService = class SubjectsService {
    constructor(subjectRepository) {
        this.subjectRepository = subjectRepository;
        this.logger = new common_1.Logger('SubjectsService');
    }
    async create(createSubjectDto) {
        try {
            const subject = this.subjectRepository.create(createSubjectDto);
            await this.subjectRepository.save(subject);
            return subject;
        }
        catch (error) {
            this.handleDBExeptions(error);
        }
    }
    findAll(paginationDto) {
        const { limit = 5, offset = 0 } = paginationDto;
        return this.subjectRepository.find({
            take: limit,
            skip: offset,
        });
    }
    async findOne(term) {
        let subject;
        if ((0, uuid_1.validate)(term)) {
            subject = await this.subjectRepository.findOneBy({ id: term });
        }
        else {
            const queryBuilder = this.subjectRepository.createQueryBuilder();
            subject = await queryBuilder
                .where('UPPER(title) =:title or slug =:slug', {
                title: term.toUpperCase(),
                slug: term.toLowerCase()
            }).getOne();
        }
        if (!subject)
            throw new common_1.NotFoundException(`Subject with term ${term} not found`);
        return subject;
    }
    async update(id, updateSubjectDto) {
        const subject = await this.subjectRepository.preload({
            id: id,
            ...updateSubjectDto
        });
        if (!subject)
            throw new common_1.NotFoundException(`Product with id ${id} not found`);
        try {
            await this.subjectRepository.save(subject);
            return subject;
        }
        catch (error) {
            this.handleDBExeptions(error);
        }
    }
    async remove(id) {
        const subject = await this.findOne(id);
        await this.subjectRepository.remove(subject);
    }
    handleDBExeptions(error) {
        if (error.code === '23505')
            throw new common_1.BadRequestException(error.detail);
        this.logger.error(error);
        throw new common_1.InternalServerErrorException('Unexpected error, check server logs');
    }
};
exports.SubjectsService = SubjectsService;
exports.SubjectsService = SubjectsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(subject_entity_1.Subject)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SubjectsService);
//# sourceMappingURL=subjects.service.js.map