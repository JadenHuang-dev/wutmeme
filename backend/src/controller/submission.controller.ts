import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { SubmissionService } from '../service/submission.service';
import { Submission } from '../entities/submission.entity';
import { CreateSubmissionDto } from '../dto/submission.dto';

@ApiTags('submissions')
@Controller('submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiOperation({ summary: '创建新的提交' })
  @ApiBody({ type: CreateSubmissionDto })
  @ApiResponse({ status: 201, description: '提交已创建', type: Submission })
  create(@Body() data: Partial<Submission>): Promise<Submission> {
    return this.submissionService.create(data);
  }

  @Get()
  @ApiOperation({ summary: '获取所有提交' })
  @ApiResponse({ status: 200, description: '返回所有提交', type: [Submission] })
  getAll(): Promise<Submission[]> {
    return this.submissionService.findAll();
  }
}
