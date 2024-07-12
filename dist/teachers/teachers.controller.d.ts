import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
export declare class TeachersController {
    private readonly teachersService;
    constructor(teachersService: TeachersService);
    create(createTeacherDto: CreateTeacherDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateTeacherDto: UpdateTeacherDto): string;
    remove(id: string): string;
}
