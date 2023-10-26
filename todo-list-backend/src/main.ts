import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cors from 'cors';
import * as swaggerUi from 'swagger-ui-express';
import * as swaggerDocs from './common/swagger/swagger.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  await app.listen(3000);
}
bootstrap();
