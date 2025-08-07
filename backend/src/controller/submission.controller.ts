import { Controller, Post, Body, Get } from '@nestjs/common';
import { SubmissionService } from '../service/submission.service';
import { Submission } from '../entities/submission.entity';

@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  create(@Body() data: Partial<Submission>): Promise<Submission> {
    return this.submissionService.create(data);
  }

  @Get()
  getAll(): Promise<Submission[]> {
    return this.submissionService.findAll();
  }
}
