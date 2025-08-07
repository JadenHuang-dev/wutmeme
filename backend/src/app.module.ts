import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Meme } from './entities/meme.entity';
import { Submission } from './entities/submission.entity';
import { MemeController } from './controller/meme.controller';
import { SubmissionController } from './controller/submission.controller';
import { MemeService } from './service/meme.service';
import { SubmissionService } from './service/submission.service';


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
      database: process.env.DB_NAME,
      entities: [Meme, Submission],
      synchronize: true, // dev: true，production: false
    }),

    TypeOrmModule.forFeature([Meme, Submission]),
  ],
  controllers: [MemeController, SubmissionController],
  providers: [MemeService, SubmissionService],
})
export class AppModule {}
