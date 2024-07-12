import { IsArray, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CreateSubjectDto {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    title:string;

    @IsString()
    @IsOptional()
    slug?:string;
    
    @IsString({each:true})
    @IsArray()
    @IsOptional()
    tags?: string[]
}
