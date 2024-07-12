import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateSubjectDto } from './dto/create-subject.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';

import { Subject } from './entities/subject.entity';

import { Repository } from 'typeorm';

import { validate as isUUD } from 'uuid';



@Injectable()
export class SubjectsService {

  private readonly logger = new Logger('SubjectsService');

  constructor(
    @InjectRepository(Subject)
    private readonly subjectRepository  : Repository<Subject>
  ){}

  async create(createSubjectDto: CreateSubjectDto) {
    try {

      const subject = this.subjectRepository.create(createSubjectDto);

      await this.subjectRepository.save( subject );

      return subject;

    } catch (error) {

      this.handleDBExeptions(error)

    }
  }


  findAll(paginationDto : PaginationDto) {

    const { limit = 5, offset = 0 } = paginationDto;

    return this.subjectRepository.find({
      take: limit,
      skip: offset,
      // TODO: Relaciones
    });
  }

  async findOne(term: string) {

    let subject : Subject;

    if ( isUUD(term) ) {
      subject = await this.subjectRepository.findOneBy({ id:term });
    } else {
      const queryBuilder = this.subjectRepository.createQueryBuilder();
      subject = await queryBuilder
      .where('UPPER(title) =:title or slug =:slug', {
        title:term.toUpperCase(),
        slug:term.toLowerCase()
      }).getOne();
    }

    if (!subject) throw new NotFoundException(`Subject with term ${term} not found`);

    return subject;
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto) {

    const subject = await this.subjectRepository.preload({
      id:id,
      ...updateSubjectDto
    });

    if ( !subject ) throw new NotFoundException(`Product with id ${id} not found`);

    try {

      await this.subjectRepository.save(subject);
      return subject;
      
    } catch (error) {
      this.handleDBExeptions(error);
    }
    
  }

  async remove(id: string) {

    const subject = await this.findOne( id );

    await this.subjectRepository.remove(subject);

  }

  handleDBExeptions(error:any) {

    if(error.code === '23505') 
      throw new BadRequestException(error.detail)

    this.logger.error(error)

    throw new InternalServerErrorException('Unexpected error, check server logs');
  }

}
