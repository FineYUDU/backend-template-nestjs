import { PartialType } from '@nestjs/mapped-types';
import { CreateSubjectDto } from './create-subject.dto';
import { IsString, MaxLength, MinLength } from 'class-validator';

export class UpdateSubjectDto extends PartialType(CreateSubjectDto) {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title:string;
    
}
