import { CreateSubjectDto } from './dto/create-subject.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './entities/subject.entity';
import { Repository } from 'typeorm';
export declare class SubjectsService {
    private readonly subjectRepository;
    private readonly logger;
    constructor(subjectRepository: Repository<Subject>);
    create(createSubjectDto: CreateSubjectDto): Promise<Subject>;
    findAll(paginationDto: PaginationDto): Promise<Subject[]>;
    findOne(term: string): Promise<Subject>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject>;
    remove(id: string): Promise<void>;
    handleDBExeptions(error: any): void;
}
