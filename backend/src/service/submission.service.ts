import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Submission } from '../entities/submission.entity';

@Injectable()
export class SubmissionService {
  constructor(
    @InjectRepository(Submission)
    private readonly submissionRepo: Repository<Submission>,
  ) {}

  async create(data: Partial<Submission>): Promise<Submission> {
    return this.submissionRepo.save(data);
  }

  async findAll(): Promise<Submission[]> {
    return this.submissionRepo.find({ relations: ['detectedMemes'] });
  }
}
