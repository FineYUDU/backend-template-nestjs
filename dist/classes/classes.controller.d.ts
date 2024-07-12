import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesController {
    private readonly classesService;
    constructor(classesService: ClassesService);
    create(createClassDto: CreateClassDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateClassDto: UpdateClassDto): string;
    remove(id: string): string;
}
