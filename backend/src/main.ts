import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 配置 Swagger
  const config = new DocumentBuilder()
    .setTitle('WUTMEME API')
    .setDescription('WUTMEME 应用程序的 API 文档')
    .setVersion('1.0')
    .addTag('memes', '梗相关 API')
    .addTag('submissions', '提交内容相关 API')
    .addTag('uploads', '文件上传相关 API')
    .addServer('', '当前服务器')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('admin', app, document);

  // 启用CORS，允许前端访问
  app.enableCors({
    origin: true, // 允许所有来源访问，生产环境应设置为具体域名
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}

// 调用启动函数并处理可能的错误
bootstrap().catch((err) => {
  console.error('启动应用程序时出错:', err);
  process.exit(1);
});
