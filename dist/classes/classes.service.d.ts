import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
export declare class ClassesService {
    create(createClassDto: CreateClassDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateClassDto: UpdateClassDto): string;
    remove(id: number): string;
}
