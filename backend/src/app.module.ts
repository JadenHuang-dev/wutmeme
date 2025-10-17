import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { Meme } from './entities/meme.entity';
import { Submission } from './entities/submission.entity';
import { MemeController } from './controller/meme.controller';
import { SubmissionController } from './controller/submission.controller';
import { UploadController } from './controller/upload.controller';
import { MemeService } from './service/meme.service';
import { SubmissionService } from './service/submission.service';
import { AiService } from './service/ai.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [Meme, Submission],
      synchronize: true, // dev: true，production: false
    }),

    TypeOrmModule.forFeature([Meme, Submission]),

    // 静态文件服务，用于提供上传的图片
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
      serveRoot: '/uploads',
    }),
  ],
  controllers: [MemeController, SubmissionController, UploadController],
  providers: [MemeService, SubmissionService, AiService],
})
export class AppModule {}
