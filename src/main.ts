import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.setGlobalPrefix('api', { exclude: ['/'] });
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.enableCors({
    origin: '*',
  });
  await app.listen(8000);
}
bootstrap();
