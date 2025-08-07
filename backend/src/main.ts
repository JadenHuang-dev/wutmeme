import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // 启用CORS，允许前端访问
  app.enableCors({
    origin: true, // 允许所有来源访问，生产环境应设置为具体域名
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
}

// 调用启动函数并处理可能的错误
bootstrap().catch(err => {
  console.error('启动应用程序时出错:', err);
  process.exit(1);
});
