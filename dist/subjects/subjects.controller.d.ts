import { SubjectsService } from './subjects.service';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
export declare class SubjectsController {
    private readonly subjectsService;
    constructor(subjectsService: SubjectsService);
    create(createSubjectDto: CreateSubjectDto): Promise<import("./entities/subject.entity").Subject>;
    findAll(paginationDto: PaginationDto): Promise<import("./entities/subject.entity").Subject[]>;
    findOne(term: string): Promise<import("./entities/subject.entity").Subject>;
    update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<import("./entities/subject.entity").Subject>;
    remove(id: string): Promise<void>;
}
