import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT || 5000

  const config = new DocumentBuilder()
    .setTitle('Nestjs backend example.')
    .setDescription('Documentation REST API')
    .setVersion('1.0.0')
    .addTag('blvckeasy')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  app.enableCors({
    origin: "*",
  })
  app.useGlobalPipes(new ValidationPipe())
  await app.listen(PORT, () => console.log(`server is listening on *${PORT} port`));
}
bootstrap();
